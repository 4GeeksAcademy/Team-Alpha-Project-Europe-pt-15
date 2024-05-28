import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const EcounterModal= ({id}) => {
    const { store, actions } = useContext(Context);
    const [isDisabled, setIsDisabled]=useState(false)
    const navigate = useNavigate()

    const handleClick=()=>{
        setIsDisabled(true)
        actions.userRoll()
        setTimeout(() => {
           actions.decideVictory()
        }, "500");
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
                        <p>{actions.selectCombatText(store.encounterInfo)}</p>
                    </div>
                    <div>
                        <p>{roleText()}</p>
                        <button data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" disabled={isDisabled} onClick={()=>handleClick()}>Defend yourself</button>    
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="card modal-content p-5">
                    <h4>the creature attacks with a strength of {store.creatureRoll}<br/>
                    You defend yourself with a strength of {store.userRoll}</h4>
                    {victoryFanfarre()}
                </div>
            </div>
        </div>
            
        </>
    )
}