"""
PostgreSQL extractor.
- Discovers all tables in the schema ordered by name (first table → last table).
- For each table, streams rows in CHUNK_SIZE batches using server-side cursors
  (no full-table load into memory).
- Writes each chunk to a numbered CSV file under  output/csv/<table_name>/.
"""

import csv
import os
import psycopg2
import psycopg2.extras
from pathlib import Path
from typing import Generator

from config.db_config import DB_CONFIG, SCHEMA, CHUNK_SIZE
from utils.logger import get_logger

log = get_logger(__name__)


def get_connection():
    """Return a live psycopg2 connection."""
    conn = psycopg2.connect(**DB_CONFIG)
    conn.autocommit = False
    log.info("Connected to PostgreSQL  %s/%s", DB_CONFIG["host"], DB_CONFIG["dbname"])
    return conn


def get_all_tables(conn) -> list[str]:
    """
    Return every table in SCHEMA ordered alphabetically
    (first keyspace → last keyspace).
    """
    sql = """
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = %s
          AND table_type  = 'BASE TABLE'
        ORDER BY table_name
    """
    with conn.cursor() as cur:
        cur.execute(sql, (SCHEMA,))
        tables = [row[0] for row in cur.fetchall()]
    log.info("Found %d table(s) in schema '%s': %s", len(tables), SCHEMA, tables)
    return tables


def get_column_names(conn, table: str) -> list[str]:
    sql = """
        SELECT column_name
        FROM information_schema.columns
        WHERE table_schema = %s AND table_name = %s
        ORDER BY ordinal_position
    """
    with conn.cursor() as cur:
        cur.execute(sql, (SCHEMA, table))
        return [row[0] for row in cur.fetchall()]


def export_table_to_csv_chunks(
    conn,
    table: str,
    output_dir: Path,
) -> Generator[Path, None, None]:
    """
    Exports <table> to chunked CSV files.
    Uses a named server-side cursor for memory-efficient streaming.
    Yields each CSV path as it is written.
    """
    table_dir = output_dir / table
    table_dir.mkdir(parents=True, exist_ok=True)

    columns = get_column_names(conn, table)
    full_table = f'"{SCHEMA}"."{table}"'

    cursor_name = f"biswajitjena_{table}_cursor"
    chunk_index = 0
    total_rows = 0

    with conn.cursor(name=cursor_name, cursor_factory=psycopg2.extras.DictCursor) as cur:
        # Full table scan from first row (first keyspace) to last row (last keyspace)
        cur.execute(f"SELECT * FROM {full_table} ORDER BY 1")  # ORDER BY primary/first col

        while True:
            rows = cur.fetchmany(CHUNK_SIZE)
            if not rows:
                break

            csv_path = table_dir / f"chunk_{chunk_index:05d}.csv"
            with open(csv_path, "w", newline="", encoding="utf-8") as f:
                writer = csv.writer(f)
                writer.writerow(columns)
                writer.writerows(rows)

            row_count = len(rows)
            total_rows += row_count
            log.info(
                "  [%s] chunk %d → %s  (%d rows)",
                table, chunk_index, csv_path.name, row_count,
            )
            yield csv_path
            chunk_index += 1

    log.info("  [%s] export complete — %d total rows in %d chunk(s)", table, total_rows, chunk_index)
