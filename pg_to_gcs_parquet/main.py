"""
Orchestrator: PostgreSQL → CSV chunks → Polars Parquet → GCS

Flow for EACH table (first table → last table, first row → last row):
  1. Connect to PostgreSQL
  2. Stream table rows to chunked CSV files (server-side cursor)
  3. Polars LazyFrame scans all chunks → sink_parquet (streaming, low RAM)
  4. Upload Parquet to GCS bucket
  5. Clean up local temp files
"""

import shutil
from pathlib import Path

from config.db_config import SCHEMA
from extractor.pg_extractor  import get_connection, get_all_tables, export_table_to_csv_chunks
from transformer.polars_transformer import csv_chunks_to_parquet
from uploader.gcs_uploader   import upload_parquet_to_gcs
from utils.logger             import get_logger

log = get_logger("main")

OUTPUT_DIR        = Path("output")
CSV_DIR           = OUTPUT_DIR / "csv"
PARQUET_DIR       = OUTPUT_DIR / "parquet"
CLEANUP_AFTER     = True   # set False to keep local CSV/Parquet for debugging


def process_table(conn, table: str) -> dict:
    """End-to-end pipeline for one table. Returns a summary dict."""
    log.info("=" * 60)
    log.info("START  table: %s.%s", SCHEMA, table)
    log.info("=" * 60)

    # ── Step 1: Export PostgreSQL table → CSV chunks ──────────────
    csv_paths: list[Path] = list(
        export_table_to_csv_chunks(conn, table, CSV_DIR)
    )

    if not csv_paths:
        log.warning("  [%s] table is empty — skipping", table)
        return {"table": table, "status": "skipped_empty"}

    # ── Step 2: CSV chunks → Polars LazyFrame → Parquet ───────────
    parquet_path = PARQUET_DIR / table / f"{table}.parquet"
    parquet_path = csv_chunks_to_parquet(csv_paths, parquet_path, table)

    # ── Step 3: Upload Parquet → GCS ──────────────────────────────
    gcs_uri = upload_parquet_to_gcs(parquet_path, table)

    # ── Step 4: Cleanup local files ───────────────────────────────
    if CLEANUP_AFTER:
        shutil.rmtree(CSV_DIR / table, ignore_errors=True)
        shutil.rmtree(PARQUET_DIR / table, ignore_errors=True)
        log.info("  [%s] local temp files cleaned", table)

    return {"table": table, "status": "success", "gcs_uri": gcs_uri}


def main():
    log.info("Pipeline starting — PostgreSQL → CSV → Polars Parquet → GCS")

    CSV_DIR.mkdir(parents=True, exist_ok=True)
    PARQUET_DIR.mkdir(parents=True, exist_ok=True)

    conn = get_connection()
    results = []

    try:
        tables = get_all_tables(conn)   # alphabetically ordered (first → last)

        for table in tables:
            try:
                result = process_table(conn, table)
                results.append(result)
            except Exception as exc:
                log.error("  [%s] FAILED: %s", table, exc, exc_info=True)
                results.append({"table": table, "status": "failed", "error": str(exc)})

    finally:
        conn.close()
        log.info("PostgreSQL connection closed")

    # ── Summary ───────────────────────────────────────────────────
    log.info("\n%s", "=" * 60)
    log.info("PIPELINE SUMMARY")
    log.info("=" * 60)
    for r in results:
        status = r["status"].upper()
        if status == "SUCCESS":
            log.info("  ✅  %-40s → %s", r["table"], r.get("gcs_uri", ""))
        elif status == "SKIPPED_EMPTY":
            log.info("  ⚠️   %-40s  (empty table)", r["table"])
        else:
            log.info("  ❌  %-40s  ERROR: %s", r["table"], r.get("error", ""))

    success = sum(1 for r in results if r["status"] == "success")
    log.info("Done. %d/%d tables exported successfully.", success, len(results))


if __name__ == "__main__":
    main()
