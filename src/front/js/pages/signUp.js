import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom";

import user from "../../img/icon_user.png"
import email from "../../img/icon_email.png"
import password from "../../img/icon_pw.png"
import eye from "../../img/icon_pweye.png"
import "../../styles/index.css";

export const SignUp = () => {
  
	const { store, actions } = useContext(Context);
	
	const navigate = useNavigate()

  	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  	const confirmPassword = () => {
		if(store.inputs.password === store.inputs.confirmPassword){
			setIsButtonDisabled(false)
		}
		if (store.inputs.password !== store.inputs.confirmPassword && store.inputs.password === "") {
      	setIsButtonDisabled(true)
    	} 
	};

  const confirmPasswordClass =()=>{ 
	if(store.inputs.password !== store.inputs.confirmPassword && store.inputs.confirmPassword !== ""){return {borderColor:"red"}}
	else{return {borderColor:"black"}}
	}
 

  return (
    <>
		<form className="col-md-4 mx-auto p-5 gap-4 card">
			<h1> Sing Up</h1>
			{/* email input */}
			<div className="d-lg-flex flex-row justify-content-evenly p-2 card">
				<img src={user} alt="user icon" />
				<input type="text" name="name" placeholder="Username" className="col-9"
					value={store.inputs.name || ""} 
					onChange={event => actions.getInput(event)}
					required/>
			</div>
			<div className="d-lg-flex flex-row justify-content-evenly p-2 card">
				<img src={email} alt="email icon" />
				<input type="text" name="email" placeholder="email" className="col-9"
					value={store.inputs.email || ""} 
					onChange={event => actions.getInput(event)}
					required/>
			</div>
			{/* password input */}
			<div className="d-lg-flex flex-row justify-content-evenly p-2 card">
				<img src={password} alt="email icon" />
				<input type="password" id="password" name="password" placeholder="password" className="col-7"
					value={store.inputs.password || ""} 
					onChange={event => actions.getInput(event)}
					required/>
				{/* see password */}
                <img src={eye} alt="see password" onClick={actions.seePassword} />
			</div>
      {/* confirm password */}
      <div className="d-lg-flex flex-row justify-content-evenly p-2 card" style={confirmPasswordClass()}>
				<img src={password} alt="email icon" />
				<input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" className="col-7"
					value={store.inputs.confirmPassword || ""} 
					onChange={event => {actions.getInput(event)
						confirmPassword()
					}}
					required/> 
					{/* see password */}
					<img src={eye} alt="see password" onClick={actions.seePassword} />   
			</div>
			{/* submit */}
			<button type="submit" className="card p-3 bg-yellow" onClick={()=>{actions.singUp()
				navigate("/login")}} disabled={isButtonDisabled}>
				<h5 style={{margin:"auto"}}>Sign up!</h5>
			</button>		
		</form>
		</>
  )
    
};