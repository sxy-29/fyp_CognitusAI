from pydantic_settings import BaseSettings 

class Settings(BaseSettings):
    JWT_SECRET: str = "supersecretkey123"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 day

    # Predefined login credentials
    ADMIN_EMAIL: str = "cognitus@gmail.com"
    ADMIN_PASSWORD: str = "cognitus@123"

settings = Settings()
