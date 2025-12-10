from fastapi import APIRouter
from pydantic import BaseModel
from auth.auth_controller import login_service

router = APIRouter(prefix="/auth", tags=["Authentication"])

class LoginRequest(BaseModel):
    email: str
    password: str

@router.post("/login")
def login(data: LoginRequest):
    return login_service(data.email, data.password)
