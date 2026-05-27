# Wasabi Backend

FastAPI backend for the Wasabi AI web intelligence MVP.

## What exists now

- Health check API
- Dashboard API
- Alerts API
- Competitors API
- Monitoring API
- Search API routed through mock Bright Data and OpenAI service layers
- Reports API routed through a report service

## Setup

```bash
cd backend
python -m venv .venv
source .venv/Scripts/activate
pip install -r requirements.txt
```

## Run locally

```bash
uvicorn app.main:app --reload
```

Open:

```text
http://127.0.0.1:8000/docs
```

## Environment

Copy `.env.example` to `.env` when real keys are available.

```text
APP_NAME=Wasabi Backend
FRONTEND_ORIGIN=http://localhost:3000
BRIGHT_DATA_API_KEY=
OPENAI_API_KEY=
```

The current services return mock data. Replace the logic in `app/services/bright_data_service.py` and `app/services/openai_service.py` when real API keys are available.
