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
		actions.getRoles()
    },[]);

	return (
		<>
		<form onSubmit={actions.Login} className="col-xl-5 mx-auto p-5 gap-4 card">
			<h1>How may I assist you oh powerful one?</h1>
            {/* username */}
			<div className="d-inline-flex flex-row justify-content-evenly p-2 card">
				<img src={user} alt="user icon" />
				<input type="text" name="name" placeholder={store.user.name} className="col-9"
                    value={store.inputs.name || ""} 
                    onChange={event => actions.getInput(event)} />
			</div>
			{/* email */}
			<div className="d-inline-flex flex-row justify-content-evenly p-2 card">
				<img src={email} alt="email icon" />
				<input type="text" name="email" placeholder={store.user.email} className="col-9"
                    value={store.inputs.email || ""} 
                    onChange={event => actions.getInput(event)} />
			</div>
			{/* password */}
			<div className="d-inline-flex flex-row justify-content-evenly p-2 card">
				<img src={password} alt="email icon" />
				<input type="password" id="password" name="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" className="col-7"
                    value={store.inputs.password || ""} 
                    onChange={event => actions.getInput(event)} />
                {/* see password */}
                <img src={eye} alt="see password" onClick={actions.seePassword} />
			</div>
            {/* role */}
			<select className="form-select card mb-2"
                name="role"
                value={store.inputs.role || ""}
        	    onChange={event => actions.getInput(event)}>
                    <option value={0} default >Change class?</option>
                    {/* tier options */}
                    {store.roles?.map( item => (
                    <option value={item.id} key={item.id}>{item.name}</option>
                    ))}
            </select>
			{/* submit */}
			<Link to="/quests" >
				<div type="button" className="card p-3 text-center bg-yellow" onClick={actions.updateUser}>
					<h5>Change</h5>
				</div>
			</Link>
            {/* cancel */}
            <Link to="/quests">
			<div type="reset" className="card p-3 text-center bg-black" onClick={actions.resetInput}>
				<h5>Nevermind</h5>
			</div>
            </Link>
			{/* delete account */}
			<div type="button" className="card p-3 text-center bg-red" data-bs-toggle="modal" data-bs-target="#accDelete">
				<h5>Leave campaign</h5>
			</div>
		</form>

		{/* confirm delete account modal */}
		<div className="modal fade" id="accDelete" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="card modal-content p-4">
                    {/* title */}
                    <h1>Delete account? <br></br>Are you sure?</h1>                 
                    <div className="modal-body d-flex flex-column gap-4">
						{/* message */} 
						<div>
							<h5>I'm glad to be with you, {store.user.name}. Here at the end of all things.</h5>   
							<p>But like... really sure?</p>
						</div>                    
                        {/* delete */}
						<Link to="/" >
							<div type="submit" className="card p-2 text-center bg-yellow" data-bs-dismiss="modal" onClick={actions.deleteUser}>
								<h5>It is time</h5>
							</div>
						</Link>
                        {/* cancel */}
                        <div type="reset" className="card p-2 text-center bg-black" data-bs-dismiss="modal">
                            <h5>I would never</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		</>
	);
};