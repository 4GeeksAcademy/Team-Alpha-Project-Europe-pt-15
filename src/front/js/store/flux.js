import barbarian from "../../img/icon_user.png"
import wizard from "../../img/icon_email.png"
import rogue from "../../img/icon_pwc.png"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			allMonsters : null,
			encounterPool: null,
			
			tasks:{
				label:'',
				userId:'',
				difficultyId:''
			},

			roles: [],
			images: [barbarian, wizard, rogue]
		},
		actions: {
			// Use getActions to call a function within a fuction
			
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + '/api/hello')
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			getUsers:() => {
				fetch(process.env.BACKEND_URL + '/api/users')
					.then((response) => {
			  	if (response.ok) {
				return response.json();
			  }
			  	throw Error(response.status + "Something went wrong");
			})
			.then((data) => {
			  console.log(data); // Do something with the data if needed
			})
			.catch((error) => {
			  console.error(error);
			})},


			getTask: async () => {

				try
				{

					const response = await fetch(process.env.BACKEND_URL + '/api/task', {
						method: 'GET',
						headers: {
							"Content-Type": "application/json",
						  },
					}).then((response) => {
						if(response.ok) 
							return response.json()
						const data = response.json()
						console.log(data);
						
						})
				}catch (error) {
					console.log(error)
				}
			},
				


			addTask : async () => {
				try {
				  const response = await fetch(process.env.BACKEND_URL + '/api/task', {
					method: "POST",
					headers: {
					  "Content-Type": "application/json",
					},
					body: JSON.stringify({'':'',
						'userId': ''
					}),
				  });
			  
				  if (!response.ok) {
					throw new Error("Failed to add task");
				  }
			  
				  const data = await response.json();
				  console.log(data)
				} catch (error) {
				  console.error(error);
				}
			  },

			  updateTask : async (id) => {
				try {
				  const updatedTasks = tasks.map((task) => {
					if (task.id === id) {
					  return { ...task, is_done: false, label: newTaskName };
					}
					return task;
				  });
			
				  const response = await fetch(process.env.BACKEND_URL + '/api/task', {
					method: "PUT",
					headers: {
					  "Content-Type": "application/json",
					},
					body: JSON.stringify(updatedTasks.find((task) => task.id === id)),
				  });
			
				  if (!response.ok) {
					throw new Error("Failed to update task");
				  }
			
				  const updatedTaskIndex = tasks.findIndex((task) => task.id === id);
				  if (updatedTaskIndex !== -1) {
					const updatedTaskList = [...tasks];
					updatedTaskList.splice(updatedTaskIndex, 1);
					setTasks(updatedTaskList);
				  }
				} catch (error) {
				  console.error(error);
				}
			  },


			  handleChange: (e) => {
				const {id, value} = e.target
				const store = getStore()
				const newTask = {...store.tasks, [id]: task}

				setStore({task: newTasks})
				
			},


			
			  

			getRoles: () => {
				fetch(process.env.BACKEND_URL + "api/roles", {
					method: 'GET',
					headers: { "Content-Type": "application/json" },
				}).then((response) => {
					console.log(response);
					if(response.ok) return response.json()
					throw Error(response.status)
				}).then((rolesData) => {
					console.log(rolesData);
					setStore({...getStore, roles: rolesData})
				}).catch((err) => {
					console.error('Couldnt get classes from API', err)
				})
			},

			addRole: (role) => {

				//const user = localStorage.getItem('user_id')

				//just to test
				const user = 1

				fetch(process.env.BACKEND_URL + "roles/" + user + "/" + role, {
					method: 'PUT',
					headers: { "Content-Type": "application/json" },
				}).then((response) => {
					console.log(response);
					if(response.ok) return response.json()
					throw Error(response.status)
				}).then((message) => {
					console.log(message)
				}).catch((err) => {
					console.error('Couldnt add role to user', err)
				})
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
				//monster challenge ranting goes like this 0.125, 0.250 , 0.500 and the form 1 to 24
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
					console.log(store.encounterPool)})
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
				.then((response) => response.text())
				.then((result) => console.log(result))
				.catch((error) => console.error(error));	
			},
		}
	};
};

export default getState;
