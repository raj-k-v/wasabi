# 🌿 Wasabi: Autonomous Web Intelligence

> **Empowering Enterprise Leadership with High-Signal Competitive Intelligence.**

Wasabi is a next-generation intelligence platform that transforms messy web data into actionable strategic insights. Built for a fast-paced hackathon, it leverages advanced AI and real-time web scraping to monitor pricing, hiring, and market signals across any industry.

---

## 🚀 Live Demo

- **Frontend:** [https://wasabi-lovat.vercel.app/](https://wasabi-lovat.vercel.app/)
- **Backend API:** [https://wasabi-backend-l7dd.onrender.com/docs](https://wasabi-backend-l7dd.onrender.com/docs)

---

## ✨ Key Features

- **Autonomous Signal Capture:** Real-time monitoring of pricing, talent, and release notes using Bright Data.
- **AI Intelligence Synthesis:** Converts raw search fragments into executive briefs using Groq (Llama 3).
- **Executive Dashboard:** A high-level overview of market movements, active alerts, and strategic summaries.
- **Deep Intelligence Search:** On-demand research that crawls the web and generates structured intelligence signals.
- **Fail-Safe Architecture:** Integrated fallback scraping ensuring stability even when premium providers are unavailable.

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (React 19)
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Animations:** Framer Motion
- **Deployment:** Vercel

### Backend
- **Framework:** FastAPI (Python 3.12)
- **AI Engine:** Groq (Llama3-70b)
- **Scraping Infrastructure:** Bright Data (SERP & Scraper APIs)
- **Persistence:** In-memory state management (Production-ready for DB transition)
- **Deployment:** Render

---

## 📁 Repository Structure

```text
wasabi/
├── src/                # Next.js Frontend
│   ├── app/            # App Router (Pages & Layouts)
│   ├── components/     # Reusable UI Components
│   └── lib/            # API Clients & Utilities
├── backend/            # FastAPI Backend
│   ├── app/            # Application Logic
│   │   ├── routes/     # API Endpoints
│   │   ├── services/   # Business Logic & Integrations
│   │   └── models/     # Pydantic Schemas
│   ├── requirements.txt
│   └── Procfile        # Deployment configuration
└── README.md
```

---

## ⚙️ Local Setup

### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment and install dependencies:
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Set up your environment variables in `.env`:
   ```text
   GROQ_API_KEY=your_key
   BRIGHTDATA_API_KEY=your_key
   BRIGHTDATA_SERP_ZONE=serp_api1
   ```
4. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables in `.env.local`:
   ```text
   NEXT_PUBLIC_BACKEND_URL=http://127.0.0.1:8000
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

---

## 🛡️ Security
This project uses `.env` files for secret management. **Never commit your `.env` files to GitHub.** A `.env.example` is provided for guidance.

---

## 🏆 Hackathon Credits
Developed with ❤️ by **Anish** & **Raj**.
🌿 *Wasabi: Stay Sharp.*
