"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Role, Difficulty, Task, Rarity, Reward, Bestiary, Hability
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


##  USER ROUTES  ##

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
        level= 1
        
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

    one_user = user.serialize()
    one_user.update({"role": role.name})

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

    db.session.commit()

    return jsonify({"msg": "User is Updated"}), 200


##  ROLES ROUTES  ##

@api.route("/roles", methods=['GET'])
def get_roles_list():
    roles= Role.query.all()
    all_roles= list(map(lambda x: x.serialize(), roles))
    return jsonify(all_roles), 200

@api.route('/roles/<int:user_id>/<int:role_id>', methods=['PUT'])
def insert_user_role(user_id, role_id):
    
    user = User.query.get(user_id)

    if user is None:
        return "No User with id: " + str(user_id), 400

    user.user_role = role_id

    db.session.commit()

    return jsonify({"msg": "Role added to user"}), 200

## i don't think we need this
@api.route("/roles",  methods=['POST'])
def create_roles():
    new_role = request.get_json()

    if 'name' not in new_role:
        return "Name should be in New class Body", 400
    if 'description' not in new_role:
        return "description should be in New class Body", 400
    if 'passive' not in new_role:
        return "passive should be in New class Body", 400
    if 'hability_1' not in new_role:
        return "hability_1 should be in New class Body", 400
    if 'hability_2' not in new_role:
        return "habiliy_2 should be in New class Body", 400
    if 'hability_3' not in new_role:
        return "habiliy_3 should be in New class Body", 400
  

    new_role = Role(
        name = new_role['name'],
        description = new_role['description'],
        passive = new_role['passive'],
        hability_1 = new_role['hability_1'],
        hability_2 = new_role["hability_2"],
        hability_3= new_role["hability_3"] 
        
        )

    db.session.add(new_role)
    db.session.commit()

    return jsonify({"msg": "New role is Created"}), 201

@api.route('/role/<int:role_id>', methods=['GET'])
def get_role(role_id):

    role = Role.query.get(role_id)
    if role is None:
        return "No role with id: " + str(role_id), 400
    
    one_role = role.serialize()

    return jsonify(one_role), 200

# roles table is not meant to be edited 
@api.route('/role/<int:role_id>', methods=['PUT'])
def update_role(role_id):

    new_updated_role = request.get_json()
    old_role_obj = Role.query.get(role_id)

    if old_role_obj is None:
        return "No role with id: " + str(role_id), 400

    if 'name' in new_updated_role:
        old_role_obj.name = new_updated_role['name']

    if 'description' in new_updated_role:
        old_role_obj.description = new_updated_role['description']

    if 'passive' in new_updated_role:
        old_role_obj.passive = new_updated_role['passive']

    if 'hability_1' in new_updated_role:
        old_role_obj.hability_1 = new_updated_role['hability_1']

    if 'hability_2' in new_updated_role:
        old_role_obj.hability_2 = new_updated_role['hability_2']

    if 'hability_3' in new_updated_role:
        old_role_obj.hability_3 = new_updated_role['hability_3']


    db.session.commit()

    return jsonify({"msg": "role is Updated"}), 200


##  TASK DIFFICULTY ROUTES  ##

@api.route("/difficulty",  methods=['GET'])
def get_difficulties():
    difficulties= Difficulty.query.all()
    all_difficulties= list(map(lambda x: x.serialize(), difficulties))
    return jsonify(all_difficulties), 200

# i don't think we need this
@api.route("/difficulty",  methods=['POST'])
def create_difficulty():
    new_difficulty = request.get_json()

    if 'difficulty_name' not in new_difficulty:
        return "difficulty_name should be in New difficulty Body", 400
    if 'experience_given' not in new_difficulty:
        return "experience_given should be in New difficulty Body", 400
    if 'energy_given' not in new_difficulty:
        return "energy_given should be in New difficulty Body", 400
    
  

    new_difficulty = Difficulty(
        difficulty_name = new_difficulty['difficulty_name'],
        experience_given = new_difficulty['experience_given'],
        energy_given = new_difficulty['energy_given']
        
        )

    db.session.add(new_difficulty)
    db.session.commit()

    return jsonify({"msg": "New Difficulty is Created"}), 201

@api.route('/difficulty/<int:difficulty_id>', methods=['GET'])
def get_single_difficulty(difficulty_id):

    difficulty = Difficulty.query.get(difficulty_id)
    if difficulty is None:
        return "No difficulty with id: " + str(difficulty_id), 400
    
    one_difficulty = difficulty.serialize()

    return jsonify(one_difficulty), 200

