import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const EcounterModal= ({id}) => {
    const { store, actions } = useContext(Context);
    const [isDisabled, setIsDisabled]=useState(false)
    const navigate = useNavigate()

    const handleClick=()=>{
        navigate("/bestiary")
        window.location.reload()
      
    }
    const victoryFanfarre=()=>{
    if(store.userRoll > store.creatureRoll){return store.victoryMessage}
    else {return store.defeatMessage}
    }
    const roleText=()=>{
        if(store.user.role === "Barbarian"){return store.combatText[14].text}
        if(store.user.role === "Wizard"){return store.combatText[15].text}
        if(store.user.role === "Rogue"){return store.combatText[16].text}
    }
    
    return (
        <>
            <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="card modal-content p-5">
                        {/* title */}
                        <h1>Encounter</h1>
                        <div>
                            <h4>the creature attacks with a strength of {store.creatureRoll}<br/>You defend yourself with a strength of {store.userRoll}</h4>
                        </div>
                        <div>
                            {victoryFanfarre()}
                        </div>
                        <div type="button" className="card p-3 text-center bg-yellow" data-bs-toggle="modal" data-bs-target="#encounter" onClick={()=>handleClick()}>
                            <h5>lets keep adventuring</h5>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}