# Wasabi Backend

FastAPI backend for the Wasabi AI-powered Web Intelligence platform.

## Overview

The backend keeps the existing `routes -> services -> integrations` architecture and now supports:

- Real Groq integration for summarization, signal analysis, and report generation
- Real Bright Data integration for SERP search and webpage extraction
- Typed request and response schemas with Pydantic
- Centralized JSON error handling for timeouts, rate limits, and invalid upstream payloads
- In-memory monitoring, alert, and report state as a bridge until PostgreSQL is introduced
- LangGraph-ready placeholder workflow modules under `app/graph/`

## Environment variables

Create a safe base `.env` file in `backend/` from `.env.example`, then put real secrets into `backend/.env.local`:

```bash
cd backend
copy .env.example .env
copy .env.example .env.local
```

Required integration variables:

```text
GROQ_API_KEY=
BRIGHTDATA_API_KEY=
BRIGHTDATA_SERP_URL=
BRIGHTDATA_SERP_ZONE=
BRIGHTDATA_SCRAPER_URL=
APP_ENV=development
```

Optional app variables:

```text
APP_NAME=Wasabi Backend
FRONTEND_ORIGIN=http://localhost:3000
REQUEST_TIMEOUT_SECONDS=12
MAX_RETRIES=1
GROQ_MODEL=llama3-70b-8192
```

## Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
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

## API routes

- `GET /health`
- `GET /api/dashboard`
- `GET /api/alerts`
- `PATCH /api/alerts/{alert_id}/read`
- `GET /api/competitors`
- `GET /api/monitoring`
- `POST /api/monitoring`
- `POST /api/search`
- `GET /api/reports`
- `POST /api/reports`

## Search flow

`POST /api/search` now runs a real intelligence pipeline:

1. The client submits a company search request.
2. `BrightDataService` calls the configured SERP endpoint.
3. Results are normalized into typed search result objects.
4. `GroqService` analyzes the evidence with `llama3-70b-8192`.
5. The API returns a structured summary, signals, alerts, and raw sources.

Example response shape:

```json
{
  "company": "Tesla",
  "query": "Tesla AI hiring",
  "summary": "Tesla appears to be accelerating AI hiring across autonomy and infrastructure roles.",
  "signals": [
    {
      "type": "hiring",
      "severity": "high",
      "message": "AI hiring surge detected",
      "confidence": 0.88,
      "evidence": ["https://example.com/jobs"]
    }
  ],
  "alerts": [
    {
      "id": "alert_1",
      "company": "Tesla",
      "severity": "high",
      "signal_type": "hiring",
      "summary": "Tesla increased AI hiring activity.",
      "timestamp": "2026-05-27T12:00:00Z",
      "read": false,
      "source_urls": ["https://example.com/jobs"]
    }
  ],
  "results": [],
  "generated_at": "2026-05-27T12:00:00Z"
}
```

## Error handling

The app returns JSON errors for:

- missing configuration
- Bright Data or Groq upstream failures
- invalid upstream payloads
- rate limiting
- timeouts
- request validation errors

## Project structure

```text
backend/
  app/
    config.py
    exceptions.py
    main.py
    mock_data.py
    models.py
    graph/
      nodes.py
      state.py
      workflow.py
    routes/
      alerts.py
      competitors.py
      dashboard.py
      health.py
      monitoring.py
      reports.py
      search.py
    services/
      agent_service.py
      alert_service.py
      brightdata_service.py
      competitor_service.py
      dashboard_service.py
      groq_service.py
      monitoring_service.py
      report_service.py
  .env.example
  requirements.txt
  README.md
```

## Notes

- Bright Data payload formats differ across account setups, so endpoint URLs are fully environment-driven.
- Bright Data SERP direct API requests also require a zone name such as `serp_api1`.
- Keep real credentials in `backend/.env.local`, not in the tracked `.env` template.
- Monitoring, report history, and alert read-state are currently stored in memory and are ready to be replaced by PostgreSQL later.
- `app/graph/` contains placeholders for a future LangGraph workflow without forcing the dependency today.
