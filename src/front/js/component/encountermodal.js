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
    return (
        <>
          <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="card modal-content p-5">
                    {/* title */}
                    <h1>Encounter</h1>
                    <div>
                        <p>this is te text that opens the encounter depending on the monster type</p>
                    </div>
                    <div>
                        <p>this is the text that shows depending on your role</p>
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