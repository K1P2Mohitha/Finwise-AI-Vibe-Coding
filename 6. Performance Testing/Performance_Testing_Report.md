# Performance Testing Report — FinWise AI

**Team ID:** _[fill in]_ | **Date:** _[fill in]_

## Test Cases

| # | Test Case | Input | Expected Output | Actual Output | Status |
|---|-----------|-------|------------------|----------------|--------|
| 1 | Eligible applicant | Salary ₹80,000, age 30, EMIs ₹5,000, credit score 780 | "Eligible" with EMI breakdown | _[fill in]_ | _[Pass/Fail]_ |
| 2 | Conditionally eligible | Salary ₹40,000, age 45, EMIs ₹15,000, credit score 650 | "Conditionally eligible" + advisory tips | _[fill in]_ | _[Pass/Fail]_ |
| 3 | Not eligible | Salary ₹20,000, age 55, EMIs ₹18,000, credit score 550 | "Not eligible" + improvement guidance | _[fill in]_ | _[Pass/Fail]_ |
| 4 | Invalid input (negative salary) | Salary -5000 | Validation error shown | _[fill in]_ | _[Pass/Fail]_ |
| 5 | Groq AI timeout/failure | Simulated API failure | Graceful fallback message, no crash | _[fill in]_ | _[Pass/Fail]_ |
| 6 | Response time | Standard eligibility request | Result within 3–5 seconds | _[fill in]_ | _[Pass/Fail]_ |
| 7 | Concurrent users | 5 simultaneous requests | All handled without server crash | _[fill in]_ | _[Pass/Fail]_ |

## Error Log

| Timestamp | Error | Cause | Resolution |
|-----------|-------|-------|------------|
| _[fill in]_ | _[fill in]_ | _[fill in]_ | _[fill in]_ |

## Summary
_[After running tests, summarize pass rate, average response time, and any known issues still open before demo.]_
