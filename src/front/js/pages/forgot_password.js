import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"
import { IMAGES } from "../../img/all_images";

export const Forgot = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getBackgroundColor("forgot")
    },[]);

	return (
		<>
		<form className="col-md-4 mx-auto p-5 gap-4 card">
			<h1> Forgot password</h1>
            {/* image */}
            <img className="col-6 align-self-center" src={IMAGES.summon} alt="summon email" />
            {/* message */} 
			<h5>Let's begin the ritual of summoning thee.<br></br> You will receive and email if there is an account associated to it.</h5>
			{/* email input */}
			<div className="d-lg-flex flex-row justify-content-evenly p-2 card">
				<img src={IMAGES.email} alt="email icon" />
				<input type="text" name="email" placeholder="email" className="col-9"
					value={store.inputs.email || ""} 
					onChange={event => actions.getInput(event)}
					required/>
			</div>
			{/* submit */}
			<Link to="/login" onClick={()=>actions.forgotPassword()}>
				<div type="submit" className="card p-3 text-center bg-yellow" >
					<h5>Summon</h5>
				</div>
			</Link>
            {/* cancel */}
            <Link to="/login" type="reset" className="card p-3 text-center bg-black" onClick={actions.resetInput}>
                <h5>Back to login</h5>
            </Link>
		</form>
		</>
	);
};