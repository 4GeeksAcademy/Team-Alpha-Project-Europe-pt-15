import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import { Link } from "react-router-dom";

export const Tasker = () => {

    const { store, actions } = useContext(Context);
    const {tasks} = store;

        return <div className="container bg-primary"> 

        <div className=""></div>

        <div className="card">

        <div className="title"><h1 className="quest text-center"> New Quest</h1></div>

        <div className="card m-5">Name your quest over here</div>
        
        <div className="dif-title"><h4 className="quest text-center mt-3"> Difficulty</h4></div>

        <div className="d-flex justify-content-evenly"> 
        <div className="bttn m-2">Easy</div> 
        <div className="bttn m-2">Medium</div> 
        <div className="bttn m-2">Hard</div>
        </div>

        <div className="card text-center m-5 bg-yellow"><h3>Add it!</h3> </div>


        
        </div>

        </div>
    
}