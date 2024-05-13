from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Clas(db.Model):
    __tablename__ = "clas"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    passive = db.Column(db.String(120), unique=True, nullable=False)
    hablity_1 = db.Column(db.String(120), unique=True, nullable=False)
    hability_2 = db.Column(db.String(120), unique=True, nullable=False)
    hability_3 = db.Column(db.String(120), unique=True, nullable=False)
    
    def __repr__(self):
        return f'<Class {self.name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "passive": self.passive,
            "hability_1": self.hablity_1,
            "hability_2": self.hability_2,
            "hability_3": self.hability_3,

           
        }




class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(80), unique=False, nullable=False)
    user_class=db.Column(db.Integer, db.ForeignKey('clas.id'))
    clas = db.relationship(Clas)
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
            "user_class": self.user_class,
            "level": self.level,
            "experience": self.experience,
            "energy": self.energy
            # do not serialize the password, its a security breach
        }

class Difficulty(db.Model):
    __tablename__ = "difficulty"
    id = db.Column(db.Integer, primary_key=True)
    difficulty_name = db.Column(db.String(120), unique=True, nullable=False)
    experience_given = db.Column(db.Integer, unique=True, nullable=False) 
    energy_given = db.Column(db.Integer, unique=True, nullable=False) 
    

    def __repr__(self):
        return f'<Difficulty {self.difficulty_name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.difficulty_name,
            "experience": self.experience_given,
            "energy": self.energy_given
           
        }
    


class Task(db.Model):
    __tablename__ = "task"
    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(120), unique=True, nullable=False)
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
            "userId": self.user_id,
            "difficulty": self.task_difficulty_id
           
        }
    

class Rarity(db.Model):
    __tablename__ = "rarity"
    id = db.Column(db.Integer, primary_key=True)
    rarity_name = db.Column(db.String(120), unique=True, nullable=False)
    energy_required = db.Column(db.Integer, unique=True, nullable=False) 
    

    def __repr__(self):
        return f'<Rarity {self.rarity_name}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.rarity_name,
            "requirement": self.energy_required
            
        }


class Reward(db.Model):
    __tablename__ = "reward"
    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(120), unique=True, nullable=False)
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
            "user_id": self.user_id,
            "rarity_id": self.rarity_id

            
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