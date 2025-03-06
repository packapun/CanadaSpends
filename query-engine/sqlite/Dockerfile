FROM python:3.10-slim

# Install SQLite3 CLI and other utilities
RUN apt-get update && \
    apt-get install -y sqlite3 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app/sqlite

# Copy scripts and requirements
COPY . /app/sqlite/

# Make scripts executable
RUN chmod +x /app/sqlite/setup_db.sh

# Create directory for output
RUN mkdir -p /app/data/sqlite

# Run setup script by default
CMD ["/bin/bash", "setup_db.sh"] 