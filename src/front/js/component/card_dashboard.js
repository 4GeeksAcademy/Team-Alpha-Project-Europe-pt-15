import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";

export const DashCard =({use, id, key, label, rank, done})=>{

    const { store, actions } = useContext(Context);

    let cardColor = actions.getCardColor(use, rank, done)
    let cardIcon = actions.getCardIcon(use, rank, done)

    return (
        <>
        <div className="col" key={key}> 
            <div className="card">
            <div className={`card-header d-flex flex-row justify-content-between p-3 ${cardColor}`}>
                <div className="card circle">
                <i className={cardIcon}></i>
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