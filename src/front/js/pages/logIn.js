import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import "../../styles/logIn.css"

import { Context } from "../store/appContext";

export const LogIn = () => {
	const { store, actions } = useContext(Context);
	const [loginData, setLoginData] = useState({
		email:"",
		password:""
	})

	return (
		<div className="container">
			<h1 className="login-title text-center">Log In</h1>
			<div className="row">
				<div className="col-2"></div>
				<div className="col-8">
					<form>
						<div className="form-group">
							<label htmlFor="user">Email address</label>
							<input type="text" id="user" className="form-control" required/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input type="password" id="password" className="form-control" required/>
						</div>
						<p>If you don't have one account please go to <Link to={'/signup'}>Sign Up</Link> page</p>
						<button type="submit">Loggin</button>
					</form>
				</div>
				<div className="col-2"></div>
			</div>
		</div>
	);
};

