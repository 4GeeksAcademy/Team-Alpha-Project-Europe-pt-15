
import click
from api.models import db, User, Role, Difficulty, Task, Rarity, Reward, Ability, Combat_text

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
        B.description = "Battle Rage is merciless and extremely powerful. This means a greater chance at defeating your enemies and achieve victory."
        B.passive = 0
        db.session.add(B)
        db.session.commit()
        print("Barbarian created.")

        W = Role()
        W.name = "Wizard"
        W.description = "Being a master at conjuring comes with it's own perks. Your Arcana abilities enable you to summon a second encounter."
        W.passive = 1
        db.session.add(W)
        db.session.commit()
        print("Wizard created.")

        R = Role()
        R.name = "Rogue"
        R.description = "Sneaky little bastard ain't we? How come you never get caught stealling extra experience from the master vault?"
        R.passive = 0.2
        db.session.add(R)
        db.session.commit()
        print("Rogue created.")
        print("All roles created")


        ##  TASK DIFFICULTY  ##
        print("Creating db task difficulty")
        Easy = Difficulty()
        Easy.name = "Easy"
        Easy.experience_given = 7
        Easy.energy_given = 4
        db.session.add(Easy)
        db.session.commit()
        print("Easy created.")

        Medium = Difficulty()
        Medium.name = "Medium"
        Medium.experience_given = 13
        Medium.energy_given = 9
        db.session.add(Medium)
        db.session.commit()
        print("Medium created.")

        Hard = Difficulty()
        Hard.name = "Hard"
        Hard.experience_given = 20
        Hard.energy_given = 15
        db.session.add(Hard)
        db.session.commit()
        print("Hard created.")        
        print("All tasks difficulties created")


        ##  REWARD RARITY  ##
        print("Creating db reward rarities")
        Common = Rarity()
        Common.name = "Common"
        Common.energy_required = 20
        db.session.add(Common)
        db.session.commit()
        print("Common created.")

        Rare = Rarity()
        Rare.name = "Rare"
        Rare.energy_required = 65
        db.session.add(Rare)
        db.session.commit()
        print("Rare created.")

        Legendary = Rarity()
        Legendary.name = "Legendary"
        Legendary.energy_required = 90  
        db.session.add(Legendary)
        db.session.commit()
        print("Legendary created.")        
        print("All reward rarities created")
        

        ##  ROLES ABILITIES  ##
        print("Creating db role abilities")
        BH1 = Ability()
        BH1.name = "Power Throw"
        BH1.role_id = 1   
        BH1.rarity_id = 1 
        db.session.add(BH1)
        db.session.commit()

        BH2 = Ability()
        BH2.name = "Skull Breaker"
        BH2.role_id = 1    
        BH2.rarity_id = 2
        db.session.add(BH2)
        db.session.commit()

        BH3 = Ability()
        BH3.name = "Battle Rage"
        BH3.role_id = 1    
        BH3.rarity_id = 3
        db.session.add(BH3)
        db.session.commit()
        print("Barbarian abilities created.")

        WH1 = Ability()
        WH1.name = "Fire Breath"
        WH1.role_id = 2   
        WH1.rarity_id = 1 
        db.session.add(WH1)
        db.session.commit()

        WH2 = Ability()
        WH2.name = "Wind Vortex"
        WH2.role_id = 2    
        WH2.rarity_id = 2
        db.session.add(WH2)
        db.session.commit()

        WH3 = Ability()
        WH3.name = "Lightning Blast"
        WH3.role_id = 2    
        WH3.rarity_id = 3
        db.session.add(WH3)
        db.session.commit()
        print("Wizard abilities created.")

        RH1 = Ability()
        RH1.name = "Distraction Crackers"
        RH1.role_id = 3   
        RH1.rarity_id = 1 
        db.session.add(RH1)
        db.session.commit()

        RH2 = Ability()
        RH2.name = "Swift and Easy"
        RH2.role_id = 3    
        RH2.rarity_id = 2
        db.session.add(RH2)
        db.session.commit()

        RH3 = Ability()
        RH3.name = "Table Heist"
        RH3.role_id = 3    
        RH3.rarity_id = 3
        db.session.add(RH3)
        db.session.commit()
        print("Rogue abilities created.")
        print("All abilities created.")


        ##  TEST USER  ##
        print("Creating test user")
        user = User()
        user.name = "user"
        user.email = "user@test"
        user.password = "user"
        user.user_role = 2
        user.level = 1
        user.experience = 78
        user.energy = 23
        user.encounter = 0
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
        task1.done = False    
        task1.onboard = True 
        db.session.add(task1)
        db.session.commit()

        task2 = Task()
        task2.label = "call mom"
        task2.user_id = 1
        task2.task_difficulty_id = 1  
        task2.done = False    
        task2.onboard = True  
        db.session.add(task2)
        db.session.commit()

        task3 = Task()
        task3.label = "return book to library"
        task3.user_id = 1
        task3.task_difficulty_id = 2  
        task3.done = False       
        task3.onboard = True 
        db.session.add(task3)
        db.session.commit()

        task4 = Task()
        task4.label = "break up with Linda, it's not her it's me..."
        task4.user_id = 1
        task4.task_difficulty_id = 3
        task4.done = False 
        task4.onboard = True 
        db.session.add(task4)
        db.session.commit()
        print("4 tasks created.")


        ##  REWARDS  ##
        print("Creating db dummy rewards")
        reward1 = Reward()
        reward1.label = "new limited edition oreo icecream"
        reward1.user_id = 1
        reward1.rarity_id = 1 
        reward1.done = False         
        db.session.add(reward1)
        db.session.commit()

        reward2 = Reward()
        reward2.label = "camping trip"
        reward2.user_id = 1
        reward2.rarity_id = 3  
        reward2.done = False       
        db.session.add(reward2)
        db.session.commit()

        reward3 = Reward()
        reward3.label = "taco tuesday"
        reward3.user_id = 1
        reward3.rarity_id = 2    
        reward3.done = False     
        db.session.add(reward3)
        db.session.commit()

        reward4 = Reward()
        reward4.label = "realize I'm worthy of love too and win Linda back!!!"
        reward4.user_id = 1
        reward4.rarity_id = 3
        reward4.done = False 
        db.session.add(reward4)
        db.session.commit()
        print("4 rewards created.")


        ##  COMBAT TEXT  ##
        print("creating the text for the encounters")
        text1 = Combat_text()
        text1.text = "As you venture deeper into the labyrinthine caves beneath the ancient ruins, an unsettling feeling creeps over you. The air grows colder, and an otherworldly whisper echoes through the tunnels. Suddenly, from the shadows, a creature emerges"
        text1.creature_or_role_type = "aberration"
        db.session.add(text1)
        db.session.commit()

        text2 = Combat_text()
        text2.text = "As you traverse through the dense forest, the sounds of nature create a symphony around you. However, the tranquility is abruptly shattered by a deep, resonant roar that shakes the very ground beneath your feet."
        text2.creature_or_role_type = "beast"
        db.session.add(text2)
        db.session.commit()

        text3 = Combat_text()
        text3.text = "Deep within an ancient, sacred grove, you have come to retrieve a powerful artifact said to be guarded by a celestial being. As you approach the heart of the grove, a blinding light manifests before you"
        text3.creature_or_role_type = "celestial"
        db.session.add(text3)
        db.session.commit()

        text4 = Combat_text()
        text4.text = "In the depths of a long-abandoned dwarven forge, you seek a legendary weapon said to be hidden within. As you navigate the darkened halls, you come upon a massive chamber filled with the remnants of ancient machinery. In the center stands a huge construct, its eyes glowing with an eerie red light."
        text4.creature_or_role_type = "construct"
        db.session.add(text4)
        db.session.commit()

        text5 = Combat_text()
        text5.text = "High atop a craggy mountain peak, surrounded by billowing clouds of smoke and the faint scent of sulfur, you find the lair of an Ancient Dragon. As you approach, the ground trembles beneath your feet, and the air grows thick with heat. With a deafening roar, the dragon emerges from its cavernous lair."
        text5.creature_or_role_type = "dragon"
        db.session.add(text5)
        db.session.commit()

        text6 = Combat_text()
        text6.text="In the heart of an ancient, overgrown forest lies a hidden glade, untouched by time. Within this sacred grove, the elements themselves stir with ancient power, and a towering figure emerges from the center."
        text6.creature_or_role_type = "elemental"
        db.session.add(text6)
        db.session.commit()

        text7 = Combat_text()
        text7.text = "As you wander through the ancient forest, you stumble upon a clearing bathed in soft, ethereal light. The air is filled with the sweet scent of wildflowers, and the sound of a gentle melody drifts through the air. Before you stands a beautiful glade, seemingly untouched by time, inhabited by a variety of fey creatures. They dance and frolic amidst the flowers and trees, their laughter echoing through the tranquil grove. But as you approach, their playful demeanor shifts, and they regard you with curious, mischievous eyes."
        text7.creature_or_role_type = "fey"
        db.session.add(text7)
        db.session.commit()

        text8 = Combat_text()
        text8.text = "In the depths of a forsaken cavern, where the air is thick with the stench of sulfur and the ground is scorched by hellfire, lies the entrance to the Infernal Abyss. As you descend into the darkness, the temperature rises, and the sound of tortured souls echoes off the cavern walls. At the heart of this infernal realm, surrounded by pools of bubbling lava and towering obsidian spires, awaits a powerful fiend"
        text8.creature_or_role_type = "fiend"
        db.session.add(text8)
        db.session.commit()

        text9 = Combat_text()
        text9.text = "As you traverse the frozen tundra, you stumble upon a vast, icy plain stretching out before you. Towering above the landscape stands a colossal figure a Giant, clad in furs and wielding a massive axe carved from ice. Its breath steams in the frigid air, and its eyes gleam with primal fury as it spots you intruding upon its domain. With a roar that shakes the very ground, it charges forward, eager to defend its territory against all who dare to challenge it."
        text9.creature_or_role_type = "giant"
        db.session.add(text9)
        db.session.commit()

        text10 = Combat_text()
        text10.text = "As you journey along a narrow forest path, the tranquility of the woods is shattered by the sound of rustling leaves and the clinking of armor. Suddenly, a group of humanoid creatures emerges from the undergrowth, their faces obscured by masks and their weapons gleaming in the dappled sunlight. they surround you, their intent clear, robbery, or worse."
        text10.creature_or_role_type = "humanoid"
        db.session.add(text10)
        db.session.commit()

        text11 = Combat_text()
        text11.text = "As you venture deeper into the untamed wilderness, the air grows thick with the stench of smoke and sulfur. Suddenly, a deafening roar shatters the stillness, echoing through the trees and sending birds fleeing from their perches. Emerging from the shadows comes a fearsome sight a, Monstrosity. With eyes blazing with fury, it charges towards you, hungry for blood and destruction."
        text11.creature_or_role_type = "monstrosity"
        db.session.add(text11)
        db.session.commit()

        text12 = Combat_text()
        text12.text = "As you delve deeper into the damp, dark caverns of the underground, you come across a chamber filled with strange, glistening pools of slime. Suddenly, the ground begins to tremble, and the pools coalesce into a massive, amorphous form—a Gelatinous Cube, hungry for prey. With no discernible features except its translucent body and acidic interior, it oozes forward, ready to engulf anything in its path."
        text12.creature_or_role_type = "ooze"
        db.session.add(text12)
        db.session.commit()

        text13 = Combat_text()
        text13.text = "As you navigate through the dense, humid swamp, the air grows thick with the scent of decay and vegetation. Suddenly, the ground beneath you quivers, and from the surrounding foliage, a massive, hulking form emerges"
        text13.creature_or_role_type = "plant"
        db.session.add(text13)
        db.session.commit()

        text14 = Combat_text()
        text14.text = "As you explore the ancient, crumbling crypt beneath the old church, the air grows cold and the flickering torchlight casts eerie shadows on the walls. Suddenly, a chill runs down your spine as the crypt door slams shut behind you. From the darkness, you hear the sound of scraping bones and the low moans of the undead."
        text14.creature_or_role_type = "undead"
        db.session.add(text14)
        db.session.commit()

        text15 = Combat_text()
        text15.text = "You stand alone in a clearing, muscles rippling with raw power and eyes blazing with fury. Before him stands a merciless challenger intent on testing the your mettle. The sun is setting, casting long shadows over the battlefield. The air is thick with tension as your oponent charges forward. You ready yourself for the duel, prepared to defend with sheer might and primal instinct."
        text15.creature_or_role_type = "Barbarian"
        db.session.add(text15)
        db.session.commit()

        text16 = Combat_text()
        text16.text = "You stand alone in a moonlit clearing, arcane symbols glowing faintly on the ground beneath your feet. Across from them, a sinister figures with eyes gleaming with dark power steps forward. The air crackles with magical energy as the figure launches an attack, and you prepare to defend yourself with a combination of wit, spells, and strategic thinking."
        text16.creature_or_role_type = "Wizard"
        db.session.add(text16)
        db.session.commit()

        text17 = Combat_text()
        text17.text = "You find yourself in a dimly lit alleyway, shadows dancing along the walls as a group of enemies block your path. They are clearly underestimating the your prowess. With a smirk and a glint of determination in your eyes, you prepare to strike from the shadows, using your agility, stealth, and precision to turn the tide in your favor."
        text17.creature_or_role_type = "Rougue"
        db.session.add(text17)
        db.session.commit()
        print("combat text for all 14 types and the 3 roles created")