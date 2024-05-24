import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const DashCard = ({view, id, label, tier, modal, done}) => {

    const { store, actions } = useContext(Context);

    let cardColor = actions.getCardColor(view, tier, done)
    let cardIcon = actions.getCardIcon(view, tier, done)

    return (
        <>
        <div className="col" key={id}> 
            <div className="card">
            <div className={`card-header d-flex flex-row justify-content-between p-3 ${cardColor}`}>
                <div className="card circle">
                <i className={cardIcon}></i>
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