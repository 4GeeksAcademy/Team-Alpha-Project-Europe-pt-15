import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext"
import { Link, useNavigate } from "react-router-dom";
import { IMAGES } from "../../img/all_images";

export const SignUp = () => {
  
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getBackgroundColor("signup")
    },[]);
	
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
				<img src={IMAGES.user} alt="user icon" />
				<input type="text" name="name" placeholder="Username" className="col-9"
					value={store.inputs.name || ""} 
					onChange={event => actions.getInput(event)}
					required/>
			</div>
			<div className="d-lg-flex flex-row justify-content-evenly p-2 card">
				<img src={IMAGES.email} alt="email icon" />
				<input type="text" name="email" placeholder="email" className="col-9"
					value={store.inputs.email || ""} 
					onChange={event => actions.getInput(event)}
					required/>
			</div>
			{/* password input */}
			<div className="d-lg-flex flex-row justify-content-evenly p-2 card">
				<img src={IMAGES.password} alt="email icon" />
				<input type="password" id="password" name="password" placeholder="password" className="col-7"
					value={store.inputs.password || ""} 
					onChange={event => actions.getInput(event)}
					required/>
				{/* see password */}
          <img src={IMAGES.see_password} alt="see password" onClick={actions.seePassword} />
			</div>
      {/* confirm password */}
      <div className="d-lg-flex flex-row justify-content-evenly p-2 card" style={confirmPasswordClass()}>
				<img src={IMAGES.password_confirm} alt="email icon" />
				<input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" className="col-7"
					value={store.inputs.confirmPassword || ""} 
					onChange={event => {actions.getInput(event)
						confirmPassword()
					}}
					required/> 
					{/* see password */}
					<img src={IMAGES.see_password} alt="see password" onClick={actions.seePassword} />   
			</div>
			{/* submit */}
			<button type="submit" className="card p-3 bg-yellow" onClick={()=>{actions.singUp()
				navigate("/role")}} disabled={isButtonDisabled}>
				<h5 style={{margin:"auto"}}>Gotcha!</h5>
			</button>
			{/* cancel */}
            <Link to="/login" type="reset" className="card p-3 text-center bg-black" onClick={actions.resetInput}>
                <h5>Back to login</h5>
            </Link>		
		</form>
		</>
  )
    
};