# CanadaSpends Development Guide

## Build Commands
- Python API: `uvicorn src.main:app --host=0.0.0.0 --port=8000 --reload`
- Docker: `docker-compose up --build`
- TypeScript Slackbot: `cd slackbot && npm run dev`

## Style Guidelines

### Python
- Imports: Standard lib → third-party → local modules
- Naming: snake_case for variables/functions, PascalCase for classes
- Types: Use type hints where possible (inconsistent currently)
- Error handling: Use specific exception types with descriptive messages
- Logging: Use loguru for logging

### TypeScript
- Naming: camelCase for variables/functions
- Error handling: Try/catch with console.error logging

## Project Structure
- query-engine/: Main Python backend
- slackbot/: TypeScript Slack integration
- terraform/: AWS deployment configuration

This is a data processing and query pipeline for Canadian government spending data.