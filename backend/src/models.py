import bcrypt
from datetime import datetime
from src.extension import db


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    _password_hash = db.Column("password_hash",
                               db.String(100), nullable=False)
    phone = db.Column(db.String(100), nullable=True)
    balance = db.Column(db.Float(10, 2), default=0)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(
        db.DateTime, default=datetime.now, onupdate=datetime.now)

    seller = db.relationship("Seller", backref="user",
                             lazy=True, uselist=False)

    def check_password(self, password: str):
        return bcrypt.checkpw(password.encode('utf-8'), self.password_hash.encode('utf-8'))

    @property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, raw_password: str):
        self._password_hash = bcrypt.hashpw(raw_password.encode(
            'utf-8'), bcrypt.gensalt()).decode('utf-8')


class ShippingAddress(db.Model):
    __tablename__ = 'shipping_addresses'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.ForeignKey("users.id"))

    street_address = db.Column(db.String(255), nullable=False)
    post_code = db.Column(db.String(5), nullable=False)


class Seller(db.Model):
    __tablename__ = "sellers"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.ForeignKey("users.id"))

    name = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(60), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    balance = db.Column(db.Float(10, 2), default=0)
    created_at = db.Column(
        db.DateTime, default=datetime.now)
    updated_at = db.Column(
        db.DateTime, default=datetime.now, onupdate=datetime.now)


class Product(db.Model):
    __tablename__ = "products"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    seller_id = db.Column(db.ForeignKey("sellers.id"))

    name = db.Column(db.String(100), nullable=False)
    image = db.Column(db.String(100), nullable=True)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float(10, 2), default=0)
    stock = db.Column(db.Integer, default=0)
    created_at = db.Column(
        db.DateTime, default=datetime.now)
    updated_at = db.Column(
        db.DateTime, default=datetime.now, onupdate=datetime.now)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "image": self.image,
            "description": self.description,
            "price": self.price,
            "stock": self.stock,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
