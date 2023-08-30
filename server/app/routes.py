from app import app
from flask import request, make_response
from .queries import add_user, get_user


@app.route('/')
def hello():
    return '<h1>Hello!</h1>'


@app.route('/check-user', methods=['POST'])
def check_user():
    code = 200
    try:
        req_data = request.get_json()['data']
        user = get_user(req_data['login'])
        if user is None:
            add_user(req_data)
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
        make_response(e, 500)
