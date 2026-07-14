# Data Flow Diagram (DFD) — FinWise AI

**Team ID:** _[fill in]_ | **Team Name:** _[fill in]_ | **Date:** _[fill in]_

## Shape Legend
| Shape | Meaning |
|-------|---------|
| Oval | External Entity |
| Rectangle with numbered header | Process (an activity that transforms incoming data into outgoing data) |
| Rectangle (no number) | Data Store |
| Labeled Arrow | Data Flow |

## Level 0 (Context Diagram) — Text Representation

```
[User] --(salary, age, EMIs, credit score)--> (1.0 Collect Applicant Data)
(1.0 Collect Applicant Data) --(structured applicant record)--> [Applicant DB (SQLite)]
(1.0 Collect Applicant Data) --(applicant record)--> (2.0 Run Eligibility & Credit Analysis)
(2.0 Run Eligibility & Credit Analysis) --(prompt + applicant data)--> [Groq AI Model]
[Groq AI Model] --(eligibility verdict + reasoning)--> (2.0 Run Eligibility & Credit Analysis)
(2.0 Run Eligibility & Credit Analysis) --(EMI calculation request)--> (3.0 Calculate EMI)
(3.0 Calculate EMI) --(EMI schedule)--> (2.0 Run Eligibility & Credit Analysis)
(2.0 Run Eligibility & Credit Analysis) --(result + recommendation)--> (4.0 Generate Financial Advisory)
(4.0 Generate Financial Advisory) --(personalized advice)--> [User]
(2.0 Run Eligibility & Credit Analysis) --(analysis log)--> [Applicant DB (SQLite)]
```

## Process Descriptions

| Process | Description |
|---------|-------------|
| **1.0 Collect Applicant Data** | Captures salary, age, existing EMIs, and credit score from the user via the web form |
| **2.0 Run Eligibility & Credit Analysis** | Core logic — combines applicant data with Groq AI reasoning to determine eligibility |
| **3.0 Calculate EMI** | Computes projected EMI based on desired loan amount, tenure, and interest rate |
| **4.0 Generate Financial Advisory** | Converts the raw eligibility result into personalized, human-readable guidance |

## Data Stores
- **Applicant DB (SQLite):** stores applicant records and past analysis logs for reference/history
