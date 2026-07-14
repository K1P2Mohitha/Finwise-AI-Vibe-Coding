# Prompt Logs — FinWise AI

> Record every AI-assisted task: the system/context prompt used, a brief summary of the output, and whether it was iterated on.

| # | Task | System / Context Prompt | Output Summary | Iterated? |
|---|------|--------------------------|------------------|-----------|
| 1 | Generate Flask API boilerplate | "Act as a senior Python/Flask developer. Generate a boilerplate Flask app with routes for /check-eligibility, /calculate-emi, /get-advisory." | Produced a working Flask skeleton with route stubs and basic error handling | Yes — refined to add `.env` config loading |
| 2 | Design eligibility rules logic | "Act as a financial systems engineer. Suggest a rule-based scoring approach combining salary, age, EMIs, and credit score to output eligible/conditional/not-eligible." | Returned a weighted scoring formula and threshold logic | Yes — adjusted weights after testing edge cases |
| 3 | Draft Groq AI advisory prompt | "Write a system prompt for an AI financial advisor that explains loan eligibility results in plain language and gives 2-3 actionable tips." | Produced a reusable prompt template for the advisory feature | No — used as-is |
| 4 | Generate SQLite schema | "Design a SQLite schema for storing applicant details and eligibility check history." | Returned `applicants` and `analysis_logs` table definitions | Yes — added timestamp column |
| 5 | Debug EMI formula | "Review this EMI calculation function for correctness against the standard EMI formula." | Identified an off-by-one error in tenure-in-months conversion | No |

_Add rows as your team progresses. Keep each output summary brief — full raw AI output does not need to be pasted here._
