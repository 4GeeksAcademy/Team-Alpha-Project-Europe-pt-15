import React, { useContext} from "react";
import { Context } from "../store/appContext";

import "../../styles/index.css";

export const Role = () => {
	const { store, actions } = useContext(Context);

	return (
    <div className="container-fluid text-center">
		<h1>Oh I'm definitely a </h1>
		{store.roles.length > 0 && store.roles.map(role => (
			<div className="col-lg-3 d-lg-inline-flex m-3 gap-3 card">
				<img className="col h-100 align-self-center"
					src={store.images[role.id - 1]}
					alt={role.name + " item"}
				/>
				<div className="col">
					<h3>{role.name}</h3>
					<p>{role.description}</p>
				</div>
				<button type="button" className="btn bg-black text-light"
                    onClick={() => actions.addRole(role.id)}>
					Yes, let's go!
				</button>
			</div>
		))}
    </div>
	);
};