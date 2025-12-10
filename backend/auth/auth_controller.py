from fastapi import HTTPException, status
from auth.auth_utils import create_jwt_token, verify_predefined_credentials

# Fixed user data
FIXED_USER = {
    "id": "1",
    "name": "User",
    "email": "cognitus@gmail.com"
}

def login_service(email: str, password: str):
    if not verify_predefined_credentials(email, password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    token = create_jwt_token(FIXED_USER["id"], FIXED_USER["email"])

    return {
        "token": token,
        "user": FIXED_USER
    }
