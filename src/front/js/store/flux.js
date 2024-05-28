import { IMAGES } from "../../img/all_images";

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
			encounter : false,
			message: null,
			allMonsters : null,
			encounterPool: null,
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

				if (passwordInput.type === "password") passwordInput.type = "text";
				else passwordInput.type = "password";
			},	
			
			////////////////////////////////////////////////////////////////////////////////////////// CONDITIONAL RENDERING

			getRoleColor: (view, tier, done) => {

				let roleColor="";

				if (view === "rewards" || view === "tasks" && done === true) {
					switch(tier){
						case 1:
							roleColor = "bg-yellow"
							break;
						case 2:
							roleColor = "bg-green"
							break;
						case 3:
							roleColor = "bg-purple"
							break;
						default:
							roleColor = null
							break;
					}
				} else roleColor = null
		
				return roleColor
			},

			getRoleIcon: (tier) => {

				let roleIcon="";
				
				switch(tier){
					case 1:
						roleIcon = "far fa-star"
						break;
					case 2:
						roleIcon = "fas fa-star-half-alt"
						break;
					case 3:
						roleIcon = "fas fa-star"
						break;
					default:
						roleIcon = "fa-solid fa-question"
						break;
				}

				return roleIcon
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

			getUserDataAndAbilities: async () => {
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
					setStore({...getStore, user: userData[0], abilities: userData[1]})
				}).catch((err) => {
					console.log("Couldnt get user from API", err)
				});
			},

			userRole: async (role) => {

				//const user = localStorage.getItem('user_id')

				//just to test
				const user = 1

				setStore({...getStore, inputs: {"role" : role}})
				getActions().updateUser()
			},

			deleteUser: async () => {

				//const user = localStorage.getItem('user_id')

				//just to test
				const user = 1

				setStore({...getStore, inputs: {"email" : "", "password": ""}})
				getActions().updateUser()
				getActions().Logout()
			},

			updateUser: async () => {
				//const user = localStorage.getItem('user_id')

				//just to test
				const user = 1

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
					getActions().getUserDataAndAbilities()
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

				const taskExperience = getStore().difficulties[tier].experience_given
				const taskEnergy = getStore().difficulties[tier].energy_given

				if(currentExperience + taskExperience < 100) {
					setStore({...getStore, inputs: {
						"experience" : currentExperience + taskExperience,
					}})
				} else {
					setStore({...getStore, inputs: {
						"experience" : currentExperience + taskExperience -100,
						"level" : currentLevel + 1,
					}})
					setStore({...getStore, encounter: true})
				}
				
				if(currentEnergy + taskEnergy < 100) {
					setStore({...getStore, inputs: {
						...getStore().inputs, "energy" : currentEnergy + taskEnergy}})
				} else {
					setStore({...getStore, inputs: {
						...getStore().inputs, "energy" : 100}})
				}

				getActions().updateUser()				
				setStore({...getStore, inputs: {"done": true}})
				getActions().updateTask(taskId)
			},

			cleanDashboard: async () => {

				let offBoard = getStore().tasks.filter(item => item.done === true && item.onboard === true)
				console.log(offBoard);
				
				for (let task of offBoard){
					setStore({...getStore, inputs: {"onboard": false}})
					getActions().updateTask(task.id)
				}
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
				.then((result) =>{ setStore({creatureInfo:[...store.creatureInfo,result]})})
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
			getBestiary: async ()=>{
				//const user = localStorage.getItem('user_id')

				//just to test
				const user = 1

				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/bestiary/"+ user)
					const data = await resp.json()
					setStore({ bestiary: data})
					// don't forget to return something, that is how the async resolves
					console.log(getStore().bestiary)
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}	
			},
			getBestiaryInfo:()=>{
				const myBestiary = getStore().bestiary
				console.log(myBestiary)
				myBestiary.map((item)=>getActions().getMonsterByIndex(item.monster_name))
				setTimeout(() => { 
					console.log(getStore().creatureInfo)
				}, "500");
				

			},
			decideEncounter: (userlvl,userId)=>{
				const store=getStore()
				const action=getActions()
				action.getEncounter(userlvl)
				action.getBestiary(userId)
				
				setTimeout(() => {
				const encounterPool = store.encounterPool?.map((item)=>{return item.index});
				const bestiary = store.bestiary?.map((item)=>{return item.monster_name});
				const monsterpool = encounterPool.filter(val => !bestiary.includes(val));
				const randomMonster = monsterpool[Math.floor(Math.random() * monsterpool.length)]
				setStore({randomMonster: randomMonster})
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
			decideVictory: async (userLevel,userId)=>{
				const store=getStore()
				const action=getActions()
				action.decideEncounter(userLevel,userId)
				
				setTimeout(() => {
					console.log(store.randomMonster)
					const playerDice = Math.floor(Math.random() * 6) + 1
					const monsterDice =Math.floor(Math.random() * 6) + 1;
					if(playerDice > monsterDice){return action.addMosnterOnBestiary(userId) }
					else{return console.log(false)}
				}, "500");
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

			onQuestCompletion:(experience, energy)=>{
				const store=getStore()
				const action=getActions()
				action.addExperience(experience)
				action.addEnergy(energy)
			},
		}
	};
};

export default getState;
