from src.extension import DB_URI


class Config:
    SQLALCHEMY_DATABASE_URI = DB_URI
    SECRET_KEY = "greenhub"
    JWT_TOKEN_LOCATION = ["headers", "cookies"]
