import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const DashCard =({id,label,index,rank})=>{

    const { store, actions } = useContext(Context);

    let cardClass="";
    let iconClass="";

    switch(rank){
        case 1:
            cardClass = "bg-yellow"
            iconClass = "far fa-star"
            break;
        case 2:
            cardClass = "bg-green"
            iconClass = "fas fa-star-half-alt"
            break;
        default:
            cardClass = "bg-purple"
            iconClass = "fas fa-star"
            break;
    }
    
    return (
        <>
        <div className="col" key={index}> 
            <div className="card">
            <div className={`card-header d-flex flex-row justify-content-between p-3 ${cardClass}`}>
                <div className="card circle">
                <i className={iconClass}></i>
                </div>
                <button className="card circle"
                    data-bs-toggle="modal" data-bs-target="">
                    <i className="fas fa-ellipsis-h"></i>
                </button>
            </div>               
                    <div className="card-body">
                    <p className="card-text">{label}</p>
                </div>
            </div>
        </div>
        </>
    )
}