
import click
from api.models import db, User, Role, Difficulty, Rarity

"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        pass

    @app.cli.command("insert-roles")
    def insert_roles():
        print("Creating db roles")
        B = Role()
        B.name = "barbarian"
        B.description = "Battle Rage is blind and merciless but extreamely powerful. This means a greater chance at defeating your enemies and achieve victory."
        B.passive = "b"
        B.hability_1 = "Fang Slash"
        B.hability_2 = "Jaw Breaker"
        B.hability_3 = "Frenzy Strikes"
        
        db.session.add(B)
        db.session.commit()
        print("Barbarian created.")

        W = Role()
        W.name = "Wizard"
        W.description = "Being a master at conjuring comes with it's own perks. Your Arcana abilities provide you a second shot at succeeding in a encounter."
        W.passive = "W"
        W.hability_1 = "Confusion Enchantment"
        W.hability_2 = "Lightning Blast"
        W.hability_3 = "Fireball Vortex"
        
        db.session.add(W)
        db.session.commit()
        print("Wizard created.")

        R = Role()
        R.name = "Rogue"
        R.description = "Sneaky little bastard ain't we. How come you never get caught stealling extra experience from the master vault?"
        R.passive = "R"
        R.hability_1 = "Tear Smoke Bomb"
        R.hability_2 = "Swift and Easy"
        R.hability_3 = "Table Heist"
        
        db.session.add(R)
        db.session.commit()
        print("Rogue created.")
        

        print("All roles created")