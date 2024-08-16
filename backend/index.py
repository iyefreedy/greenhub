from datetime import datetime, timedelta
import os
from flask import Flask, Response, request, session
from dotenv import load_dotenv
from connectors.mysql_connector import connection
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text,select
from controllers.users import user_routes
from controllers.sellers import seller_routes
from flask_login import LoginManager, current_user
# from flask_jwt_extended import JWTManager
from models.users import Users
load_dotenv()
from flask import Flask, Response, redirect, url_for, request, session, abort, g
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app)

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.register_blueprint(user_routes)
app.register_blueprint(seller_routes)
# jwt=JWTManager(app) ##jason web token

##biar bisa login
login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    Session = sessionmaker(connection)
    s = Session()
    return s.query(Users).get(int(user_id))


@app.route("/")
def hello_world():
        
        return "Product inserted!"


@app.before_request
def before_request():
    session.permanent = True
    app.permanent_session_lifetime = timedelta(minutes=300)
    session.modified = True
    g.user = current_user