from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Role(db.Model):
    __tablename__ = "role"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.String(1000))
    passive = db.Column(db.String(120), unique=True, nullable=False)
    
    def __repr__(self):
        return f'<Role {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "passive": self.passive,         
        }


class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(80), unique=False, nullable=False)
    user_role= db.Column(db.Integer, db.ForeignKey('role.id'))
    role = db.relationship(Role)
    level = db.Column(db.Integer)
    experience = db.Column(db.Integer)
    energy = db.Column(db.Integer)


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "user_role": self.user_role,
            "level": self.level,
            "experience": self.experience,
            "energy": self.energy
            # do not serialize the password, its a security breach
        }


class Difficulty(db.Model):
    __tablename__ = "difficulty"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    experience_given = db.Column(db.Integer, unique=True, nullable=False) 
    energy_given = db.Column(db.Integer, unique=True, nullable=False) 
    

    def __repr__(self):
        return f'<Difficulty {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "experience_given": self.experience_given,
            "energy_given": self.energy_given           
        }
    

class Task(db.Model):
    __tablename__ = "task"
    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(120), nullable=False)
    done = db.Column(db.Boolean(), unique=False, nullable=False)
    onboard = db.Column(db.Boolean(), unique=False, nullable=False)
    task_difficulty_id = db.Column(db.Integer, db.ForeignKey('difficulty.id'))
    task_difficulty = db.relationship(Difficulty)
    user_id=db.Column(db.Integer, db.ForeignKey('user.id'))
    user=db.relationship(User)

    def __repr__(self):
        return f'<Task {self.label}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "label": self.label,
            "done": self.done,
            "onboard": self.onboard,
            "user_id": self.user_id,
            "task_difficulty_id": self.task_difficulty_id
           
        }
    

class Rarity(db.Model):
    __tablename__ = "rarity"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    energy_required = db.Column(db.Integer, unique=True, nullable=False) 
    

    def __repr__(self):
        return f'<Rarity {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "energy_required": self.energy_required            
        }


class Reward(db.Model):
    __tablename__ = "reward"
    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(120),nullable=False)
    done = db.Column(db.Boolean(), unique=False, nullable=False)
    user_id=db.Column(db.Integer, db.ForeignKey('user.id'))
    user=db.relationship(User)
    rarity_id=db.Column(db.Integer, db.ForeignKey('rarity.id')) 
    rarity=db.relationship(Rarity)

    def __repr__(self):
        return f'<Reward {self.label}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "label": self.label,
            "done": self.done,
            "user_id": self.user_id,
            "rarity_id": self.rarity_id            
        }


class Ability(db.Model):
    __tablename__ = "hability"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    energy = db.Column(db.Integer, db.ForeignKey('rarity.id'))
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))
    rarity = db.relationship(Rarity)
    role = db.relationship(Role)
    
    def __repr__(self):
        return f'<Hability {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "effect": self.effect,  
            "role": self.role_id,        
        }

    
class Bestiary(db.Model):
    __tablename__ = "bestiary"
    id = db.Column(db.Integer, primary_key=True)
    monster_name = db.Column(db.String(120), unique=False, nullable=False)
    user_id=db.Column(db.Integer, db.ForeignKey('user.id'))
    user=db.relationship(User)
  
    
    def __repr__(self):
        return f'<Monster {self.monster_name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "monster_name": self.monster_name,
            "user_id": self.user_id,
        }