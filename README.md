# Wasabi

Wasabi is an AI-powered web intelligence platform with a Next.js frontend and a FastAPI backend.

## Stack

- Frontend: Next.js 15, React 19, Tailwind CSS, Zustand
- Backend: FastAPI, Pydantic
- AI: Groq with `llama3-70b-8192`
- Data acquisition: Bright Data SERP API

## Repo structure

```text
wasabi/
  backend/        FastAPI backend
  src/            Next.js app source
  package.json    Frontend scripts and dependencies
```

## Frontend

The frontend includes:

- landing page
- dashboard
- search
- monitoring
- alerts
- competitors
- reports
- settings

Run it locally:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Backend

The backend keeps a clean `routes -> services -> integrations` architecture and includes:

- typed request and response schemas
- Groq-powered summary, signal, and report generation
- Bright Data SERP integration
- centralized JSON error handling
- LangGraph-ready placeholder workflow files

Backend setup:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Create `backend/.env` from `backend/.env.example`, then put real secrets in `backend/.env.local`:

```text
GROQ_API_KEY=
BRIGHTDATA_API_KEY=
BRIGHTDATA_SERP_URL=https://api.brightdata.com/request
BRIGHTDATA_SERP_ZONE=
BRIGHTDATA_SCRAPER_URL=
```

Run the backend:

```bash
uvicorn app.main:app --reload
```

Open:

```text
http://127.0.0.1:8000/docs
```

See the backend-specific guide in [backend/README.md](/C:/Users/Raj/Desktop/t/wasabi/backend/README.md).

## Current status

- The backend search flow is wired to real Groq and Bright Data SERP calls.
- The frontend platform routes are connected to the backend.
- The old mock-data module is no longer used in the app flow.
- Bright Data page scraping is not finished until a proper Web Unlocker API setup is added.

## Recommended local workflow

Run both apps in separate terminals:

Terminal 1:

```bash
cd backend
uvicorn app.main:app --reload
```

Terminal 2:

```bash
npm run dev
```

## Notes

- Do not commit real API keys.
- Rotate any secrets that were exposed in screenshots or chat.
- Keep local backend secrets in `backend/.env.local`.
