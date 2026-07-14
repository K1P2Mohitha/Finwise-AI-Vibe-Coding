# Solution Requirements — FinWise AI

**Team ID:** _[fill in]_ | **Team Name:** _[fill in]_ | **Date:** _[fill in]_

## Functional Requirements

| ID | Requirement |
|----|-------------|
| FR-1 | User can input salary, age, existing EMIs, and credit score |
| FR-2 | System calculates instant loan eligibility (eligible / not eligible / conditionally eligible) |
| FR-3 | System evaluates credit score impact on eligibility |
| FR-4 | System calculates EMI based on loan amount, tenure, and interest rate |
| FR-5 | System generates a personalized financial recommendation via Groq AI |
| FR-6 | System stores applicant data and analysis history in SQLite |
| FR-7 | User can view past eligibility checks (history dashboard) |
| FR-8 | Admin/bank-side view can see aggregated pre-screening analytics (optional/stretch) |

## Non-Functional Requirements

| ID | Category | Requirement |
|----|----------|-------------|
| NFR-1 | Speed | Eligibility result should be returned within 3–5 seconds of submission |
| NFR-2 | Scalability | Backend (Flask) should handle concurrent requests from multiple test users during demo |
| NFR-3 | Security & Data Privacy | API keys stored in `.env`, never hardcoded; applicant financial data not exposed publicly |
| NFR-4 | Reliability | System should degrade gracefully if the Groq AI call fails (fallback message, not a crash) |
| NFR-5 | Usability | Form and results screen should be simple enough for a non-technical user to complete in under 2 minutes |
| NFR-6 | Portability | App should run locally and be shareable via Ngrok for demo purposes |

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend / UI | HTML, CSS, (optionally React or plain JS) |
| Backend | Python, Flask |
| AI Integration | Groq AI (via API key) |
| Database | SQLite |
| Deployment / Demo Exposure | Ngrok |
| Version Control | Git & GitHub |
