# User Manual — FinWise AI

## Getting Started
1. Open the FinWise AI web app link (or run locally at `http://127.0.0.1:5000`)
2. Fill in your details: salary, age, existing EMIs, and credit score
3. Click **Check Eligibility**
4. View your instant eligibility result and EMI breakdown
5. Read the personalized financial advisory generated for you
6. (Optional) View your past checks in the history dashboard

## Input Guidelines
- Salary: monthly income in ₹, numeric only
- Age: must be 18–65
- Existing EMIs: total of all current monthly loan/EMI payments
- Credit score: 300–900 (CIBIL-style range)

## Understanding Your Results
- **Eligible:** You meet the standard criteria for the loan type checked
- **Conditionally Eligible:** You may qualify with adjustments — read the advisory for specifics
- **Not Eligible:** Current profile doesn't meet criteria — advisory explains what to improve

## Troubleshooting
| Issue | Fix |
|-------|-----|
| Page won't load | Check that the Flask server / Ngrok tunnel is running |
| "Advisory unavailable" message | Groq AI call may have failed — retry after a few seconds |
| Incorrect EMI shown | Confirm loan amount, tenure, and interest rate were entered correctly |
