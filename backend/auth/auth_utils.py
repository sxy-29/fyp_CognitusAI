import jwt
from datetime import datetime, timedelta
from config.settings import settings

def create_jwt_token(user_id: str, email: str):
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.utcnow() + timedelta(minutes=settings.JWT_EXPIRE_MINUTES)
    }
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM)


def verify_predefined_credentials(email: str, password: str) -> bool:
    return (
        email == settings.ADMIN_EMAIL and
        password == settings.ADMIN_PASSWORD
    )
