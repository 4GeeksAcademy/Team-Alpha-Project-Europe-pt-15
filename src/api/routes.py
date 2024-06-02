"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Role, Difficulty, Task, Rarity, Reward, Bestiary, Ability, Combat_text
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

###################################################################################  ROLES ROUTES

@api.route("/roles", methods=['GET'])
def get_roles_list():
    roles= Role.query.all()
    all_roles= list(map(lambda x: x.serialize(), roles))
    return jsonify(all_roles), 200

###################################################################################  ABILITY ROUTES

@api.route("/ability",  methods=['GET'])
def get_all_abilities():
    ability= Ability.query.all()
    all_abilities= list(map(lambda x: x.serialize(), ability))
    return jsonify(all_abilities), 200


###################################################################################  TASK DIFFICULTY ROUTES

@api.route("/difficulty",  methods=['GET'])
def get_difficulties():
    difficulties= Difficulty.query.all()
    all_difficulties= list(map(lambda x: x.serialize(), difficulties))
    all_difficulties.insert(0, None)
    return jsonify(all_difficulties), 200

###################################################################################  REWARD RARITY ROUTES

@api.route("/rarity",  methods=['GET'])
def get_rarities():
    rarity= Rarity.query.all()
    all_rarities= list(map(lambda x: x.serialize(), rarity))
    all_rarities.insert(0, None)
    return jsonify(all_rarities), 200

###################################################################################  COMBAT ROUTES

@api.route("/combat",  methods=['GET'])
def get_all_combat_text():
    text= Combat_text.query.all()
    all_text= list(map(lambda x: x.serialize(), text))
    return jsonify(all_text), 200

###################################################################################  USER ROUTES

@api.route('/login', methods=['POST'])
def login_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify({"msg": "Email or Password is Wrong!"}), 401
    
    jwt_token = create_access_token(identity=user.id)
    return jsonify({ "token": jwt_token, "user_id": user.id })

@api.route("/users",  methods=['GET'])
def get_all_users():
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
        level= 1,
        experience = 0,
        energy = 0,
        encounter = False
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "New user is Created"}), 201

@api.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):

    user = User.query.get(user_id)
    if user is None:
        return "No People with id: " + str(user_id), 400

    role = Role.query.get(user.user_role)

    ability = Ability.query.filter_by(role_id = user.user_role)
    role_abilities = list(map(lambda x: x.serialize(), ability))

    for x in role_abilities:
        rarity = Rarity.query.get(x["rarity_id"])
        x.update({"energy_required": rarity.energy_required})

    role_abilities.insert(0, None)

    one_user = user.serialize()
    one_user.update({"role": role.name})

    return jsonify(one_user, role_abilities), 200

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

    if 'user_role' in new_updated_user:
        old_user_obj.user_role = new_updated_user['user_role']

    if 'level' in new_updated_user:
        old_user_obj.level = new_updated_user['level']

    if 'energy' in new_updated_user:
        old_user_obj.energy = new_updated_user['energy']

    if 'experience' in new_updated_user:
        old_user_obj.experience = new_updated_user['experience']

    if 'password' in new_updated_user:
        old_user_obj.password = new_updated_user['password']

    if 'encounter' in new_updated_user:
        old_user_obj.encounter = new_updated_user['encounter']

    db.session.commit()

    return jsonify({"msg": "User is Updated"}), 200

###################################################################################  TASKS ROUTES

@api.route("/tasks",  methods=['GET'])
def get_tasks():
    tasks= Task.query.all()
    all_tasks= list(map(lambda x: x.serialize(), tasks))
    return jsonify(all_tasks), 200

@api.route("/tasks",  methods=['POST'])
def create_task():
    new_task = request.get_json()

    if 'label' not in new_task:
        return "label should be in New task Body", 400
    if 'user_id' not in new_task:
        return "user_id should be in New task Body", 400
    if 'task_difficulty_id' not in new_task:
        return "task_difficulty_id should be in New task Body", 400

    new_task = Task(
        label = new_task['label'],
        user_id = new_task['user_id'],
        task_difficulty_id = new_task['task_difficulty_id'],
        done = False,
        onboard = True

        )

    db.session.add(new_task)
    db.session.commit()

    return jsonify({"msg": "New Task is Created"}), 201


