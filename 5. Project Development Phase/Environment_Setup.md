# Environment Setup — FinWise AI

## 1. Virtualization
```bash
python -m venv venv
source venv/bin/activate     # Windows: venv\Scripts\activate
```
Keeps FinWise AI's dependencies isolated from other projects on the same machine.

## 2. Secrets Protection (.env)
Create a `.env` file in the project root (never commit this file — add it to `.gitignore`):
```
GROQ_API_KEY=your_groq_api_key_here
FLASK_SECRET_KEY=your_flask_secret_here
```
Code loads it via `python-dotenv`:
```python
from dotenv import load_dotenv
import os

load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
```

## 3. Manifest / Dependencies (requirements.txt)
```
flask
python-dotenv
groq
requests
```
Install with:
```bash
pip install -r requirements.txt
```

## 4. Reproducibility Checklist
- [ ] `.env.example` file included (with blank/placeholder keys) so teammates know what variables are needed
- [ ] `.gitignore` excludes `.env`, `venv/`, `__pycache__/`, `*.db`
- [ ] `requirements.txt` kept up to date whenever a new package is added
- [ ] README documents exact setup steps for a new teammate/laptop
