FROM python:3.10-slim

# Install SQLite3 CLI and other utilities
RUN apt-get update && \
    apt-get install -y sqlite3 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app/sqlite

# Copy scripts and requirements
COPY . /app/sqlite/
