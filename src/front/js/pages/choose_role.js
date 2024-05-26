import React, { useContext, useEffect} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


import "../../styles/index.css";

export const Role = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getRoles()
	},[])

	return (
    <div className="container-fluid text-center">
		<h1>Oh I'm definitely a </h1>
		{store.roles.length > 0 && store.roles.map( role => (
			<div className="col-lg-3 d-lg-inline-flex m-xl-3 my-3 p-4 gap-3 card" key={role.id}>
				<img className="col-6 align-self-center"
					src={store.images[role.id - 1]}
					alt={role.name + " item"}
				/>
				<div className="col">
					<h3>{role.name}</h3>
					<p>{role.description}</p>
				</div>
				<Link to="/quests" >
					<button type="button" className="btn bg-black text-light"
						onClick={() => actions.userRole(role.id)}>
						Yes, let's go!
					</button>
				</Link>
			</div>
		))}
    </div>
	);
};