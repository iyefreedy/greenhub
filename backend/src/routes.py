
import sys
import os
from functools import reduce
from flask import Blueprint, request, jsonify
from cerberus import Validator
from flask_jwt_extended import create_access_token, jwt_required, current_user
from werkzeug.utils import secure_filename

from src.utils import generate_invoice_number
from src.extension import db
from src.schema import register_schema, login_schema
from src.models import User, Seller, Product, Transaction, TransactionDetail

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}
UPLOAD_FOLDER = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../static/images/drawings')

api_blueprint = Blueprint("api", __name__, url_prefix='/api')


@api_blueprint.post('register')
def register():

    try:
        data: dict = request.get_json()
        v = Validator(register_schema)
        if not v.validate(data):
            return jsonify(error="Invalid parameter " + next(iter(v.errors))), 400

        existing_user = User.query.filter_by(email=data.get('email')).first()

        if existing_user is not None:
            return jsonify(error="Email already registered"), 400

        new_user = User(
            first_name=data.get('first_name'),
            last_name=data.get('last_name'),
            password_hash=data.get('password'),
            email=data.get('email'),
        )
        db.session.add(new_user)
        db.session.commit()

        access_token = create_access_token(new_user)
        return jsonify(message="Success", access_token=access_token), 201

    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e))


@api_blueprint.post('login')
def login():
    try:
        data: dict = request.get_json()
        v = Validator(login_schema)
        if not v.validate(data):
            return jsonify(error="Invalid parameter " + next(iter(v.errors))), 400

        existing_user = User.query.filter_by(email=data.get('email')).first()

        if existing_user is None:
            return jsonify(error="Invalid credential"), 401

        access_token = create_access_token(existing_user)
        return jsonify(message="Success", access_token=access_token), 200

    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e))


@api_blueprint.get('authorize')
@jwt_required()
def authorize():
    print(current_user.seller.city, file=sys.stderr)
    return {
        "id": current_user.id,
        "first_name": current_user.first_name,
        "last_name": current_user.last_name,
        "email": current_user.email,
        "is_seller": True if current_user.seller is not None else False,
        "seller": None if current_user.seller is None else {
            "name": current_user.seller.name,
            "city": current_user.seller.city,
            "address": current_user.seller.address,
            "balance": current_user.seller.balance,
        }
    }


@api_blueprint.post('sellers')
@jwt_required()
def create_seller():
    data: dict = request.get_json()

    try:

        new_seller = Seller(
            name=data.get('name'),
            city=data.get('city'),
            address=data.get('address'),
            user_id=current_user.id
        )

        db.session.add(new_seller)
        db.session.commit()

        return jsonify(message="Seller has been created"), 201
    except Exception as e:
        print(str(e), file=sys.stderr)
        return jsonify(message=str(e)), 500


@api_blueprint.get("seller/products")
@jwt_required()
def get_products_seller():

    products = Product.query.filter_by(seller_id=current_user.seller.id).all()

    return [product.serialize() for product in products]


@api_blueprint.get("products")
def get_products():
    products = Product.query
    query = request.args.get('query')

    if query is not None and query != "":
        search = "%{}%".format(query)
        products = products.filter(Product.name.like(search))

    products = products.all()

    print(products, file=sys.stderr)

    return [product.serialize() for product in products]


@api_blueprint.get("products/<int:id>")
def get_product(id):
    product = Product.query.filter_by(id=id).first()

    if product is None:
        return jsonify(message="Product not found"), 404

    return product.serialize()


@api_blueprint.post("products")
@jwt_required()
def create_product():
    try:

        data = request.form
        filename = None

        if "image" in request.files:
            file = request.files['image']
            filename = secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_FOLDER, filename))

        new_product = Product(
            name=data.get('name'),
            seller_id=current_user.seller.id,
            description=data.get('description'),
            price=data.get('price'),
            stock=data.get('stock'),
            image=filename
        )

        db.session.add(new_product)
        db.session.commit()

        return jsonify(message="Product created"), 201
    except Exception as e:
        db.session.rollback()
        return jsonify(error=str(e)), 500


@api_blueprint.post("transactions")
@jwt_required()
def create_transaction():
    data: dict = request.get_json()

    try:
        last_transaction = Transaction.query.order_by(
            db.desc(Transaction.created_at)).first()

        total_price = reduce(
            (lambda x, y: x + (float(y['price']) * int(y['quantity']))), data.get('products'), 0)

        transaction = Transaction(
            user_id=current_user.id,
            total_price=total_price,
            invoice_number=generate_invoice_number(
                last_invoice_number=last_transaction.invoice_number if last_transaction is not None else None),
        )
        db.session.add(transaction)

        db.session.flush()
        for product in data.get('products'):
            transaction_detail = TransactionDetail(
                transaction_id=transaction.id,
                product_id=product['id'],
                quantity=product['quantity'],
                price=product['price']
            )
            db.session.add(transaction_detail)

        db.session.commit()

        return jsonify(message="Success"), 201
    except Exception as e:
        db.session.rollback()
        print(str(e), file=sys.stderr)
        return jsonify(message=str(e)), 500
