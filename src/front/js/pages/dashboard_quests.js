import React, { useContext, useEffect} from "react";
import { Context } from "../store/appContext";

import "../../styles/index.css";

export const Quests = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		
	},[])

	return (
    <div className="navbar d-lg-flex justify-content-between">
		<div className="d-inline-flex column-gap-3">
            {/* profile button */}
            <div className="card circle">
                <i className="fa-solid fa-user"></i>
            </div>
            {/* add task button */}
            <div className="card circle">
                <i className="fa-solid fa-plus"></i>
            </div>
            {/* clean dashboard button */}
            <div className="card circle">
                <i className="fa-solid fa-arrows-rotate"></i>
            </div>
        </div>
        {/* views */}
        <div className="card circle">
                
        </div>
        {/* log off */}
        <div className="card circle bg-black">
                <i className="fa-solid fa-power-off"></i>
        </div>
    </div>
	);
};