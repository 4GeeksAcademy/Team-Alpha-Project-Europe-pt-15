import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext"

import "../../styles/index.css"

import user from "../../img/icon_user.png"
import email from "../../img/icon_email.png"
import password from "../../img/icon_pw.png"
import eye from "../../img/icon_pweye.png"

export const ProfileEdit = () => {
	const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getUserData()
    },[]);

	return (
		<>
		<form onSubmit={actions.Login} className="col-md-4 mx-auto p-5 gap-4 card">
			<h1>How may I assist you oh powerful one?</h1>
            {/* username */}
			<div className="d-inline-flex flex-row justify-content-evenly p-2 card">
				<img src={user} alt="user icon" />
				<input type="text" id="user" placeholder={store.user.name} className="col-9"
                    value={store.inputs.user || ""} 
                    onChange={event => actions.getInput(event)} />
			</div>
            {/* role */}
			<div className="d-inline-flex flex-row justify-content-evenly p-2 card">
				<img src={user} alt="role icon" />
				<input type="text" id="role" placeholder={store.user.role} className="col-9"
                    value={store.inputs.role || ""} 
                    onChange={event => actions.getInput(event)} />
			</div>
			{/* email */}
			<div className="d-inline-flex flex-row justify-content-evenly p-2 card">
				<img src={email} alt="email icon" />
				<input type="text" id="email" placeholder={store.user.email} className="col-9"
                    value={store.inputs.email || ""} 
                    onChange={event => actions.getInput(event)} />
			</div>
			{/* password */}
			<div className="d-inline-flex flex-row justify-content-evenly p-2 card">
				<img src={password} alt="email icon" />
				<input type="password" id="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" className="col-7"
                    value={store.inputs.password || ""} 
                    onChange={event => actions.getInput(event)} />
                {/* see password */}
                <img src={eye} alt="see password" onClick={actions.seePassword} />
			</div>
			{/* submit */}
			<div type="submit" className="card p-3 text-center bg-yellow">
				<h5>Change</h5>
			</div>
            {/* cancel */}
            <Link to="/quests">
			<div type="reset" className="card p-3 text-center bg-black" onClick={actions.resetInput}>
				<h5>Nevermind</h5>
			</div>
            </Link>
			{/* delete account */}
			<div type="submit" className="card p-3 text-center bg-red">
				<h5>Leave campaign</h5>
			</div>
		</form>
		</>
	);
};