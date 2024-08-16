from datetime import timedelta
from flask import Blueprint, Response, app, jsonify, request
from sqlalchemy import null
# from flask_jwt_extended import create_access_token
from connectors.mysql_connector import engine
from sqlalchemy.orm import sessionmaker
from models.sellers import Sellers
from flask_login import login_required, login_user, logout_user, current_user
seller_routes = Blueprint("seller_routes", __name__)


##create new user
@seller_routes.route('/sellers/registration', methods=['POST'])
def new_Sellers():

    Session = sessionmaker(engine)
    s = Session()
    s.begin()
    input_business_name = request.json['store_name'] 

    check_business_name_existing_query = s.query(Sellers).where(Sellers.store_name == input_business_name).first()

    try:
        if check_business_name_existing_query:
            return { "message": "Name already exists please use a different one" }, 400
        ##kalo store name nya sama

        NewSellers = Sellers(
        store_name=request.json['store_name'],
        store_address=request.json['store_address'],
        store_category=request.json['store_category'],
        store_city=request.json['store_city'],

        )

        s.add(NewSellers)
        s.commit()
    except Exception as e:
        print(e)
        s.rollback()
        return { "message": "Failed to register your store" }, 500

    return { 'message': 'Successfully created your seller profile!'}, 200


# ##get the current user
# @seller_routes.route("/sellers/me", methods=['GET'])
# @login_required

# def get_current_user():
#     Session = sessionmaker(engine)
#     s = Session()
#     # with Session() as s:
#     try:
#         # Logic Apps
#         me=[]
#         user_query= s.query(Sellers).where(Sellers.email == current_user.email,  Sellers.id == current_user.id)
#         results = s.execute(user_query)
#         for row in results.scalars():
#             me.append({
#                 'email': row.email,
#                 'email': row.email,
#             })
        
#         return { 'message': 'Successfully fetch current user', 'Sellers':me}, 200
#     except Exception as e:
#         # Rollback
#         print(e)
        
#         # Kirim Error Message
#         return { 'message': 'Unexpected Error' }, 500

# ##modify current user
# @seller_routes.route('/sellers/me', methods=['PUT'])
# @login_required
# def Sellers_update():
#     Session = sessionmaker(engine)
#     s = Session()
#     s.begin()
#     input_email = request.json['email'] 
#     input_email =request.json['email']
#     check_email_existing_query = s.query(Sellers).where(Sellers.email == input_email, Sellers.id != current_user.id).first()
#     input_same_email_query = s.query(Sellers).where(Sellers.email == input_email, Sellers.id == current_user.id).first()
#     check_email_existing_query = s.query(Sellers).where(Sellers.email == input_email, Sellers.id != current_user.id).first()
#     try:
#         user = s.query(Sellers).filter(Sellers.id == current_user.id).first()
#         ##kalo email exist terus tapi bukan punya dia
#         if check_email_existing_query and check_email_existing_query:
#             return { "message": "Email and email already exists please use a different one" }, 400
#         if check_email_existing_query:
#             return { "message": "Email already exists please use a different one" }, 400
#         ##kalo email nya sama, terus punya dia, can just update email
#         if check_email_existing_query:
#             return { "message": "email already exists please use a different one" }, 400
#         if input_same_email_query:
#             user.email = request.json['email']
#         if not input_same_email_query:
#             user.email = request.json['email']
#             user.email = request.json['email'] 
#         # if request.json['email'] and request.json['email']:
#         #     user.email = request.json['email']
#         #     user.email = request.json['email']
#         #     print('changing email and email' + str(Sellers.id))

#         # elif request.json['email'] is null:
#         #     user.email = request.json['email']
#         #     print('changing email only' + str(user.email))
#         # elif request.json['email']:
#         #     user.email = request.json['email']
#         #     print('changing email only' + str(user.email))

#         s.commit()
#     except Exception as e:
#         print(e)
#         s.rollback()
#         return { "message": "Failed to Update" }, 500

#     return { 'message': 'Your email and email has been changed to email:' +" "+user.email+" email:"+ user.email}, 200

# @seller_routes.route('/sellers/login', methods=['POST'])
# def logging_in():
    
#     Session = sessionmaker(engine)
#     s = Session()
#     s.begin()
    
#     try:
#         email = request.json['email']
#         user = s.query(Sellers).filter(Sellers.email == email).first()

#         if user == None:
#             return { "message": "User not found" }, 403
#         if not user.check_password(request.json['password']):
#             return { "message": "Invalid password" }, 403
        
#         #kalo diatas dilewatin berarti bisa login, dibawah biar dipass ke login manager
#         login_user(user)

#         # harus get session id -> kalo pake postman. kalo di browser gausah 
#         session_id = request.cookies.get('session')
#         # session_id.cookie_age =5
#         return {
#             "session_id": session_id,
#              "message": "Login successful"}, 200
        
#     except Exception as e:
#         print(e)
#         s.rollback()
#         return { "message": "Incorrect email or Password" }, 500

# @seller_routes.route('/logout', methods=['GET'])
# @login_required

# def user_logout():
#     Session = sessionmaker(engine)
#     s = Session()
#     s.begin()
#     user_query= s.query(Sellers.email).where(Sellers.email == current_user.email,  Sellers.id == current_user.id)
#     current_email = s.execute(user_query).scalar()
#     logout_user()
#     return { "message": "Successfully logged out, see you later! " + current_email}


# # @seller_routes.route('/product/<id>', methods=['DELETE'])
# # def product_delete(id):
# #     Session = sessionmaker(connection)
# #     s = Session()
# #     s.begin()
# #     try:
# #         product = s.query(Product).filter(Product.id == id).first()
# #         s.delete(product)
# #         s.commit()
# #     except Exception as e:
# #         print(e)
# #         s.rollback()
# #         return { "message": "Fail to Delete" }, 500

# #     return { 'message': 'Success delete product data'}, 200

# @product_routes.route('/product/<id>', methods=['PUT'])
# def product_update(id):
