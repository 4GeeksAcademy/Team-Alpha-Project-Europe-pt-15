import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext"

import "../../styles/index.css"

import email from "../../img/icon_email.png"
import password from "../../img/icon_pw.png"

export const Login = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
		<form onSubmit={actions.Login} className="col-md-4 m-3 gap-4 mx-auto card">
			<h1> Log in</h1>
			<div className="d-inline card">
				<img className="col-auto"
					src={email} alt="email icon"
				/>
				<input type="text" id="email" placeholder="email" className="col-9"
				value={store.inputs.email || ""} 
				onChange={event => actions.getInput(event)}
				required/>
			</div>
			<div className="d-inline card">
				<img className="col-auto"
					src={password} alt="email icon"
				/>
				<input type="password" id="password" placeholder="password" className="col-9"
				value={store.inputs.password || ""} 
				onChange={event => actions.getInput(event)}
				required/>
			</div>
			<button type="submit" className="card bg-yellow">
				<h5>Let's go!</h5>
			</button>
			<div className="text-center">
				<p>Not part of the crew yet?
					<Link to={'/signUp'} className="txt-purple"> Sign up here!</Link>
				</p>
				<Link to={''} className="txt-red">Forgot password?</Link>
			</div>
		</form>
		</>
	);
};