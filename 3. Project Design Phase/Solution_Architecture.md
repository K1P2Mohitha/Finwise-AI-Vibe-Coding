# Solution Architecture — FinWise AI

**Team ID:** _[fill in]_ | **Team Name:** _[fill in]_ | **Date:** _[fill in]_

## High-Level Layered Architecture

```
┌───────────────────────────────────────────┐
│           Presentation Layer               │
│  HTML / CSS / JS — applicant input form,   │
│  results dashboard, advisory panel         │
└───────────────────┬───────────────────────┘
                     │  HTTP requests
┌───────────────────▼───────────────────────┐
│              API / Backend Layer            │
│  Flask — routes for /check-eligibility,     │
│  /calculate-emi, /get-advisory              │
└───────────────────┬───────────────────────┘
                     │
        ┌────────────┴─────────────┐
        │                           │
┌───────▼────────┐         ┌───────▼────────┐
│   AI Layer      │         │   Data Layer    │
│  Groq AI API —   │         │  SQLite —       │
│  eligibility     │         │  applicant       │
│  reasoning &     │         │  records, logs   │
│  advisory text   │         │                 │
└─────────────────┘         └─────────────────┘
```

## Component Table

| Layer | Component | Description | Technology |
|-------|-----------|-------------|-----------|
| Presentation | Frontend UI | Bridge between the solution and the user; captures inputs, displays results | HTML, CSS, JS |
| API / Backend | Flask App | Handles routing, business logic (EMI math, eligibility rules), orchestrates AI calls | Python, Flask |
| AI | Groq AI Integration | Generates explainable eligibility reasoning and personalized financial advice | Groq API |
| Data | SQLite DB | Stores applicant records, past analyses for the history dashboard | SQLite |
| Deployment | Ngrok Tunnel | Exposes local Flask server publicly for demo/testing | Ngrok |
