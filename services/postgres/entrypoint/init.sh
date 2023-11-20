#!/bin/bash
set -e
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE TABLE IF NOT EXISTS(
    id SERIAL PRIMARY KEY,
    long_url TEXT NOT NULL,
    short_url TEXT NOT NULL
  );
EOSQL