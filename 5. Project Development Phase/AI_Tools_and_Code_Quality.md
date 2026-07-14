# AI Tools Used & Code Quality Notes — FinWise AI

## AI Tools Used

| Tool | Purpose |
|------|---------|
| Antigravity IDE | Primary development environment; agent-assisted coding |
| Groq AI (API) | Powers eligibility reasoning and financial advisory generation |
| Claude / ChatGPT (as applicable) | Boilerplate generation, debugging assistance, documentation drafting |

## Code Readability & Reusability

- Functions are modular: `calculate_emi()`, `check_eligibility()`, `generate_advisory()` are separated by responsibility so each can be reused or tested independently.
- Environment/config values (API keys, DB path) are never hardcoded — pulled from `.env`.
- Naming conventions follow `snake_case` for Python functions/variables, consistent with PEP 8.
- Advisory-generation logic is decoupled from the Flask route handler, so the same function could be reused in a future mobile app or CLI tool without rewriting.

## Feature Completion Checklist

| Feature | Status |
|---------|--------|
| User authentication (if included) | _[Completed / Partial / Not Started]_ |
| Applicant data input form | _[Completed / Partial / Not Started]_ |
| Eligibility check engine | _[Completed / Partial / Not Started]_ |
| EMI calculator | _[Completed / Partial / Not Started]_ |
| Groq AI advisory integration | _[Completed / Partial / Not Started]_ |
| Applicant history dashboard | _[Completed / Partial / Not Started]_ |
| Data storage (SQLite) | _[Completed / Partial / Not Started]_ |
