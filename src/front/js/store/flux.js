import barbarian from "../../img/icon_user.png"
import wizard from "../../img/icon_email.png"
import rogue from "../../img/icon_pwc.png"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			allMonsters : null,
			encounterPool: null,
			roles: [],
			images: [barbarian, wizard, rogue],
			inputs: {},
		},
		actions: {
			// Use getActions to call a function within a fuction
			
			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},

			getInput: (event) => {
				const name = event.target.id;
				const value = event.target.value;
				setStore({...getStore,
						  inputs: {...getStore().inputs, [name]: value}})
			},

			resetInput: () => {
				setStore({...getStore,inputs: {}})
			},

			Login: (event) => {
				event.preventDefault()

				const input = getStore().inputs

				fetch(process.env.BACKEND_URL + "api/login", {
					method: 'POST',
					body: JSON.stringify({
						'email': input.email,
						'password': input.password
					}),
					headers: { "Content-Type": "application/json" },
				}).then((response) => {
					console.log(response);
					getActions().resetInput();
					if(response.ok) return response.json();
					throw Error(response.status)
				}).then((loginData) => {
					console.log(' Response From Backend', loginData)
					localStorage.setItem('jwt-token', loginData.token)
					localStorage.setItem('user', loginData.user_id)
				}).catch((err) => {
					console.error('Something Wrong when calling API', err)
				})
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
