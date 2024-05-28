import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext"
import "../../styles/index.css"
import { IMAGES } from "../../img/all_images";

export const ProfileEdit = () => {
	const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getUserDataAndAbilities()
		actions.getRoles()
    },[]);

	return (
		<>
		<form onSubmit={actions.Login} className="col-xl-5 mx-auto p-5 gap-4 card">
			<h1>How may I assist you oh powerful one?</h1>
            {/* username */}
			<div className="d-inline-flex flex-row justify-content-evenly p-2 card">
				<img src={IMAGES.user} alt="user icon" />
				<input type="text" name="name" placeholder={store.user.name} className="col-9"
                    value={store.inputs.name || ""} 
                    onChange={event => actions.getInput(event)} />
			</div>
			{/* email */}
			<div className="d-inline-flex flex-row justify-content-evenly p-2 card">
				<img src={IMAGES.email} alt="email icon" />
				<input type="text" name="email" placeholder={store.user.email} className="col-9"
                    value={store.inputs.email || ""} 
                    onChange={event => actions.getInput(event)} />
			</div>
			{/* password */}
			<div className="d-inline-flex flex-row justify-content-evenly p-2 card">
				<img src={IMAGES.password} alt="email icon" />
				<input type="password" id="password" name="password" placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;" className="col-7"
                    value={store.inputs.password || ""} 
                    onChange={event => actions.getInput(event)} />
                {/* see password */}
                <img src={IMAGES.see_password} alt="see password" onClick={actions.seePassword} />
			</div>
            {/* role */}
			<select className="form-select card mb-2"
                name="role"
                value={store.inputs.role || ""}
        	    onChange={event => actions.getInput(event)}>
                    <option value={0} default >Change role?</option>
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
			<div type="button" className="card p-3 text-center bg-red text-light" data-bs-toggle="modal" data-bs-target="#accDelete">
				<h5>Leave campaign</h5>
			</div>
		</form>

		{/* confirm delete account modal */}
		<div className="modal fade" id="accDelete" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="card modal-content p-4">
                    {/* title */}
                    <h1>Delete account? <br></br>Destroy it?</h1>                 
                    <div className="modal-body d-flex flex-column gap-4">
						{/* image */} 
                        <img className="col-6 align-self-center" src={IMAGES.volcano} alt="mount doom" />
						{/* message */} 
						<div>
							<h5>The account was made in the flames of Mount Doom. Only there can it be unmade....</h5>
						</div>                    
                        {/* delete */}
						<Link to="/" >
							<div type="submit" className="card p-2 text-center bg-yellow" data-bs-dismiss="modal" onClick={actions.deleteUser}>
								<h5>I will take it</h5>
							</div>
						</Link>
                        {/* cancel */}
                        <div type="reset" className="card p-2 text-center bg-black" data-bs-dismiss="modal">
                            <h5>One does not simply walk into Mordor</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		</>
	);
};