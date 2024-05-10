"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/users",  methods=['GET'])
def get_users():
    users= User.query.all()
    all_users= list(map(lambda x: x.serialize(), users))
    return jsonify(all_users), 200

@api.route("/users",  methods=['POST'])
def create_user():
    new_user = request.get_json()

    if 'name' not in new_user:
        return "Name should be in New user Body", 400
    if 'password' not in new_user:
        return "password should be in New user Body", 400
    if 'email' not in new_user:
        return "email should be in New user Body", 400
    

    new_user = User(
        name = new_user['name'],
        password = new_user['password'],
        email = new_user['email'],
        user_level= 1
        
        )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "New user is Created"}), 201