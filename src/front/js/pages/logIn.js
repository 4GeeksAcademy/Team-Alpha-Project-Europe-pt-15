import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"
import { IMAGES } from "../../img/all_images";

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
		<form className="col-md-4 mx-auto p-5 gap-4 card">
			<h1> Log in</h1>
			{/* email input */}
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
			{/* submit */}
			<Link to="/quests">
				<div type="submit" className="card p-3 text-center bg-yellow" onClick={actions.Login}>
					<h5>Let's go!</h5>
				</div>
			</Link>
			{/* signup and forgot */}
			<div className="text-center">
				<p>Not part of the crew yet?
					<Link to={'/signUp'} className="txt-purple"> Sign up here!</Link>
				</p>
				<Link to={'/forgot'} className="txt-red">Forgot password?</Link>
			</div>
		</form>
		</>
	);
};