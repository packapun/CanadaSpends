#!/bin/bash
set -e

# Configuration
APP_DIR="/opt/canadaspends"
REPO_URL="https://github.com/BuildCanada/CanadaSpends.git"
BRANCH=${1:-main}  # Use first argument as branch, default to main

echo "Deploying $BRANCH branch to server"

# Load environment variables from .env file if it exists
if [ -f "$APP_DIR/.env" ]; then
  export $(grep -v '^#' $APP_DIR/.env | xargs)
fi

# Check if required environment variables are set
if [ -z "$COHERE_API_KEY" ] || [ -z "$OPENAI_API_KEY" ]; then
  echo "ERROR: Required API keys are not set!"
  exit 1
fi

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
  git reset --hard origin/$BRANCH
else
  echo "First-time repository setup..."
  
  # Preserve important files (just .env for now as data will be preserved separately)
  if [ -f "$APP_DIR/.env" ]; then
    echo "Preserving .env file..."
    cp "$APP_DIR/.env" /tmp/canadaspends_env_backup
  fi
  
  # For first-time setup, we'll just clean the directory and clone fresh
  echo "Cleaning directory for clean clone..."
  shopt -s dotglob  # Include dotfiles in * expansion
  rm -rf $APP_DIR/* 2>/dev/null || true
  shopt -u dotglob  # Reset the option
  
  echo "Cloning repository..."
  git clone -b $BRANCH $REPO_URL $APP_DIR
  cd $APP_DIR
  
  # Restore .env file if it existed
  if [ -f "/tmp/canadaspends_env_backup" ]; then
    echo "Restoring .env file..."
    cp /tmp/canadaspends_env_backup $APP_DIR/.env
  fi
fi

# Create an .env file from environment variables
echo "Creating .env file..."
cd $APP_DIR/query-engine
cat > .env << EOF
OPENAI_API_KEY=${OPENAI_API_KEY}
COHERE_API_KEY=${COHERE_API_KEY}
ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
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

# Ensure API keys are properly set for Docker Compose
export OPENAI_API_KEY=${OPENAI_API_KEY}
export COHERE_API_KEY=${COHERE_API_KEY}
export ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
export SLACK_BOT_TOKEN=${SLACK_BOT_TOKEN}
export SLACK_SIGNING_SECRET=${SLACK_SIGNING_SECRET}
export ENVIRONMENT=development

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
  docker-compose -f docker-compose.remote.yaml stop api slackbot nginx chat-ui sqlite
  
  # Remove stopped containers to ensure clean deployment
  docker-compose -f docker-compose.remote.yaml rm -f api slackbot nginx chat-ui sqlite
  
  # Start/update only the non-Weaviate services
  docker-compose -f docker-compose.remote.yaml up -d api slackbot nginx chat-ui sqlite
else
  echo "Performing full redeployment with reindexing..."
  cd $APP_DIR/query-engine
  
  # Complete teardown and rebuild of all services
  docker-compose -f docker-compose.remote.yaml down --remove-orphans || true
  docker-compose -f docker-compose.remote.yaml up -d
fi

echo "Deployment completed successfully" 