# API Documentation — FinWise AI

Base URL (local): `http://127.0.0.1:5000`
Base URL (demo/Ngrok): `_[fill in ngrok URL]_`

## POST /check-eligibility
Checks loan eligibility based on applicant financial data.

**Request Body:**
```json
{
  "salary": 80000,
  "age": 30,
  "existing_emis": 5000,
  "credit_score": 780
}
```

**Response:**
```json
{
  "eligibility": "Eligible",
  "reason": "Stable income, low existing EMI burden, strong credit score",
  "max_recommended_loan": 2500000
}
```

## POST /calculate-emi
Calculates EMI for a given loan amount, tenure, and interest rate.

**Request Body:**
```json
{
  "loan_amount": 2000000,
  "tenure_months": 240,
  "interest_rate": 8.5
}
```

**Response:**
```json
{
  "monthly_emi": 17356.23,
  "total_interest": 2165495.20,
  "total_payment": 4165495.20
}
```

## POST /get-advisory
Returns AI-generated personalized financial advisory.

**Request Body:**
```json
{
  "eligibility": "Conditionally Eligible",
  "salary": 40000,
  "existing_emis": 15000,
  "credit_score": 650
}
```

**Response:**
```json
{
  "advisory": "Your existing EMI burden is limiting your eligibility. Consider reducing existing debt before applying, and your credit score could improve with 3-6 months of on-time payments."
}
```
