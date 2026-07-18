from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Zoom Clone API"
    VERSION: str = "1.0.0"

    DATABASE_URL: str = "sqlite:///./zoom_clone.db"

    FRONTEND_URL: str = "https://zoom-clone-1-r2ly.onrender.com"

    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://zoom-clone-1-r2ly.onrender.com",
    ]

    class Config:
        env_file = ".env"

settings = Settings()
