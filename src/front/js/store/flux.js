import React, { useState, useEffect } from "react";
import barbarian from "../../img/icon_user.png"
import wizard from "../../img/icon_email.png"
import rogue from "../../img/icon_pwc.png"


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			allMonsters : null,
			encounterPool: null,
			bestiary: null,
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
					const resp = await fetch(process.env.BACKEND_URL + "/api/bestiary/"+userId)
					const data = await resp.json()
					setStore({ bestiary: data})
					// don't forget to return something, that is how the async resolves
					//console.log(store.bestiary)
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}	
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
				
				fetch(process.env.BACKEND_URL + "/api/bestiary", {
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
			}

		}
	};
};

export default getState;
