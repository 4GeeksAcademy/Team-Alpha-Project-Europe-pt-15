import React, { useContext, useEffect, useState} from "react";
import barbarian from "../../img/axe.png"
import wizard from "../../img/magic.png"
import rogue from "../../img/R1.png"


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: [],
			tasks: [],
			rewards: [],
     		bestiary: [],
 			roles: [],
			images: [barbarian, wizard, rogue],
			difficulties: [],
			rarities: [],
			message: null,
			allMonsters : null,
			encounterPool: [],
			creatureInfo:[],
			inputs: {},

		},
		actions: {
			// Use getActions to call a function within a fuction
			
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			////////////////////////////////////////////////////////////////////////////////////////// FORMS

			getInput: (event) => {
				const name = event.target.name;
				const value = event.target.value;
				setStore({...getStore,
						  inputs: {...getStore().inputs, [name]: value}})
			},

			resetInput: () => {
				setStore({...getStore,inputs: {}})
			},

			seePassword: () => {
				let passwordInput = document.getElementById("password");
				let confirmPasswordInput =document.getElementById("confirmPassword");
				if (passwordInput.type === "password"){passwordInput.type = "text",confirmPasswordInput.type = "text" }
				else {passwordInput.type = "password", confirmPasswordInput.type = "password"}
			},	
			
			////////////////////////////////////////////////////////////////////////////////////////// CONDITIONAL RENDERING

			getCardColor: (view, tier, done) => {

				let cardColor="";

				if (view === "rewards" || view === "tasks" && done === true) {
					switch(tier){
						case 1:
							cardColor = "bg-yellow"
							break;
						case 2:
							cardColor = "bg-green"
							break;
						case 3:
							cardColor = "bg-purple"
							break;
						default:
							cardColor = null
							break;
					}
				} else cardColor= null
		
				return cardColor
			},

			getCardIcon: (view, tier, done) => {

				let cardIcon="";

				if (view === "rewards" || view === "tasks" && done === false) {
					switch(tier){
						case 1:
							cardIcon = "far fa-star"
							break;
						case 2:
							cardIcon = "fas fa-star-half-alt"
							break;
						case 3:
							cardIcon = "fas fa-star"
							break;
						default:
							cardIcon = "fa-solid fa-question"
							break;
					}
				} else {
					cardIcon = "fa-solid fa-check"
				}
		
				return cardIcon
			},

			getDashboardModalAction: (view, modalId) => {

				if (view === "tasks" && typeof modalId === "number") getActions().updateTask(modalId)
				if (view === "tasks" && typeof modalId === "string") getActions().createTask()
				if (view === "rewards" && typeof modalId === "number") getActions().updateReward(modalId)
				if (view === "rewards" && typeof modalId === "string") getActions().createReward()					
			},

			////////////////////////////////////////////////////////////////////////////////////////// DB DATA 

			getRoles: async () => {
				fetch(process.env.BACKEND_URL + "api/roles", {
					method: 'GET',
					headers: { "Content-Type": "application/json" },
				}).then((response) => {
					if(response.ok) return response.json()
					throw Error(response.status)
				}).then((rolesData) => {
					setStore({...getStore, roles: rolesData})
				}).catch((err) => {
					console.log('Couldnt get classes from API', err)
				})
			},
			
			getDifficulties: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/difficulty")
					const data = await resp.json()
					setStore({...getStore, difficulties: data})
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading difficulty table", error)
				}
			},
			
			getRarities: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/rarity")
					const data = await resp.json()
					setStore({...getStore, rarities: data})
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading rarity table", error)
				}
			},

			////////////////////////////////////////////////////////////////////////////////////////// AUTHENTICATION

			Login: () => {

				const input = getStore().inputs

				fetch(process.env.BACKEND_URL + "api/login", {
					method: 'POST',
					body: JSON.stringify({
						'email': input.email,
						'password': input.password
					}),
					headers: { "Content-Type": "application/json" },
				}).then((response) => {
					getActions().resetInput();
					if(response.ok) return response.json();
					throw Error(response.status)
				}).then((loginData) => {
					localStorage.setItem('jwt-token', loginData.token)
					localStorage.setItem('user', loginData.user_id)
				}).catch((err) => {
					console.error('Something Wrong when calling API', err)
				})
			},

			Logout: () => {
				//localStorage.removeItem('jwt-token')
				//localStorage.removeItem('user_id')
			},
			
			////////////////////////////////////////////////////////////////////////////////////////// USER 

			getUserData: async () => {
				const store = getStore()
				//const user = localStorage.getItem('user_id')

				//just to test
				const user = 1

				fetch(process.env.BACKEND_URL + "api/user/" + user, {
					method: 'GET',
					headers: { "Content-Type": "application/json" },
				}).then((response) => {
					if(response.ok) return response.json()
						console.log(response.json);
					throw Error(response.status)
				}).then((userData) => {
					setStore({...getStore, user: userData})
					console.log(store.user)
				}).catch((err) => {
					console.log("Couldnt get user from API", err)
				});
			},
			singUp:()=>{

				const input = getStore().inputs
				
				
				const newUser ={
					"name": input.name,
					"email": input.email,
					"password": input.password
				}

				fetch(process.env.BACKEND_URL + "api/users", {
					method: "POST",
					body: JSON.stringify(newUser),
				   	headers: {"Content-Type": "application/json"}
				   }).then((response) => {
					if(response.ok) return response.json()
				   }).then(() => {
					   getActions().resetInput()
				   }).catch(error => {
					   console.log(error);
				   });

			},

			userRole: async (role) => {

				//const user = localStorage.getItem('user_id')

				//just to test
				const user = 2

				setStore({...getStore, inputs: {"role" : role}})
				getActions().updateUser()
			},

			deleteUser: async () => {

				//const user = localStorage.getItem('user_id')

				//just to test
				const user = 2

				setStore({...getStore, inputs: {"email" : "", "password": ""}})
				getActions().updateUser()
				getActions().Logout()
			},

			updateUser: async () => {

				//const user = localStorage.getItem('user_id')

				//just to test
				const user = 2

				const input = getStore().inputs

				const updatedUser = {
					"name": input.name,
					"email": input.email,
					"password": input.password,
					"user_role": input.role,
					"level": input.level,
					"experience": input.experience,
					"energy": input.energy,
				}
				
				fetch(process.env.BACKEND_URL + "api/user/" + user, {
					method: "PUT",
					body: JSON.stringify(updatedUser),
				   	headers: {"Content-Type": "application/json"}
				   }).then(response => {
					   if(response.ok) return response.json()
						throw Error(response.status)
				   }).then(() => {
					getActions().getUserData()
					getActions().resetInput() 
				   }).catch(error => {
					   console.log(error);
				   });
			},
						

			////////////////////////////////////////////////////////////////////////////////////////// TASKS 

			getTaskList: async () => {

				//const user = localStorage.getItem('user_id')

				//just to test
				const user = 1

				fetch(process.env.BACKEND_URL + "api/tasks/" + user, {
					method: 'GET',
					headers: { "Content-Type": "application/json" },
				}).then((response) => {
					if(response.ok) return response.json()
						console.log(response.json);
					throw Error(response.status)
				}).then((tasksData) => {
					setStore({...getStore, tasks: tasksData})
				}).catch((err) => {
					console.log('Couldnt get classes from API', err)
				})
			},

			createTask: async () => {

				//const user = localStorage.getItem('user_id')

				//just to test
				const user = 1
				const input = getStore().inputs

				const task ={
					"label": input.label,
					"user_id": user,
					"task_difficulty_id": input.tier
				}

				fetch(process.env.BACKEND_URL + "api/tasks", {
					method: "POST",
					body: JSON.stringify(task),
				   	headers: {"Content-Type": "application/json"}
				   }).then((response) => {
					if(response.ok) return response.json()
				   }).then(() => {
					   getActions().getTaskList()
					   getActions().resetInput()
				   }).catch(error => {
					   console.log(error);
				   });
			},

			updateTask: async (taskId) => {

				const input = getStore().inputs

				const updatedTask ={
					"label": input.label,
					"task_difficulty_id": input.tier,
					"done": input.done,
					"onboard": input.onboard
				}
				
				fetch(process.env.BACKEND_URL + "api/tasks/" + taskId, {
					method: "PUT",
					body: JSON.stringify(updatedTask),
				   	headers: {"Content-Type": "application/json"}
				   }).then(response => {
					   if(response.ok) return response.json()
						throw Error(response.status)
				   }).then(() => {
					getActions().getTaskList()
					getActions().resetInput() 
				   }).catch(error => {
					   console.log(error);
				   });
			},

			doTask: async (tier, taskId) => {

				const currentLevel = getStore().user.level
				const currentExperience = getStore().user.experience
				const currentEnergy = getStore().user.energy

				const taskExperience = getStore().difficulties[tier - 1].experience_given
				const taskEnergy = getStore().difficulties[tier - 1].energy_given
				
				console.log("current levels:", currentExperience, currentEnergy);
				console.log("task levels:", taskExperience, taskEnergy);

				if(currentExperience + taskExperience < 100) {
					setStore({...getStore, inputs: {
						"experience" : currentExperience + taskExperience,
						"energy": currentEnergy + taskEnergy
					}})
				} else {
					setStore({...getStore, inputs: {
						"experience" : currentExperience + taskExperience - 100,
						"energy": currentEnergy + taskEnergy,
						"level" : currentLevel + 1,
					}})
				}

				console.log("update:", getStore().inputs);
				getActions().updateUser()
				
				setStore({...getStore, inputs: {"done": true}})
				console.log("task new state:", getStore().inputs);
				getActions().updateTask(taskId)
				
			},

			deleteTasks: async () => {

				let toBeDeleted = getStore().tasks.filter(item => item.done === True)

				const updatedTask = {"onboard": false}
				
				fetch(process.env.BACKEND_URL + "api/tasks/" + toBeDeleted, {
					method: "PUT",
					body: JSON.stringify(updatedTask),
				   	headers: {"Content-Type": "application/json"}
				   }).then(response => {
					   if(response.ok) return response.json()
						throw Error(response.status)
				   }).then(() => {
					getActions().getTaskList()
					getActions().resetInput() 
				   }).catch(error => {
					   console.log(error);
				   });
			},

			////////////////////////////////////////////////////////////////////////////////////////// REWARDS

			getRewardList: async () => {

				//const user = localStorage.getItem('user_id')

				//just to test
				const user = 1

				fetch(process.env.BACKEND_URL + "api/rewards/" + user, {
					method: 'GET',
					headers: { "Content-Type": "application/json" },
				}).then((response) => {
					if(response.ok) return response.json()
					throw Error(response.status)
				}).then((rewardList) => {
					setStore({rewards: rewardList })
				}).catch((err) => {
					console.log('Couldnt get rewards from API', err)
				})
			
			},

			createReward: async () => {

				//const user = localStorage.getItem('user_id')

				//just to test
				const user = 1

				const input = getStore().inputs

				const reward ={
					"label": input.label,
					"user_id": user,
					"rarity_id": input.tier
				}

				fetch(process.env.BACKEND_URL + "api/rewards", {
					method: "POST",
					body: JSON.stringify(reward),
				   	headers: {"Content-Type": "application/json"}
				   }).then((response) => {
					if(response.ok) return response.json()
				   }).then(() => {
					   getActions().getRewardList()
					   getActions().resetInput()
				   }).catch(error => {
					   console.log(error);
				   });
			},

			updateReward: async (rewardId) => {

				const input = getStore().inputs

				const updatedReward ={
					"label": input.label,
					"rarity_id": input.tier
				}
				
				fetch(process.env.BACKEND_URL + "api/rewards/" + rewardId, {
					method: "PUT",
					body: JSON.stringify(updatedReward),
				   	headers: {"Content-Type": "application/json"}
				   }).then(response => {
					   if(response.ok) return response.json()
						throw Error(response.status)
				   }).then(() => {
					getActions().getRewardList()
					getActions().resetInput() 
				   }).catch(error => {
					   console.log(error);
				   });
			},

			deleteReward: async (rewardId) => {
				
				const updatedReward = {"done": true}
				
				fetch(process.env.BACKEND_URL + "api/rewards/" + rewardId, {
					method: "PUT",
					body: JSON.stringify(updatedReward),
				   	headers: {"Content-Type": "application/json"}
				   }).then(response => {
					   if(response.ok) return response.json()
						throw Error(response.status)
				   }).then(() => {
					getActions().getRewardList()
					getActions().resetInput() 
				   }).catch(error => {
					   console.log(error);
				   });
			},

			////////////////////////////////////////////////////////////////////////////////////////// MONSTERS
			
			getimage:(creature,img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12,img13,img14)=>{
				const store=getStore()
				const action=getActions()
				
				if(creature.image){return `https://www.dnd5eapi.co${creature.image}`}
				if (creature.type == "aberration"){return img1}
				if (creature.type == "beast"){return img2}
				if (creature.type == "celestial"){return img3}
				if (creature.type == "construct"){return img4}
				if (creature.type == "dragon"){return img5}
				if (creature.type == "elemental"){return img6}
				if (creature.type == "fey"){return img7}
				if (creature.type == "fiend"){return img8}
				if (creature.type == "giant"){return img9}
				if (creature.type == "humanoid"){return img10}
				if (creature.type == "monstrosity"){return img11}
				if (creature.type == "ooze"){return img12}
				if (creature.type == "plant"){return img13}
				if (creature.type == "undead"){return img14}
			},

			getallMonsters: async ()=>{
				const store=getStore()
				const myHeaders = new Headers();
				myHeaders.append("Accept", "application/json");
				const requestOptions = {
  					method: "GET",
  					headers: myHeaders,
  					redirect: "follow"
				};


				fetch("https://www.dnd5eapi.co/api/monsters", requestOptions)
  				.then((response) => response.json())
  				.then((result) => {setStore({allMonsters: result.results})
				  console.log(store.allMonsters)})
  				.catch((error) => console.error(error));
			},

			getMonsterByCr: (challengeRating1,challengeRating2,challengeRating3,challengeRating4,challengeRating5,challengeRating6,challengeRating7,challengeRating8,challengeRating9,challengeRating10,challengeRating11,challengeRating12,challengeRating13,challengeRating14,challengeRating15,challengeRating16,challengeRating17,challengeRating18,challengeRating19,challengeRating20,challengeRating21,challengeRating22,challengeRating23,challengeRating24,challengeRating25,challengeRating26)=>{
				//monster challenge ranting goes like this 0.125, 0.250 , 0.500 and then form 1 to 24
				const store=getStore()
				const myHeaders = new Headers();
				myHeaders.append("Accept", "application/json");
				const requestOptions = {
				method: "GET",
				headers: myHeaders,
				redirect: "follow"
				};


				fetch(`https://www.dnd5eapi.co/api/monsters?challenge_rating=${challengeRating1},${challengeRating2},${challengeRating3},${challengeRating4},${challengeRating5},${challengeRating6},${challengeRating7},${challengeRating8},${challengeRating9},${challengeRating10},${challengeRating11},${challengeRating12},${challengeRating13},${challengeRating14},${challengeRating15},${challengeRating16},${challengeRating17},${challengeRating18},${challengeRating19},${challengeRating20},${challengeRating21},${challengeRating22},${challengeRating23},${challengeRating24},${challengeRating25},${challengeRating26}`, requestOptions)
				.then((response) => response.json())
				.then((result) => {setStore({encounterPool: result.results})
					//console.log(store.encounterPool)
				})
				.catch((error) => console.error(error));
			},

			getMonsterByIndex: (index)=>{
				const store=getStore()
				const myHeaders = new Headers();
				myHeaders.append("Accept", "application/json");
				const requestOptions = {
				method: "GET",
				headers: myHeaders,
				redirect: "follow"
				};
				fetch("https://www.dnd5eapi.co/api/monsters/"+index, requestOptions)
				.then((response) => response.json())
				.then((bestiary) =>{ setStore({creatureInfo:[...store.creatureInfo,bestiary]})})
				.catch((error) => console.error(error));	
			},
			
			getEncounter: (userLevel)=>{
				const store=getStore()
				const action=getActions()
				
				if(userLevel <= 10) {return action.getMonsterByCr(0.125)}
				if(userLevel <= 20) {return action.getMonsterByCr(0.125,0.250)}
				if(userLevel <= 30) {return action.getMonsterByCr(0.125,0.250,0.500)}
				if(userLevel <= 40) {return action.getMonsterByCr(0.125,0.250,0.500,1)}
				if(userLevel <= 50) {return action.getMonsterByCr(0.125,0.250,0.500,1,2)}
				if(userLevel <= 60) {return action.getMonsterByCr(0.125,0.250,0.500,1,2,3)}
				if(userLevel <= 70) {return action.getMonsterByCr(0.125,0.250,0.500,1,2,3,4)}
				if(userLevel <= 80) {return action.getMonsterByCr(0.125,0.250,0.500,1,2,3,4,5)}
				if(userLevel <= 90) {return action.getMonsterByCr(0.125,0.250,0.500,1,2,3,4,5,6)}
				if(userLevel <= 100) {return action.getMonsterByCr(0.125,0.250,0.500,1,2,3,4,5,6,7)}
				if(userLevel <= 110) {return action.getMonsterByCr(0.125,0.250,0.500,1,2,3,4,5,6,7,8)}
				if(userLevel <= 120) {return action.getMonsterByCr(0.125,0.250,0.500,1,2,3,4,5,6,7,8,9)}
				if(userLevel <= 130) {return action.getMonsterByCr(0.125,0.250,0.500,1,2,3,4,5,6,7,8,9,10)}
				if(userLevel <= 140) {return action.getMonsterByCr(0.125,0.250,0.500,1,2,3,4,5,6,7,8,9,10,11)}
				if(userLevel <= 150) {return action.getMonsterByCr(0.125,0.250,0.500,1,2,3,4,5,6,7,8,9,10,11,12)}
				if(userLevel <= 160) {return action.getMonsterByCr(0.125,0.250,0.500,1,2,3,4,5,6,7,8,9,10,11,12,13)}
				if(userLevel <= 170) {return action.getMonsterByCr(0.125,0.250,0.500,1,2,3,4,5,6,7,8,9,10,11,12,13,14)}
				if(userLevel <= 180) {return action.getMonsterByCr(0.125,0.250,0.500,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15)}
				if(userLevel <= 190) {return action.getMonsterByCr(0.125,0.250,0.500,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16)}
				if(userLevel <= 200) {return action.getMonsterByCr(0.125,0.250,0.500,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24)}
			
			},
			getBestiary: async (userId)=>{
				const store=getStore()
				const action=getActions()
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/bestiary/"+userId)
					const data = await resp.json()
					setStore({ bestiary: data})
					store.bestiary.map((item)=>action.getMonsterByIndex(item.monster_name))
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
				
			},
			getEncounterInfo:()=>{
				const store=getStore()
				const monster = localStorage.getItem("randomMonster")
				const myHeaders = new Headers();
				myHeaders.append("Accept", "application/json");
				const requestOptions = {
				method: "GET",
				headers: myHeaders,
				redirect: "follow"
				};
				fetch("https://www.dnd5eapi.co/api/monsters/"+monster, requestOptions)
				.then((response) => response.json())
				.then((result) =>{setStore({encounterInfo: result})})
				.catch((error) => console.error(error));
			},
			decideEncounter: (userlvl)=>{
				const store=getStore()
				const action=getActions()
				action.getEncounter(userlvl)
				setTimeout(() => {
				const encounterPool = store.encounterPool?.map((item)=>{return item.index});
				const bestiary = store.bestiary?.map((item)=>{return item.monster_name});
				const monsterpool = encounterPool.filter(val => !bestiary.includes(val));
				const randomMonster = monsterpool[Math.floor(Math.random() * monsterpool.length)]
				setStore({randomMonster: randomMonster})
				localStorage.setItem("randomMonster", randomMonster)
				  }, "500");
				
			},
			addMosnterOnBestiary:async (userId)=>{
				const store=getStore()
				const action=getActions()
				
				const monster = store.randomMonster

				const bestiaryEntry={
					monster_name : monster,
					user_id: userId
				}
				
				fetch(process.env.BACKEND_URL + "api/bestiary", {
					method: "POST",
					body: JSON.stringify(bestiaryEntry),
				   	headers: {"Content-Type": "application/json"}
				   }).then(resp => {
					   console.log(resp.ok);
					   console.log(resp.status);
					 return resp.json(); 
				   }).then(data => {
					   console.log(data); 
				   }).catch(error => {
					   console.log(error);
				   });
			},
			creatureRoll:()=>{
				const monsterDice =Math.floor(Math.random() * 6) + 1;
				setStore({creatureRoll: monsterDice})
			},
			userRoll:()=>{
				const store=getStore()
				const action=getActions()
				const userRoll =Math.floor(Math.random() * 6) + 1;
				const barbarianRoll=Math.floor(Math.random() * 8) + 1;
				if(store.user.role=== "Barbarian"){setStore({userRoll: barbarianRoll})}
				else{setStore({userRoll: userRoll})}

			},
			decideVictory: async ()=>{
				const store=getStore()
				const action=getActions()
				const user = 1
				if(store.userRoll > store.creatureRoll){return action.addMosnterOnBestiary(user), 
					setStore({victoryMessage:<div><h2>You are Victorius!!!!!</h2><p>As the final blow is struck, your enemiy falls to the ground with a resounding thud. Silence fills the air, broken only by your labored breathing. 
					You have done it. You have triumphed against all odds. The battlefield, once a scene of chaos and violence, now lies still.<br/> The remnants of your foe lie scattered, 
					and the scent of victory hangs in the air. The morning sun begins to rise, casting a golden hue over the land, symbolizing a new dawn and a hard-fought peace.<br/>
					You gather yourself, bearing wounds and scars, but also a sense of pride and accomplishment. This victory is not just a testament to your strength and skill, 
					but also to your unwavering resolve.<br/> As you stand, the realization sinks in: your name will be remembered, songs will be sung of your deeds, 
					and the tales of your bravery will inspire future generations. This is your moment. Savor it, for you have earned it.</p></div>})} 

					else{return setStore({defeatMessage:<div><h2>You will have to try agin next time</h2><p>The clashing of steel and the roar of battle finally come to a halt. As you fall, an eerie silence descends upon the battlefield.
					You stand up amidst the wreckage of what you where defending, bruised, battered, and barely holding on. The weight of defeat settles heavily on your shoulders.<br/>
					The enemies, now victorious, survey the carnage with grim satisfaction. Though you fought valiantly, the odds were insurmountable, and your strength was not enough to turn the tide.<br/> 
					The bitter taste of failure lingers in the air, mingling with the scent of blood and smoke.As the enemy withdraws, leaving you alone with your thoughts and the bodies of your comrades, 
					a sense of sorrow and loss fills your heart.<br/> This defeat is a harsh reminder of the perils and unpredictability of the life you have chosen. Yet, within this darkness, 
					a glimmer of resolve begins to stir.</p></div> })}
				
			},
			getCombatText:async ()=>{
				const store=getStore()
				const action=getActions()
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/combat")
					const data = await resp.json()
					setStore({ combatText: data})
					console.log(store.combatText)
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			selectCombatText:(creature)=>{
				const store=getStore()
				const action=getActions()
				
				if (creature.type == "aberration"){return store.combatText[0].text}
				if (creature.type == "beast"){return store.combatText[1].text}
				if (creature.type == "celestial"){return store.combatText[2].text}
				if (creature.type == "construct"){return store.combatText[3].text}
				if (creature.type == "dragon"){return store.combatText[4].text}
				if (creature.type == "elemental"){return store.combatText[5].text}
				if (creature.type == "fey"){return store.combatText[6].text}
				if (creature.type == "fiend"){return store.combatText[7].text}
				if (creature.type == "giant"){return store.combatText[8].text}
				if (creature.type == "humanoid"){return store.combatText[9].text}
				if (creature.type == "monstrosity"){return store.combatText[10].text}
				if (creature.type == "ooze"){return store.combatText[11].text}
				if (creature.type == "plant"){return store.combatText[12].text}
				if (creature.type == "undead"){return store.combatText[13].text}
				
			},
			getMonsterimage:(creature,img1,img2,img3,img4,img5,img6,img7,img8,img9,img10,img11,img12,img13,img14)=>{
				const store=getStore()
				const action=getActions()
				
				if(creature.image){return `https://www.dnd5eapi.co${creature.image}`}
				if (creature.type == "aberration"){return img1}
				if (creature.type == "beast"){return img2}
				if (creature.type == "celestial"){return img3}
				if (creature.type == "construct"){return img4}
				if (creature.type == "dragon"){return img5}
				if (creature.type == "elemental"){return img6}
				if (creature.type == "fey"){return img7}
				if (creature.type == "fiend"){return img8}
				if (creature.type == "giant"){return img9}
				if (creature.type == "humanoid"){return img10}
				if (creature.type == "monstrosity"){return img11}
				if (creature.type == "ooze"){return img12}
				if (creature.type == "plant"){return img13}
				if (creature.type == "undead"){return img14}
				
			},
			addExperience:(experience)=>{
				const store=getStore()
				const action=getActions()
				const user =store.user
				const newExp = user.experience + experience
				
				if(newExp > 100){return action.updateUserLevel((newExp -100), (user.level + 1))}
				else {return action.updateUserLevel(newExp, user.level) }

			},
			addEnergy:(energy)=>{
				const store=getStore()
				const action=getActions()
				const user = store.user
				const newEnergy= user.energy + energy
				if (newEnergy >= 40){return action.updateEnergy(40)}
				else {return action.updateEnergy(newEnergy)}
			},
			onQuestCompletion:(experience, energy)=>{
				const store=getStore()
				const action=getActions()
				action.addExperience(experience)
				action.addEnergy(energy)
			},
			
			updateUserLevel:(experience, level)=>{
				const store=getStore()
				const action=getActions()
				const user = store.user
				
					const updatedExpAndLevel = {
						"experience": experience,
						"level": level
					}
				fetch(process.env.BACKEND_URL + "/api/user/"+user.id, {
					method: "PUT",
					body: JSON.stringify(updatedExpAndLevel),
				   	headers: {"Content-Type": "application/json"}
				   }).then(resp => {
					   console.log(resp.ok);
					   console.log(resp.status);
					 return resp.json(); 
				   }).then(data => {
					   console.log(data); 
				   }).catch(error => {
					   console.log(error);
				   });
			},
			updateEnergy:(energy)=>{
				const store=getStore()
				const action=getActions()
				const user = store.user
				
					const updatedEnergy = {
						"energy": energy
						
					}
				fetch(process.env.BACKEND_URL + "/api/user/"+user.id, {
					method: "PUT",
					body: JSON.stringify(updatedEnergy),
				   	headers: {"Content-Type": "application/json"}
				   }).then(resp => {
					   console.log(resp.ok);
					   console.log(resp.status);
					 return resp.json(); 
				   }).then(data => {
					   console.log(data); 
				   }).catch(error => {
					   console.log(error);
				   });
				}

		}
	};
};

export default getState;
