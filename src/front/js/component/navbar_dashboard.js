import React, { useContext} from "react";
import { Context } from "../store/appContext";

import "../../styles/index.css";
import { Link } from "react-router-dom";

export const Navbar = (props) => {
	const { store, actions } = useContext(Context);

	return (
    <div className="navbar fixed-top d-inline px-5 py-3 bg-white">
        <div className="d-flex flex-row justify-content-between">
            <div className="d-flex flex-row gap-3">
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
            {/* log off */}
            <div className="card circle bg-black">
                    <i className="fa-solid fa-power-off"></i>
            </div>
        </div>
        {/* views */}
        <div className="card round col-lg-3 mx-auto mt-4 d-flex flex-row justify-content-evenly">
            <Link className="nav-link col-6 bg-active" to="/quests">quests</Link>
            <Link className="nav-link col-6" to="/rewards">rewards</Link>
        </div>
    </div>
	);
};