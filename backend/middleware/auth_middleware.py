import jwt
from fastapi import Request, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from config.settings import settings

bearer_scheme = HTTPBearer()

def verify_token(request: Request):
    credentials: HTTPAuthorizationCredentials = bearer_scheme(request)
    
    if credentials is None:
        raise HTTPException(status_code=401, detail="Token missing")

    token = credentials.credentials

    try:
        payload = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM])
        return payload  # contains user email + id
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
