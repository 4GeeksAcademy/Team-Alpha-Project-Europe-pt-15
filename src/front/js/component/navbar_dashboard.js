import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import "../../styles/index.css";
import { Link } from "react-router-dom";

import beastiary from "../../img/beast.png"

export const Navbar = ({view, modal}) => {
	const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getUserData()
    },[]);

    {/* active view css*/}
    let focusQ=""
    let focusR=""

    switch(view){
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
                    <button className="card circle" data-bs-toggle="offcanvas" data-bs-target="#Profile" aria-controls="Profile">
                        {store.user.energy >= 95
                        ? <span className="position-absolute top-1 start-100 translate-middle">
                        <i className="fa-solid fa-circle fa-beat txt-yellow"></i></span> : null}
                        <i className="fa-solid fa-user"></i>
                    </button>
                    {/* create task/reward button */}
                    <button className="card circle" data-bs-toggle="modal" data-bs-target={modal}>
                        <i className="fa-solid fa-plus"></i>
                    </button>
                    {/* clean dashboard button */}
                    <button className="card circle">
                        <i className="fa-solid fa-arrows-rotate"></i>
                    </button>
                </div>
                {/* log out */}
                <Link to="/" >
                    <button className="card circle bg-black" onClick={actions.Logout}>
                        <i className="fa-solid fa-power-off"></i>
                    </button>
                </Link>
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
                    <div className="card round col-11">
                        <div className="bg-experience" style={{height:"15px",width: store.user.experience + "%"}}></div>
                    </div>
                </div>
                <div className="d-inline-flex flex-row justify-content-between">
                    {store.user.energy >= 95
                    ? <i className="fa-solid fa-bolt fa-fade"></i>
                    : <i className="fa-solid fa-bolt"></i>}
                    <div className="card round col-11">
                        <div className="bg-energy" style={{height:"15px",width: store.user.energy + "%"}}></div>
                    </div>
                </div>
            </div>
            {/* beastiary */}
            <div className="d-flex gap-3 my-3">
                <Link to="/bestiary" className="card col-5 p-3" >
                    <div data-bs-dismiss="offcanvas">
                        <img src={beastiary} className="w-100" />
                        <h5>Beastiary</h5>
                    </div>
                </Link>
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
        {/* edit profile */}
        <div className="offcanvas-footer p-4">
            <Link to="/editprofile">
                <div className="card col p-2 bg-yellow" data-bs-dismiss="offcanvas">
                    <h5>Edit Profile</h5>
                </div>
            </Link>
        </div>
  </div>
  </>
	);
};