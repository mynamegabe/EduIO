# EduIO

Educational Content Generation tool that provides interactive learning tools to enhance students' learning experience.

## Tech Stack
React + NextUI

FastAPI

MySQL

config.py
```python
import secrets
import os

REMOTE = os.getenv("REMOTE", "0") == "1"

DB_USER=""
DB_PASSWORD=""
DB_NAME=""
DB_HOST="localhost" if not REMOTE else "db"

OPENAI_API_KEY=""
GPT_API_URL="https://free.churchless.tech/v1/chat/completions"

SECRET_KEY = secrets.token_hex(16) if REMOTE else "DEV" 

GOOGLE_API_KEY = ""
GOOGLE_CSE_ID = ""
```