# i don't think we need this
@api.route('/difficulty/<int:difficulty_id>', methods=['PUT'])
def update_difficulty(difficulty_id):

    new_updated_difficulty = request.get_json()
    old_difficulty_obj = Difficulty.query.get(difficulty_id)

    if old_difficulty_obj is None:
        return "No difficulty with id: " + str(difficulty_id), 400

    if 'difficulty_name' in new_updated_difficulty:
        old_difficulty_obj.difficulty_name = new_updated_difficulty['difficulty_name']

    if 'experience_given' in new_updated_difficulty:
        old_difficulty_obj.experience_given = new_updated_difficulty['experience_given']

    if 'energy_given' in new_updated_difficulty:
        old_difficulty_obj.energy_given = new_updated_difficulty['energy_given']

    db.session.commit()

    return jsonify({"msg": "difficulty is Updated"}), 200


##  TASKS ROUTES  ##

@api.route("/task",  methods=['GET'])
def get_tasks():
    tasks= Task.query.all()
    all_tasks= list(map(lambda x: x.serialize(), tasks))
    return jsonify(all_tasks), 200

@api.route("/task",  methods=['POST'])
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
        task_difficulty_id = new_task['task_difficulty_id']
        
        )

    db.session.add(new_task)
    db.session.commit()

    return jsonify({"msg": "New Task is Created"}), 201


@api.route('/task/<int:the_user_id>', methods=['GET'])
def get_task_list(the_user_id):

    tasks = Task.query.filter_by(user_id = the_user_id)
    if tasks is None:
        return "No tasks from user: " + str(the_user_id), 400
    
    
    task_list = list(map(lambda x: x.serialize(), tasks))

    return jsonify(task_list), 200

@api.route('/task/<int:task_id>', methods=['PUT'])
def update_task(task_id):

    new_updated_task = request.get_json()
    old_task_obj = Task.query.get(task_id)

    if old_task_obj is None:
        return "No difficulty with id: " + str(task_id), 400

    if 'label' in new_updated_task:
        old_task_obj.label = new_updated_task['label']
    
    if 'task_difficulty_id' in new_updated_task:
        old_task_obj.task_difficulty_id = new_updated_task['task_difficulty_id']


    db.session.commit()

    return jsonify({"msg": "task is Updated"}), 200

@api.route('/task/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):

    deleting_task = Task.query.get(task_id)

    if deleting_task is None:
        return "No task with id: " + str(task_id), 400

    db.session.delete(deleting_task)
    db.session.commit()

    return jsonify({"msg": "task is Deleted"}), 200


##  REWARD RARITY ROUTES  ##

@api.route("/rarity",  methods=['GET'])
def get_rarities():
    rarity= Rarity.query.all()
    all_rarities= list(map(lambda x: x.serialize(), rarity))
    return jsonify(all_rarities), 200

# i don't think we need this
@api.route("/rarity",  methods=['POST'])
def create_rarity():
    new_rarity = request.get_json()

    if 'rarity_name' not in new_rarity:
        return "rarity_name should be in New rarity Body", 400
    if 'energy_required' not in new_rarity:
        return "energy_required should be in New rarity Body", 400
   

    new_rarity = Rarity(
        rarity_name = new_rarity['rarity_name'],
        energy_required = new_rarity['energy_required'],
        
        )

    db.session.add(new_rarity)
    db.session.commit()

    return jsonify({"msg": "New Rarity is Created"}), 201

@api.route('/rarity/<int:rarity_id>', methods=['GET'])
def get_single_rarity(rarity_id):

    rarity = Rarity.query.get(rarity_id)
    if rarity is None:
        return "No rarity with id: " + str(rarity_id), 400
    
    single_rarity = rarity.serialize()

    return jsonify(single_rarity), 200

# i don't think we need this
@api.route('/rarity/<int:rarity_id>', methods=['PUT'])
def update_rarity(rarity_id):

    new_updated_rarity = request.get_json()
    old_rarity_obj = Rarity.query.get(rarity_id)

    if old_rarity_obj is None:
        return "No difficulty with id: " + str(rarity_id), 400

    if 'rarity_name' in new_updated_rarity:
        old_rarity_obj.rarity_name = new_updated_rarity['rarity_name']

    if 'energy_required' in new_updated_rarity:
        old_rarity_obj.energy_required = new_updated_rarity['energy_required']
    

    db.session.commit()

    return jsonify({"msg": "rarity is Updated"}), 200


##  REWARD ROUTES  ##

# i don't think we need this
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
        rarity_id = new_reward['rarity_id']
        
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

    if 'user_id' in new_updated_reward:
        old_reward_obj.user_id = new_updated_reward['user_id']
    
    if 'rarity_id' in new_updated_reward:
        old_reward_obj.rarity_id = new_updated_reward['rarity_id']


    db.session.commit()

    return jsonify({"msg": "reward is Updated"}), 200

@api.route('/rewards/<int:reward_id>', methods=['DELETE'])
def delete_reward(reward_id):

    deleting_reward= Reward.query.get(reward_id)

    if deleting_reward is None:
        return "No reward with id: " + str(reward_id), 400

    db.session.delete(deleting_reward)
    db.session.commit()

    return jsonify({"msg": "reward is Deleted"}), 200


##  MONSTERS ROUTES  ##

# i don't think we need this
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