import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";



export const Home = () => {

	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<nav className="d-flex">

				<div className="logoApp">Logo</div>
				<div className="nabBtn">
					<button className="loginNavBtn">Login</button>
					<button className="signNavBtn">Signup</button>

				</div>
				<img url=""></img>
			</nav>

		</div>
	);
};
