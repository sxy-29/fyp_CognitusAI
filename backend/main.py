from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from auth.auth_router import router as auth_router

app = FastAPI()

# Allow frontend access
origins = [
    "http://localhost:5173",   # Vite frontend
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],       # Allow POST, GET, etc.
    allow_headers=["*"],       # Allow Authorization header
)

# Public route
app.include_router(auth_router)

# Protected route 
