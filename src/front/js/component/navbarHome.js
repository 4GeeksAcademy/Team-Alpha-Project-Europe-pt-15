import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { IMAGES } from "../../img/all_images";


export const NavbarHome = () => {
    const navigate = useNavigate()


    return (
        <>
        <nav className="navbar sticky-top bg-dark" data-bs-theme="dark" style={{borderRadius: "10px"}}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#">
                <img src={IMAGES.logo} alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>
                TaskSlayer
                </a>
                <button className="btn btn-primary" type="submit" onClick={()=>navigate("/login")}>Log in</button>
            </div>
        </nav>
        </>
    )
}