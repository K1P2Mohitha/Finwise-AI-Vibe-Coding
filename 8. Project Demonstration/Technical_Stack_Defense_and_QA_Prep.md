# Technical Stack Defense & Q&A Prep — FinWise AI

## Why This Stack?

| Choice | Why we chose it (be ready to say this out loud) |
|--------|----------------------------------------------------|
| **Python + Flask** | Lightweight, fast to prototype, well-suited for combining business logic (EMI math, eligibility rules) with AI API calls |
| **Groq AI** | Provides fast inference for generating natural-language advisory text, cheaper/faster than heavier LLM APIs for our demo scale |
| **SQLite** | Zero-setup, file-based database — ideal for a prototype/demo without needing a hosted DB server |
| **Ngrok** | Lets us expose our local Flask server publicly for live demo/testing without full cloud deployment |

## Anticipated Questions & Suggested Answers

**Q: Why not use a real bank credit bureau API instead of just user-entered credit score?**
A: For this prototype, credit score is a user-provided or simulated input. In production, this would integrate with a real bureau (we reference TransUnion's standards). That's flagged as future scope.

**Q: How does the AI actually decide eligibility — is it just guessing?**
A: No — eligibility is determined by rule-based logic (salary, EMI ratio, age, credit score thresholds). Groq AI is used specifically to *explain* the result and generate advisory text in natural language, not to make the eligibility decision itself. This keeps the core decision auditable and explainable.

**Q: What happens if the AI API fails or is slow?**
A: We built a fallback — if the Groq API call fails, the user still sees their eligibility result (from the rule engine) with a generic advisory message, so the app doesn't break.

**Q: How is this different from existing loan calculators?**
A: Existing tools like Paisabazaar give a static number. FinWise AI explains *why* and gives personalized, actionable next steps — that's the core differentiator.

**Q: How would this scale to real banking use?**
A: Move from SQLite to a production DB (PostgreSQL), add authentication, integrate real credit bureau APIs, and add compliance/audit logging for financial regulations.

**Q: What was the hardest part to build?**
A: _[Be honest — pick something real, e.g., "tuning the eligibility rule weights so the results felt fair and realistic across different applicant profiles."]_