@api.route('/tasks/<int:the_user_id>', methods=['GET'])
def get_task_list(the_user_id):

    tasks = Task.query.filter_by(user_id = the_user_id)
    if tasks is None:
        return "No tasks from user: " + str(the_user_id), 400
    
    
    task_list = list(map(lambda x: x.serialize(), tasks))

    return jsonify(task_list), 200

@api.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):

    new_updated_task = request.get_json()
    old_task_obj = Task.query.get(task_id)

    if old_task_obj is None:
        return "No task with id: " + str(task_id), 400

    if 'label' in new_updated_task:
        old_task_obj.label = new_updated_task['label']
    
    if 'task_difficulty_id' in new_updated_task:
        old_task_obj.task_difficulty_id = new_updated_task['task_difficulty_id']
    
    if 'done' in new_updated_task:
        old_task_obj.done = new_updated_task['done']

    if 'done' in new_updated_task:
        old_task_obj.done = new_updated_task['done']

    if 'onboard' in new_updated_task:
        old_task_obj.onboard = new_updated_task['onboard']


    db.session.commit()

    return jsonify({"msg": "task is Updated"}), 200

###################################################################################  REWARD ROUTES

@api.route("/rewards",  methods=['GET'])
def get_rewards():
    rewards= Reward.query.all()
    all_rewards= list(map(lambda x: x.serialize(), rewards))
    return jsonify(all_rewards), 200


@api.route("/rewards",  methods=['POST'])
def create_reward():
    new_reward = request.get_json()

    if 'label' not in new_reward:
        return "label should be in New task Body", 400
    if 'user_id' not in new_reward:
        return "user_id should be in New task Body", 400
    if 'rarity_id' not in new_reward:
        return "rarity_id should be in New task Body", 400
    
  
    new_reward = Reward(
        label = new_reward['label'],
        user_id = new_reward['user_id'],
        rarity_id = new_reward['rarity_id'],
        done = False
        )

    db.session.add(new_reward)
    db.session.commit()

    return jsonify({"msg": "New reward is Created"}), 201

@api.route('/rewards/<int:the_user_id>', methods=['GET'])
def get_reward_list(the_user_id):

    reward = Reward.query.filter_by(user_id = the_user_id)
    if reward is None:
        return "No rewards from user: " + str(the_user_id), 400
    
    reward_list = list(map(lambda x: x.serialize(), reward))

    return jsonify(reward_list), 200

@api.route('/rewards/<int:reward_id>', methods=['PUT'])
def update_reward(reward_id):

    new_updated_reward = request.get_json()
    old_reward_obj = Reward.query.get(reward_id)

    if old_reward_obj is None:
        return "No reward with id: " + str(reward_id), 400

    if 'label' in new_updated_reward:
        old_reward_obj.label = new_updated_reward['label']
    
    if 'rarity_id' in new_updated_reward:
        old_reward_obj.rarity_id = new_updated_reward['rarity_id']

    if 'done' in new_updated_reward:
        old_reward_obj.done = new_updated_reward['done']


    db.session.commit()

    return jsonify({"msg": "reward is Updated"}), 200

###################################################################################  MONSTER ROUTES

@api.route("/bestiary",  methods=['GET'])
def get_monsters():
    bestiary= Bestiary.query.all()
    all_monsters= list(map(lambda x: x.serialize(), bestiary))
    return jsonify(all_monsters), 200

@api.route("/bestiary",  methods=['POST'])
def new_monster_aquired():
    new_monster = request.get_json()

    if 'monster_name' not in new_monster:
        return "monster_name should be in New monster Body", 400
    if 'user_id' not in new_monster:
        return "user_id should be in New monster Body", 400
   
    new_monster = Bestiary(
        monster_name = new_monster['monster_name'],
        user_id = new_monster['user_id'],
         
        )

    db.session.add(new_monster)
    db.session.commit()

    return jsonify({"msg": "New entry to the bestiary is Created"}), 201

@api.route('/bestiary/<int:the_user_id>', methods=['GET'])
def get_monster_list(the_user_id):

    monster = Bestiary.query.filter_by(user_id = the_user_id)
    if monster is None:
        return "No monster from user: " + str(the_user_id), 400
    
    monster_list = list(map(lambda x: x.serialize(), monster))

    return jsonify(monster_list), 200