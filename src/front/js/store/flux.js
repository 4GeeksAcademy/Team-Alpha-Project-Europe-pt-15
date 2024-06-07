import React, {useState} from "react";
import { IMAGES } from "../../img/all_images";
import { TEXT } from "../../text/all_messages";


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: [],
			tasks: [],
			rewards: [],
     		bestiary: [],
 			roles: [],
			difficulties: [],
			rarities: [],
			abilities: [],
			scoreboard: [],
			npc: [],
			allMonsters : null,
			encounterPool: [],
			creatureInfo:[],
			inputs: {},

		},
		actions: {
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
				let passwordInput = document.getElementById("password")
				let confirmPasswordInput = document.getElementById("confirmPassword")
				if (passwordInput.type === "password"){passwordInput.type = "text", confirmPasswordInput.type = "text"}
				else {passwordInput.type = "password", confirmPasswordInput.type = "password"}
			},

			////////////////////////////////////////////////////////////////////////////////////////// CONDITIONAL RENDERING

			randomNPC: () => {
				let npc = Math.floor(Math.random() * 8)
				localStorage.setItem('randomNPC', npc)
			},

			alertPin: () => {
				if (getStore().user.energy >= 85
				|| getStore().user.encounter > 0
				|| getStore().user.role === undefined
				&& getStore().user.experience === 0
				&& getStore().user.energy === 0) return "fa-solid fa-circle fa-beat txt-red"
				else return null
			},
			
			tierColor: (view, tier, done) => {
				let tierColor="";

				if (view === "rewards" || view === "tasks" && done === true) {
					switch(tier){
						case 1:
							tierColor = "bg-yellow"
							break;
						case 2:
							tierColor = "bg-green"
							break;
						case 3:
							tierColor = "bg-purple"
							break;
						default:
							tierColor = null
							break;
					}
				} else tierColor = null
		
				return tierColor
			},

			tierIcon: (view, tier) => {
				let tierIcon="";
				
				if (view === "tasks") {
					switch(tier){
						case 1:
							tierIcon = "fa-regular fa-circle"
							break;
						case 2:
							tierIcon = "fa-solid fa-circle-half-stroke"
							break;
						case 3:
							tierIcon = "fa-solid fa-circle"
							break;
						default:
							tierIcon = "fa-solid fa-question"
							break;
					}
				} else if (view === "rewards") {
					switch(tier){
						case 1:
							tierIcon = "far fa-star"
							break;
						case 2:
							tierIcon = "fas fa-star-half-alt"
							break;
						case 3:
							tierIcon = "fas fa-star"
							break;
						default:
							tierIcon = "fa-solid fa-question"
							break;
					}}

				return tierIcon
			},
			
			getActionIcon: (view, done) => {
				let actionIcon="";

				if (view === "rewards") actionIcon = "fa-solid fa-skull" 
				else if(view === "tasks") {
					switch(done){
						case true:
							actionIcon = "fa-solid fa-check"
							break;
						default:
							actionIcon = "fa-solid fa-tents"
							break;
					}
				} else actionIcon = "fa-solid fa-question"
		
				return actionIcon
			},

			getDashboardModalAction: (view, modalId) => {
				if (view === "tasks" && typeof modalId === "number") getActions().updateTask(modalId)
				if (view === "tasks" && typeof modalId === "string") getActions().createTask()
				if (view === "rewards" && typeof modalId === "number") getActions().updateReward(modalId)
				if (view === "rewards" && typeof modalId === "string") getActions().createReward()					
			},

			getRoleImage: (role) => {
				let roleImg = ""

				if ( role === 1) roleImg = IMAGES.barbarian
				else if (role === 2) roleImg = IMAGES.wizard
				else if (role === 3) roleImg = IMAGES.rogue
				return roleImg
			},

			getAbilityImage: (ability_rarity) => {
				let role = getStore().user.role
				let abilityImg = ""

				if ( role === "Barbarian"){
					if (ability_rarity === 1) abilityImg = IMAGES.barbarian1
					if (ability_rarity === 2) abilityImg = IMAGES.barbarian2
					if (ability_rarity === 3) abilityImg = IMAGES.barbarian3
				} else if (role === "Wizard"){
					if (ability_rarity === 1) abilityImg = IMAGES.wizard1
					if (ability_rarity === 2) abilityImg = IMAGES.wizard2
					if (ability_rarity === 3) abilityImg = IMAGES.wizard3
				} else if (role === "Rogue"){
					if (ability_rarity === 1) abilityImg = IMAGES.rogue1
					if (ability_rarity === 2) abilityImg = IMAGES.rogue2
					if (ability_rarity === 3) abilityImg = IMAGES.rogue3
				}
				return abilityImg
			},

			getBackgroundColor: (page) => {
				if (page === "home" ) document.querySelector("body").setAttribute("class", "bg-white")
				if (page === "login" ) document.querySelector("body").setAttribute("class", "bg-green")
				if (page === "signup" ) document.querySelector("body").setAttribute("class", "bg-yellow")
				if (page === "role" ) document.querySelector("body").setAttribute("class", "bg-red")
				if (page === "forgot" ) document.querySelector("body").setAttribute("class", "bg-purple")
				if (page === "quests" ) document.querySelector("body").setAttribute("class", "bg-yellow")
				if (page === "rewards" ) document.querySelector("body").setAttribute("class", "bg-yellow")
				if (page === "profile" ) document.querySelector("body").setAttribute("class", "bg-purple")
				if (page === "bestiary" ) document.querySelector("body").setAttribute("class", "bg-green")
				if (page === "encounter" ) document.querySelector("body").setAttribute("class", "bg-purple")
				if (page === "battle" ) document.querySelector("body").setAttribute("class", "bg-red")
				if (page === "scoreboard" ) document.querySelector("body").setAttribute("class", "bg-purple")
			},

			encounterText: () => {
				const creature = getStore().encounterInfo

				if (creature.type == "aberration") return TEXT.aberration
				if (creature.type == "beast") return TEXT.beast
				if (creature.type == "celestial") return TEXT.celestial
				if (creature.type == "construct") return TEXT.construct
				if (creature.type == "dragon") return TEXT.dragon
				if (creature.type == "elemental") return TEXT.elemental
				if (creature.type == "fey") return TEXT.fey
				if (creature.type == "fiend") return TEXT.fiend
				if (creature.type == "giant") return TEXT.giant
				if (creature.type == "humanoid") return TEXT.humanoid
				if (creature.type == "monstrosity") return TEXT.monstrosity
				if (creature.type == "ooze") return TEXT.ooze
				if (creature.type == "plant") return TEXT.plant
				if (creature.type == "undead") return TEXT.undead
			},

			dice: () => {
				setStore({...getStore, dice: [0, IMAGES.dice1, IMAGES.dice2, IMAGES.dice3, IMAGES.dice4, IMAGES.dice5, IMAGES.dice6, IMAGES.dice7, IMAGES.dice8]})
			},

			battleResponse: () => {
				const store = getStore()
				if(store.userRoll > store.creatureRoll) return {title: TEXT.victoryTitle, response: TEXT.victory}
				else return {title: TEXT.defeatTitle, response: TEXT.defeat}
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

			setNPCs: () => {
				setStore({...getStore, npc: [
					{ image: IMAGES.thug, title: TEXT.thugTitle, response: TEXT.thugResponse },
					{ image: IMAGES.bard, title: TEXT.bardTitle, response: TEXT.bardResponse },
					{ image: IMAGES.gandalf, title: TEXT.gandalfTitle, response: TEXT.gandalfResponse },
					{ image: IMAGES.knight, title: TEXT.knightTitle, response: TEXT.knightResponse },
					{ image: IMAGES.mage, title: TEXT.mageTitle, response: TEXT.mageResponse },
					{ image: IMAGES.queen, title: TEXT.queenTitle, response: TEXT.queenResponse },
					{ image: IMAGES.sea_merchant, title: TEXT.seaMerchantTitle, response: TEXT.seaMerchantResponse },
					{ image: IMAGES.villager, title: TEXT.villagerTitle, response: TEXT.villagerResponse },
					{ image: IMAGES.war_goddess, title: TEXT.warGoddessTitle, response: TEXT.warGoddessResponse },
				]})
			},

			////////////////////////////////////////////////////////////////////////////////////////// AUTHENTICATION

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
						getActions().Login()		
					}).catch(error => {
					   console.log(error);
				   });
			},
			
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
					localStorage.setItem('userLevel', loginData.level)
					getActions().getUserDataAndAbilities()
					getActions().getTaskList()
					getActions().getRewardList()
				}).catch((err) => {
					alert("Could not login, email or password is wrong.")
					console.error('Something Wrong when calling API', err)
				})
			},

			Logout: () => {
				localStorage.removeItem('jwt-token')
				localStorage.removeItem('user')
				getActions().resetInput()
				setStore({...getStore, user:[], tasks:[], rewards:[], bestiary:[], abilities:[]})
			},
			
			////////////////////////////////////////////////////////////////////////////////////////// USER 
			
			getUserDataAndAbilities: async () => {
				const user = localStorage.getItem('user')
				//console.log("user data auth", localStorage.getItem('jwt-token'))
				//console.log("user id", localStorage.getItem('user'))

				fetch(process.env.BACKEND_URL + "api/user/" + user, {
					method: 'GET',
					headers: { "Content-Type": "application/json" },
				}).then((response) => {
					if(response.ok) return response.json()
						console.log(response.json);
					throw Error(response.status)
				}).then((userData) => {
					setStore({...getStore, user: userData[0], abilities: userData[1]})
				}).catch((err) => {
					console.log("Couldnt get user from API", err)
				});
			},

			userRole: async (role) => {
				setStore({...getStore, inputs: {"role" : role}})
				getActions().updateUser()
			},

			deleteUser: async () => {
				setStore({...getStore, inputs: {"email" : "", "password": ""}})
				getActions().updateUser()
				getActions().Logout()
			},

			updateUser: async () => {
				const user = localStorage.getItem('user')

				const input = getStore().inputs

				const updatedUser = {
					"name": input.name,
					"email": input.email,
					"user_role": input.role,
					"level": input.level,
					"experience": input.experience,
					"energy": input.energy,
					"encounter": input.encounter
				}
				
				fetch(process.env.BACKEND_URL + "api/user/" + user, {
					method: "PUT",
					body: JSON.stringify(updatedUser),
				   	headers: {"Content-Type": "application/json"}
				   }).then(response => {
					   if(response.ok) return response.json()
						throw Error(response.status)
				   }).then(() => {
					getActions().getUserDataAndAbilities()
					getActions().resetInput()
				   }).catch(error => {
					   console.log(error);
				   });
			},

			changePassword: async () =>{
				const user = localStorage.getItem('user')

				const input = getStore().inputs

				const passwords = {
					"currentPassword": input.currentPassword,
					"newPassword": input.newPassword
				}

				fetch(process.env.BACKEND_URL + "api/password/" + user, {
					method: "PUT",
					body: JSON.stringify(passwords),
				   	headers: {"Content-Type": "application/json"}
				   }).then(response => {
					console.log(response);
					   if(response.ok) return response.json()
						throw Error(response.status)
					}).then(() => {
						getActions().getUserDataAndAbilities()
						getActions().resetInput()
					}).catch(error => {
						alert("Could not change password.")
						getActions().resetInput()
						console.log(error);
				   });
			},

			forgotPassword: async () => {
				const input = getStore().inputs

				const recoveryMail = {
					"email": input.email
				}			
				
				fetch(process.env.BACKEND_URL + "api/passwordreset", {
					method: "PUT",
					body: JSON.stringify(recoveryMail),
				   	headers: {"Content-Type": "application/json"}
				   }).then(response => {
					   if(response.ok) return response.json()
						throw Error(response.status)
				   }).then(() => {
					getActions().resetInput()
				   }).catch(error => {
					   console.log(error);
				   });
			},


			resetUserEncounter: async () => {
				const user = localStorage.getItem('user')

				const updatedUser = {
					"encounter": false
				}

				fetch(process.env.BACKEND_URL + "api/user/" + user, {
					method: "PUT",
					body: JSON.stringify(updatedUser),
				   	headers: {"Content-Type": "application/json"}
				   }).then(response => {
					   if(response.ok) return response.json()
						throw Error(response.status)
				   }).then(() => {
					getActions().getUserDataAndAbilities()
					getActions().resetInput()
				   }).catch(error => {
					   console.log(error);
				   });
			},		

			
			getScoreboard: async () => {
				fetch(process.env.BACKEND_URL + "api/users", {
					method: "GET",
				   	headers: {"Content-Type": "application/json"}
				}).then(response => {
	  				if(response.ok) return response.json()
					throw Error(response.status)
				}).then((data) => setStore({...getStore, scoreboard: data})
				).catch(error => {
				   console.log(error);
				});
			},


			////////////////////////////////////////////////////////////////////////////////////////// TASKS 

			getTaskList: async () => {
				const user = localStorage.getItem('user')

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
				const user = localStorage.getItem('user')
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
				const currentExperience = parseFloat(getStore().user.experience)
				const currentEnergy = parseFloat(getStore().user.energy)

				const taskExperience = getStore().difficulties[tier].experience_given
				const taskEnergy = getStore().difficulties[tier].energy_given

				const roguePercentage = getStore().roles[2].passive
				const rogueExtraExp = parseFloat(taskExperience * roguePercentage)
				const rogueExtraEng = parseFloat(taskEnergy * roguePercentage)
				const encounterCount = getStore().user.encounter
				
				if (getStore().user.role === "Rogue") {
						if(currentExperience + taskExperience + rogueExtraExp < 100) {
							setStore({...getStore, inputs: {
								"experience" : currentExperience + taskExperience + rogueExtraExp
							}})
						} else {
							setStore({...getStore, inputs: {
								"experience" : currentExperience + taskExperience + rogueExtraExp -100,
								"level" : currentLevel + 1,
								"encounter" : encounterCount + 1
							}})
						}
						if(currentEnergy + taskEnergy + rogueExtraEng < 100) {
							setStore({...getStore, inputs: {
								...getStore().inputs, "energy" : currentEnergy + taskEnergy + rogueExtraEng}})
						} else {
							setStore({...getStore, inputs: {
								...getStore().inputs, "energy" : 100}})
						}
				}else if(getStore().user.role === "Wizard"){
					if(currentExperience + taskExperience < 100) {
						setStore({...getStore, inputs: {
							"experience" : currentExperience + taskExperience,
						}})
					} else {
						setStore({...getStore, inputs: {
							"experience" : currentExperience + taskExperience - 100,
							"level" : currentLevel + 1,
							"encounter" : encounterCount + 2
						}})
					}
					if(currentEnergy + taskEnergy < 100) {
						setStore({...getStore, inputs: {
							...getStore().inputs, "energy" : currentEnergy + taskEnergy}})
					} else {
						setStore({...getStore, inputs: {
							...getStore().inputs, "energy" : 100}})
					}
				}else {
						if(currentExperience + taskExperience < 100) {
							setStore({...getStore, inputs: {
								"experience" : currentExperience + taskExperience,
							}})
						} else {
							setStore({...getStore, inputs: {
								"experience" : currentExperience + taskExperience - 100,
								"level" : currentLevel + 1,
								"encounter" : encounterCount + 1
							}})
						}
						if(currentEnergy + taskEnergy < 100) {
							setStore({...getStore, inputs: {
								...getStore().inputs, "energy" : currentEnergy + taskEnergy}})
						} else {
							setStore({...getStore, inputs: {
								...getStore().inputs, "energy" : 100}})
						}
				}
				getActions().updateUser()				
				setStore({...getStore, inputs: {"done": true}})
				getActions().updateTask(taskId)
				getActions().randomNPC()
			},

			cleanDashboard: async () => {
				let offBoard = getStore().tasks.filter(item => item.done === true)
				
				for (let task of offBoard){
					setStore({...getStore, inputs: {"onboard": false}})
					getActions().updateTask(task.id)
				}
			},

			////////////////////////////////////////////////////////////////////////////////////////// REWARDS

			getRewardList: async () => {

				const user = localStorage.getItem('user')

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
				const user = localStorage.getItem('user')

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

			checkEnoughEnergy: (tier) => {
				const currentEnergy = getStore().user.energy
				const rewardEnergy = getStore().rarities[tier].energy_required

				if (currentEnergy - rewardEnergy >= 0) return true
				else return false
			},

			getReward: async (tier, rewardId) => {
				const currentEnergy = getStore().user.energy
				const rewardEnergy = getStore().rarities[tier].energy_required

				setStore({...getStore, inputs: {
						...getStore().inputs, "energy" : currentEnergy - rewardEnergy}})

				getActions().updateUser()
				getActions().deleteReward(rewardId)
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

			////////////////////////////////////////////////////////////////////////////////////////// BESTIARY			

			getBestiary: async ()=>{
				const user = localStorage.getItem('user')

				const store=getStore()
				const action=getActions()

				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/bestiary/" + user)
					const data = await resp.json()
					setStore({ bestiary: data})
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
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
				.then((info) =>{setStore({creatureInfo: info})})
				.catch((error) => console.error(error));	
			},

			
			getMonsterImage:(creature) => {
				if (creature.image){return `https://www.dnd5eapi.co${creature.image}`}
				if (creature.type == "aberration") return IMAGES.aberration
				if (creature.type == "beast") return IMAGES.beast
				if (creature.type == "celestial") return IMAGES.celestial
				if (creature.type == "construct") return IMAGES.construct
				if (creature.type == "dragon") return IMAGES.dragon
				if (creature.type == "elemental") return IMAGES.elemental
				if (creature.type == "fey") return IMAGES.fey
				if (creature.type == "fiend") return IMAGES.fiend
				if (creature.type == "giant") return IMAGES.giant
				if (creature.type == "humanoid") return IMAGES.humanoid
				if (creature.type == "monstrosity") return IMAGES.monstrosity
				if (creature.type == "ooze") return IMAGES.ooze
				if (creature.type == "plant") return IMAGES.plant
				if (creature.type == "undead") return IMAGES.undead
				else return IMAGES.creature
			},

			////////////////////////////////////////////////////////////////////////////////////////// MONSTERS

			getallMonsters: ()=>{
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
			
			getEncounter: ()=>{
				const action=getActions()
				const userLevel = localStorage.getItem("userLevel")
				
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
      
			encounterMonster: ()=>{
				const store=getStore()
				const action=getActions()
				
				action.getBestiary()
				action.getEncounter()
				setTimeout(() => {
				const encounterPool = store.encounterPool?.map((item)=>{return item.index});
				const bestiary = store.bestiary?.map((item)=>{return item.monster_name});
				const monsterpool = encounterPool.filter(val => !bestiary.includes(val));
				const randomMonster = monsterpool[Math.floor(Math.random() * monsterpool.length)]
				setStore({randomMonster: randomMonster})
				localStorage.setItem("randomMonster", randomMonster)
				  }, "1000");
			},

			encounterInfo: async ()=>{
				const action=getActions()

				action.encounterMonster()
				
				const monster = localStorage.getItem("randomMonster")
				const myHeaders = new Headers();
				myHeaders.append("Accept", "application/json");
				const requestOptions = {
				method: "GET",
				headers: myHeaders,
				redirect: "follow"
				};
				fetch("https://www.dnd5eapi.co/api/monsters/"+ monster, requestOptions)
				.then((response) => response.json())
				.then((result) =>{setStore({encounterInfo: result})	
				})
				.catch((error) => console.error(error));
			},

			battle: () => {
				const store=getStore()

				const creatureRoll =Math.floor(Math.random() * 3) + 1;
				setStore({creatureRoll: creatureRoll})

				const userRoll =Math.floor(Math.random() * 6) + 1;
				const barbarianRoll=Math.floor(Math.random() * 8) + 1;
				if(store.user.role=== "Barbarian"){setStore({userRoll: barbarianRoll})}
				else{setStore({userRoll: userRoll})}

				if(store.userRoll > store.creatureRoll) {
					const encounterCount = getStore().user.encounter
					setStore({...getStore, inputs:{"encounter" : encounterCount - 1}})
					getActions().updateUser()
					getActions().addMosnterOnBestiary()
				}
			},

			addMosnterOnBestiary: ()=>{
				const user = localStorage.getItem("user")
				const monster = getStore().encounterInfo.index
				const type = getStore().encounterInfo.type

				const bestiaryEntry={
					monster_name : monster,
					type : type,
					user_id: user
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
			/*
			creatureRoll:()=>{
				const monsterDice =Math.floor(Math.random() * 2) + 1;
				setStore({creatureRoll: monsterDice})
			},

			userRoll:()=>{
				const store=getStore()
				const userRoll =Math.floor(Math.random() * 6) + 1;
				const barbarianRoll=Math.floor(Math.random() * 8) + 1;

				if(store.user.role=== "Barbarian"){setStore({userRoll: barbarianRoll})}
				else{setStore({userRoll: userRoll})}
			},

			decideVictory: async (monster,type)=>{
				const store=getStore()
				const action=getActions()
				const user = localStorage.getItem('user')
				const encounterCount = getStore().user.encounter
				//setStore({...getStore, inputs:{"encounter" : encounterCount - 1}})
				action.updateUser()	

				if(store.userRoll > store.creatureRoll){return action.addMosnterOnBestiary(user,monster,type), 
					setStore({victoryMessage:<div><h2>You are Victorius!!!!!</h2><p>As the final blow is struck, your enemiy falls to the ground with a resounding thud. Silence fills the air, broken only by your labored breathing. 
					You have done it. You have triumphed against all odds. The battlefield, once a scene of chaos and violence, now lies still.<br/> The remnants of your foe lie scattered, 
					and the scent of victory hangs in the air. The morning sun begins to rise, casting a golden hue over the land, symbolizing a new dawn and a hard-fought peace.<br/>
					You gather yourself, bearing wounds and scars, but also a sense of pride and accomplishment. This victory is not just a testament to your strength and skill, 
					but also to your unwavering resolve.<br/> As you stand, the realization sinks in: your name will be remembered, songs will be sung of your deeds, 
					and the tales of your bravery will inspire future generations. This is your moment. Savor it, for you have earned it.</p></div>})} 
					
				else{return setStore({defeatMessage:<div><h2>You will have to try agin next time</h2><p>The clashing of steel and the roar of battle finally come to a halt. As you fall, an eerie silence descends upon the battlefield.
					You stand up amidst the wreckage of what you were defending, bruised, battered, and barely holding on. The weight of defeat settles heavily on your shoulders.<br/>
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
			},*/
		}
	};
};

export default getState;