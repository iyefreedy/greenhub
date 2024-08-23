from flask import Flask, jsonify
from src.extension import db, jwt, cors
from src.routes import api_blueprint


def create_app():
    app = Flask(__name__)
    app.json.sort_keys = False
    app.config.from_object("src.config.Config")

    cors.init_app(app)
    db.init_app(app)
    jwt.init_app(app)

    app.register_blueprint(api_blueprint)

    return app
