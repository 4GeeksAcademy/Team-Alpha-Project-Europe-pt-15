
import click
from api.models import db, User, Role, Difficulty, Task, Rarity, Reward

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
        ##  ROLES  ##
        print("Creating db roles")
        B = Role()
        B.name = "Barbarian"
        B.description = "Battle Rage is blind and merciless but extreamely powerful. This means a greater chance at defeating your enemies and achieve victory."
        B.passive = "B"
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


        ##  TASK DIFFICULTY  ##
        print("Creating db task difficulty")
        Easy = Difficulty()
        Easy.difficulty_name = "Easy"
        Easy.experience_given = 7
        Easy.energy_given = 1        
        db.session.add(Easy)
        db.session.commit()
        print("Easy created.")

        Medium = Difficulty()
        Medium.difficulty_name = "Medium"
        Medium.experience_given = 13
        Medium.energy_given = 2        
        db.session.add(Medium)
        db.session.commit()
        print("Medium created.")

        Hard = Difficulty()
        Hard.difficulty_name = "Hard"
        Hard.experience_given = 20
        Hard.energy_given = 4        
        db.session.add(Hard)
        db.session.commit()
        print("Hard created.")        
        print("All tasks difficulties created")


        ##  REWARD RARITY  ##
        print("Creating db reward rarities")
        Common = Rarity()
        Common.rarity_name = "Common"
        Common.energy_required = 10        
        db.session.add(Common)
        db.session.commit()
        print("Common created.")

        Rare = Rarity()
        Rare.rarity_name = "Rare"
        Rare.energy_required = 20        
        db.session.add(Rare)
        db.session.commit()
        print("Rare created.")

        Legendary = Rarity()
        Legendary.rarity_name = "Legendary"
        Legendary.energy_required = 40        
        db.session.add(Legendary)
        db.session.commit()
        print("Legendary created.")        
        print("All reward rarities created")


        ##  TEST USER  ##
        print("Creating test user")
        user = User()
        user.name = "user"
        user.email = "user@test"
        user.password = "user"
        user.user_role = 2
        user.level = 1
        user.experience = 0
        user.energy = 0
        db.session.add(user)
        db.session.commit()
        print("Test user created.")
        print("email: user@test   password: user")


        ##  TASKS  ##
        print("Creating db dummy tasks")
        task1 = Task()
        task1.label = "fill in taxes form"
        task1.user_id = 1
        task1.task_difficulty_id = 3      
        db.session.add(task1)
        db.session.commit()

        task2 = Task()
        task2.label = "call mom"
        task2.user_id = 1
        task2.task_difficulty_id = 1      
        db.session.add(task2)
        db.session.commit()

        task3 = Task()
        task3.label = "take out the trash"
        task3.user_id = 1
        task3.task_difficulty_id = 2        
        db.session.add(task3)
        db.session.commit()

        task4 = Task()
        task4.label = "return book to library"
        task4.user_id = 1
        task4.task_difficulty_id = 1
        db.session.add(task4)
        db.session.commit()

        task5 = Task()
        task5.label = "break up with Linda, it's not her it's me..."
        task5.user_id = 1
        task5.task_difficulty_id = 3
        db.session.add(task5)
        db.session.commit()
        print("5 tasks created.")


        ##  REWARDS  ##
        print("Creating db dummy rewards")
        reward1 = Reward()
        reward1.label = "oreo icecream"
        reward1.user_id = 1
        reward1.rarity_id = 1        
        db.session.add(reward1)
        db.session.commit()

        reward2 = Reward()
        reward2.label = "camping trip"
        reward2.user_id = 1
        reward2.rarity_id = 3        
        db.session.add(reward2)
        db.session.commit()

        reward3 = Reward()
        reward3.label = "taco tuesday"
        reward3.user_id = 1
        reward3.rarity_id = 2        
        db.session.add(reward3)
        db.session.commit()

        reward4 = Reward()
        reward4.label = "movie night"
        reward4.user_id = 1
        reward4.rarity_id = 1
        db.session.add(reward4)
        db.session.commit()

        reward5 = Reward()
        reward5.label = "finnaly realize I deserve love too and win Linda back!!!"
        reward5.user_id = 1
        reward5.rarity_id = 3
        db.session.add(reward5)
        db.session.commit()
        print("5 rewards created.")