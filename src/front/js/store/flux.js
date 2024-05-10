const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			allMonsters : null,
			encounterPool: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
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
			
			},
			getSingleUser: ()=>{
				
			}
			
		}
	};
};

export default getState;
