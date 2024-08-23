from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import URL
from flask_jwt_extended import JWTManager
from flask_cors import CORS

DB_URI = URL.create(
    database="greenhub",
    drivername="mysql",
    host="localhost",
    port="3306",
    password="",
    username="root"
)

db = SQLAlchemy()
jwt = JWTManager()
cors = CORS(resources={r"/api/*": {"origins": "http://localhost:3000",
            "supports_credentials": True}}, supports_credentials=True)


@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id


@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    from src.models import User

    identity = jwt_data["sub"]
    return User.query.filter_by(id=identity).one_or_none()
