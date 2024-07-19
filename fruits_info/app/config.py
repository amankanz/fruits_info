from pydantic import BaseSettings


class Settings(BaseSettings):
    groq_key: str
    class Config:
        env_file = ".env"

settings = Settings()