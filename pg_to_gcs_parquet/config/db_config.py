import os
from dotenv import load_dotenv

load_dotenv()

DB_CONFIG = {
    "host":     os.getenv("PG_HOST", "34.93.81.117"),
    "port":     int(os.getenv("PG_PORT", 5432)),
    "dbname":   os.getenv("PG_DATABASE", "exportdb"),
    "user":     os.getenv("PG_USERNAME", "postgres"),
    "password": os.getenv("PG_PASSWORD", "isu12345"),
}

SCHEMA = os.getenv("PG_SCHEMA", "public")

GCS_CONFIG = {
    "bucket_name":        os.getenv("GCS_BUCKET", "prod-isurecon"),
    "destination_prefix": os.getenv("GCS_PREFIX", "iceberg"),
    "project_id":         os.getenv("GCS_PROJECT_ID", "iserveustaging"),
    "credentials_path":   os.getenv("GOOGLE_APPLICATION_CREDENTIALS", "service-account.json"),
}

PARQUET_CONFIG = {
    "compression":    os.getenv("PARQUET_COMPRESSION", "snappy"),
    "row_group_size": int(os.getenv("PARQUET_ROW_GROUP_SIZE", 250000)),
}

# Chunked export settings (tune for your RAM)
CHUNK_SIZE = 100_000   # rows per CSV chunk
