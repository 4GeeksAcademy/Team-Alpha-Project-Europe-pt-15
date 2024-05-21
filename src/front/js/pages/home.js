import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<Link to="/login" className="btn btn-primary">Log in/ Sign Up</Link>
		</div>
	);
};
