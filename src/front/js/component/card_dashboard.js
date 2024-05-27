import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { TakeAction } from "./action_dashboard";

export const DashCard = ({id, view, label, tier, modal, done}) => {

    const { store, actions } = useContext(Context);

    let roleColor = actions.getRoleColor(view, tier, done)
    let roleIcon = actions.getRoleIcon(tier)

    return (
        <>
        <div className="col" key={id}> 
            <div className="card">
            <div className={`card-header d-flex flex-row justify-content-between p-3 ${roleColor}`}>
                <div className="d-flex flex-row gap-3">
                    <div className="card circle">
                    <i className={roleIcon}></i>
                    </div>
                    <TakeAction id={id} view={view} tier={tier} done={done} />
                </div>
                <button className="card circle"
                    data-bs-toggle="modal" data-bs-target={modal}>
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