"""
Polars transformer.
- Reads a list of CSV chunk paths for one table.
- Lazily scans them all (LazyFrame) for out-of-core processing.
- Sinks directly to Parquet (sink_parquet) — never loads full data into RAM.
"""

import polars as pl
from pathlib import Path

from config.db_config import PARQUET_CONFIG
from utils.logger import get_logger

log = get_logger(__name__)


def csv_chunks_to_parquet(
    csv_paths: list[Path],
    parquet_path: Path,
    table: str,
) -> Path:
    """
    Combine all CSV chunks for a table into a single Parquet file
    using Polars LazyFrame + sink_parquet (streaming, low-memory).
    """
    if not csv_paths:
        raise ValueError(f"No CSV chunks found for table '{table}'")

    parquet_path.parent.mkdir(parents=True, exist_ok=True)

    log.info("  [%s] scanning %d CSV chunk(s) with Polars …", table, len(csv_paths))

    # scan_csv on a list of files — Polars handles the concat lazily
    lf = pl.scan_csv(
        [str(p) for p in csv_paths],
        infer_schema_length=10_000,
        ignore_errors=True,
        encoding="utf8-lossy",
    )

    log.info("  [%s] sinking LazyFrame → %s", table, parquet_path)

    # sink_parquet streams data through in chunks — no full in-memory load
    lf.sink_parquet(
        str(parquet_path),
        compression=PARQUET_CONFIG["compression"],
        row_group_size=PARQUET_CONFIG["row_group_size"],
        maintain_order=True,
    )

    size_mb = parquet_path.stat().st_size / 1_048_576
    log.info("  [%s] Parquet written — %.2f MB", table, size_mb)
    return parquet_path
