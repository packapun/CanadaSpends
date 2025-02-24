#!/bin/bash
set -e

# Configuration
APP_DIR="/opt/canadaspends"
REPO_URL="https://github.com/BuildCanada/CanadaSpends.git"
BRANCH="main"

echo "Deploying main branch to server"

# Check for permissions and fix if needed
if [ ! -w "$APP_DIR" ]; then
  echo "Need to fix permissions on $APP_DIR"
  sudo mkdir -p "$APP_DIR"
  sudo chown -R $(whoami):$(whoami) "$APP_DIR"
fi

# Create data directory if it doesn't exist
mkdir -p $APP_DIR/data

# Function to generate checksum of data directory
generate_data_checksum() {
  find $APP_DIR/query-engine/data -type f -exec sha256sum {} \; | sort | sha256sum | cut -d' ' -f1
}

# Store current checksum if directory exists
CURRENT_CHECKSUM=""
if [ -d "$APP_DIR/query-engine/data" ]; then
  CURRENT_CHECKSUM=$(generate_data_checksum)
  echo "Current data checksum: $CURRENT_CHECKSUM"
fi

# Clone or update repository
if [ -d "$APP_DIR/.git" ]; then
  echo "Updating existing repository..."
  cd $APP_DIR
  git fetch --all
  git reset --hard origin/main
else
  echo "Directory exists but is not a git repository..."
  
  # Check if directory has files other than those we expect
  if [ "$(ls -A $APP_DIR | grep -v 'data' | grep -v '.env')" ]; then
    echo "Directory contains unexpected files. Moving them to backup..."
    mkdir -p $APP_DIR.bak
    mv $APP_DIR/* $APP_DIR/.* $APP_DIR.bak/ 2>/dev/null || true
  fi
  
  echo "Cloning repository..."
  git clone $REPO_URL $APP_DIR
  cd $APP_DIR
  
  # Restore data directory if it existed
  if [ -d "$APP_DIR.bak/data" ]; then
    echo "Restoring data directory..."
    cp -a $APP_DIR.bak/data/* $APP_DIR/data/ 2>/dev/null || true
  fi
  
  # Restore .env file if it existed
  if [ -f "$APP_DIR.bak/.env" ]; then
    echo "Restoring .env file..."
    cp $APP_DIR.bak/.env $APP_DIR/ 2>/dev/null || true
  fi
fi

# Create an .env file from environment variables
echo "Creating .env file..."
cd $APP_DIR/query-engine
cat > .env << EOF
OPENAI_API_KEY=${OPENAI_API_KEY}
COHERE_API_KEY=${COHERE_API_KEY}
WEAVIATE_HOST=weaviate
WEAVIATE_HTTP_PORT=8080
WEAVIATE_GRPC_PORT=50051
PYTHONPATH=/app
SLACK_BOT_TOKEN=${SLACK_BOT_TOKEN}
SLACK_SIGNING_SECRET=${SLACK_SIGNING_SECRET}
API_URL=http://api:8000
PORT=3000
ENVIRONMENT=development
EOF

# Check if data directory has changed
REINDEX_NEEDED=false
if [ -z "$CURRENT_CHECKSUM" ]; then
  echo "No previous data checksum found. Re-indexing will be performed."
  REINDEX_NEEDED=true
else
  NEW_CHECKSUM=$(generate_data_checksum)
  echo "New data checksum: $NEW_CHECKSUM"
  if [ "$CURRENT_CHECKSUM" != "$NEW_CHECKSUM" ]; then
    echo "Data directory has changed. Re-indexing will be performed."
    REINDEX_NEEDED=true
  else
    echo "Data directory has not changed. Skipping re-indexing."
    REINDEX_NEEDED=false
  fi
fi

# Modify docker-compose.yaml if needed to prevent reindexing
if [ "$REINDEX_NEEDED" = false ]; then
  echo "Preserving Weaviate service and updating other services..."
  cd $APP_DIR/query-engine
  
  # Stop only the services we want to update, keeping Weaviate running
  docker-compose stop api chat slackbot
  
  # Remove stopped containers to ensure clean deployment
  docker-compose rm -f api chat slackbot
  
  # Start/update only the non-Weaviate services
  docker-compose up -d api chat slackbot
else
  echo "Performing full redeployment with reindexing..."
  cd $APP_DIR/query-engine
  
  # Complete teardown and rebuild of all services
  docker-compose down --remove-orphans || true
  docker-compose up -d
fi

echo "Deployment completed successfully" 