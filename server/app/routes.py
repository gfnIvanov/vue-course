import re
from app import app
from flask import request, make_response
from .queries import *


@app.route('/')
def hello():
    return '<h1>Hello!</h1>'


@app.route('/check-user', methods=['POST'])
def check_user():
    code = 200
    try:
        req_data = request.get_json()['data']
        user = db_get_user(req_data['login'])
        if user is None:
            db_add_user(req_data)
            code = 201
        else:
            if req_data['password'] != user.password:
                return make_response({'error': 'Password mismatch'}, code)
        resp_data = {
            'admin': user.admin if user.admin == True else req_data.admin,
            'error': None
        }
        return make_response(resp_data, code)
    except Exception as e:
        return make_response(e, 500)


@app.route('/get-users', methods=['GET'])
def get_users():
    try:
        check_empty = 0
        users_data = []
        users = db_get_users()
        
        for user in users:
            data = {
                'username': user.username,
                'password': re.sub(r'.', '*', user.password),
                'admin': user.admin
            }
            users_data.append(data)
            check_empty += 1
        if check_empty == 0:
            return make_response({'error': 'No users'}, 200)
        return make_response(users_data, 200)
    except Exception as e:
        return make_response(e, 500)


@app.route('/get-products', methods=['GET'])
def get_products():
    try:
        check_empty = 0
        products_data = []
        products = db_get_products()
        for product in products:
            data = {
                'id': product.id,
                'title': product.title,
                'price': round(product.price, 2),
                'category': product.category,
                'description': product.description,
                'image': product.image
            }
            products_data.append(data)
            check_empty += 1
        if check_empty == 0:
            return make_response({'error': 'No products'}, 200)
        return make_response(products_data, 200)
    except Exception as e:
        return make_response(e, 500)


@app.route('/add-product', methods=['POST'])
def add_product():
    try:
        product_data = request.get_json()['data']
        db_add_product(product_data)
        return make_response('OK', 201)
    except Exception as e:
        return make_response(e, 500)