"""
GCS uploader.
Uploads a local Parquet file to the configured GCP bucket.
"""

import os
from pathlib import Path
from google.cloud import storage

from config.db_config import GCS_CONFIG
from utils.logger import get_logger

log = get_logger(__name__)


def _get_client() -> storage.Client:
    creds = GCS_CONFIG["credentials_path"]
    project_id = GCS_CONFIG.get("project_id")
    if creds and os.path.exists(creds):
        return storage.Client.from_service_account_json(creds, project=project_id)
    # Falls back to Application Default Credentials (ADC) if no path set
    return storage.Client(project=project_id)


def upload_parquet_to_gcs(parquet_path: Path, table: str) -> str:
    """
    Upload <parquet_path> to gs://<bucket>/<prefix>/<table>/<filename>.
    Returns the full GCS URI.
    """
    client     = _get_client()
    bucket_name = GCS_CONFIG["bucket_name"]
    prefix      = GCS_CONFIG["destination_prefix"].rstrip("/")
    blob_name   = f"{prefix}/{table}/{parquet_path.name}"

    bucket = client.bucket(bucket_name)
    blob   = bucket.blob(blob_name)

    log.info("  [%s] uploading → gs://%s/%s", table, bucket_name, blob_name)
    blob.upload_from_filename(
        str(parquet_path),
        content_type="application/octet-stream",
    )
    gcs_uri = f"gs://{bucket_name}/{blob_name}"
    log.info("  [%s] upload complete → %s", table, gcs_uri)
    return gcs_uri
