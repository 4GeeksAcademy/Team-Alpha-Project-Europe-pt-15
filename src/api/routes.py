"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Clas
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
        user_class = new_user["user_class"],
        user_level= 1
        
        )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "New user is Created"}), 201

@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):

    user = User.query.get(user_id)
    if user is None:
        return "No People with id: " + str(user_id), 400
    
    one_user = user.serialize()

    return jsonify(one_user), 200


@api.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):

    new_updated_user = request.get_json()
    old_user_obj = User.query.get(user_id)

    if old_user_obj is None:
        return "No User with id: " + str(user_id), 400

    if 'name' in new_updated_user:
        old_user_obj.name = new_updated_user['name']

    if 'email' in new_updated_user:
        old_user_obj.email = new_updated_user['email']

    if 'user_class' in new_updated_user:
        old_user_obj.user_class = new_updated_user['user_class']

    if 'level' in new_updated_user:
        old_user_obj.level = new_updated_user['level']

    if 'energy' in new_updated_user:
        old_user_obj.energy = new_updated_user['energy']

    if 'experience' in new_updated_user:
        old_user_obj.experience = new_updated_user['experience']

    db.session.commit()

    return jsonify({"msg": "User is Updated"}), 200

@api.route("/classes",  methods=['GET'])
def get_classes():
    classes= Clas.query.all()
    all_classes= list(map(lambda x: x.serialize(), classes))
    return jsonify(all_classes), 200

@api.route("/classes",  methods=['POST'])
def create_class():
    new_class = request.get_json()

    if 'name' not in new_class:
        return "Name should be in New class Body", 400
    if 'passive' not in new_class:
        return "passive should be in New class Body", 400
    if 'habiliy_1' not in new_class:
        return "email should be in New class Body", 400
    if 'habiliy_2' not in new_class:
        return "email should be in New class Body", 400
    if 'habiliy_3' not in new_class:
        return "email should be in New class Body", 400
  

    new_class = Clas(
        name = new_class['name'],
        passive = new_class['passive'],
        habiliy_1 = new_class['habiliy_1'],
        habiliy_2 = new_class["habiliy_2"],
        habiliy_3= new_class["habiliy_3"] 
        
        )

    db.session.add(new_class)
    db.session.commit()

    return jsonify({"msg": "New class is Created"}), 201

@api.route('/classes/<int:class_id>', methods=['GET'])
def get_class(class_id):

    clas = Clas.query.get(class_id)
    if clas is None:
        return "No class with id: " + str(class_id), 400
    
    one_class = clas.serialize()

    return jsonify(one_class), 200