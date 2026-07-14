# Software Requirements Specification (SRS) — FinWise AI

## 1. Introduction
### 1.1 Purpose
FinWise AI provides users instant, AI-assisted loan eligibility analysis, credit score evaluation, EMI calculation, and personalized financial advisory, reducing uncertainty for loan applicants and manual screening load for institutions.

### 1.2 Scope
Web-based platform where users input financial details and receive an eligibility verdict, EMI schedule, and AI-generated advisory guidance.

### 1.3 Intended Users
- Individual loan applicants
- (Secondary) Banks / NBFCs / fintech companies for pre-screening

## 2. Overall Description
### 2.1 Product Perspective
Standalone web app; not integrated into a live banking core system (demo/prototype scope).

### 2.2 User Classes
- **End User (Applicant):** inputs data, views results
- **Admin (optional/stretch):** views aggregate analytics

## 3. Functional Requirements
See `2. Requirement Analysis/Solution_Requirements.md` for the full FR/NFR table.

## 4. External Interface Requirements
- **UI:** Web form (HTML/CSS/JS)
- **API:** Groq AI REST API for advisory text generation
- **Database:** SQLite for applicant records

## 5. Non-Functional Requirements
See `2. Requirement Analysis/Solution_Requirements.md`.

## 6. Assumptions & Constraints
- Demo runs locally, exposed via Ngrok
- Groq API free-tier rate limits apply
- Not a substitute for actual bank underwriting — advisory only
