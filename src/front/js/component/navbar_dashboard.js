import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

import "../../styles/index.css";
import { Link } from "react-router-dom";

import beastiary from "../../img/beast.png"

export const Navbar = ({use}) => {
	const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getUserData()
    },[]);

    let focusQ=""
    let focusR=""

    switch(use){
        case "rewards":
            focusQ = null
            focusR = "bg-active"
            break;
        default:
            focusQ = "bg-active"
            focusR = null
            break;
    }

	return (
    <>
    <div className="navbar fixed-top d-inline px-5 py-3 bg-white">
        <div className="d-flex flex-row justify-content-between">
                <div className="d-flex flex-row gap-3">
                    {/* profile button */}
                    <div className="card circle" data-bs-toggle="offcanvas" data-bs-target="#Profile" aria-controls="Profile">
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
                {/* log out */}
                <div className="card circle bg-black">
                    <i className="fa-solid fa-power-off"></i>
                </div>
        </div>
        {/* views */}
        <div className="card round col-lg-3 mx-auto mt-4 d-flex flex-row justify-content-evenly">
            <Link className={`nav-link col-6 ${focusQ}`} to="/quests">quests</Link>
            <Link className={`nav-link col-6 ${focusR}`} to="/rewards">rewards</Link>
        </div>
    </div>

    
    {/* profile */}
    <div className="offcanvas offcanvas-start p-3 bg-red" tabIndex="-1" id="Profile">
        <div className="offcanvas-header d-flex justify-content-end">
            {/* close button */}
            <div className="card circle bg-black" data-bs-dismiss="offcanvas">
                <i className="fa-solid fa-xmark"></i>
            </div>
        </div>
        <div className="offcanvas-body text-center">
            {/* image */}
                <img className="col-5 mb-3" src={store.images[store.user.user_role - 1]} />
            {/* name */}
            <div className="card col my-3 p-2">
                <h5>{store.user.name}</h5>
            </div>
            <div className="d-flex flex-row gap-3 my-3">
                {/* level */}
                <div className="card col p-2">
                    <h5>LVL {store.user.level}</h5>
                </div>
                {/* role */}
                <div className="card col p-2">
                    <h5>{store.user.role}</h5>
                </div>
            </div>
            {/* experience + energy */}
            <div className="card col-12 gap-3 p-3 my-3">
                <div className="d-inline-flex flex-row justify-content-between">
                    <i className="fa-solid fa-forward"></i>
                    <div className="card round col-11"></div>
                </div>
                <div className="d-inline-flex flex-row justify-content-between">
                    <i className="fa-solid fa-bolt"></i>
                    <div className="card round col-11"></div>
                </div>
            </div>
            {/* beastiary */}
            <div className="d-flex gap-3 my-3">
                <div className="card col-5 p-3">
                    <img src={beastiary} />
                    <h5>Beastiary</h5>
                </div>
                {/* count */}
                <div className="col">
                    <div className="card p-1">
                        <h5>loading...</h5>
                    </div>
                    <div className="card my-3 p-1">
                        <h5>loading...</h5>
                    </div>
                    <div className="card p-1">
                        <h5>loading...</h5>
                    </div>
                </div>
            </div>
        </div>
        <div className="offcanvas-footer p-4">
            <div className="card col p-2 bg-yellow">
                <h5>Edit Profile</h5>
            </div>
        </div>
  </div>
  </>
	);
};