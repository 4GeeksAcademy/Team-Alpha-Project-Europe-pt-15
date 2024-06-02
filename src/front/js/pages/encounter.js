import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom";

import { EcounterModal } from "../component/encountermodal";


export const Encounter = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
    const [isDisabled, setIsDisabled]=useState(false)


    const handleClick=()=>{
        setIsDisabled(true)
        actions.creatureRoll()
        actions.userRoll()
        setTimeout(() => {
           actions.decideVictory()
        }, "500");
    }
  
    const handleClick2=()=>{
        navigate("/bestiary")
        window.location.reload()
    }
    const roleText=()=>{
        if(store.user.role === "Barbarian"){return store.combatText[14].text}
        if(store.user.role === "Wizard"){return store.combatText[15].text}
        if(store.user.role === "Rogue"){return store.combatText[16].text}
    }
    return (
        <>
            <div className="container">
                <div className="col-md-6 mx-auto p-5 gap-4 card">
                    <div>
                        <h1>Encounter</h1> 
                        <p>{actions.selectCombatText(store.encounterInfo)}</p>
                        <img src={actions.getMonsterImage(store.encounterInfo)} style={{width: "300px"}} className="card-img-top"/> 
                        <h6>A {store.encounterInfo?.name} appears, getting ready to attack</h6>
                        <p>{roleText()}</p>
                        <div className="d-grid gap-2">
                        <button className="card p-3 bg-yellow" data-bs-toggle="modal" data-bs-target="#encounter" onClick={()=>handleClick()} disabled={isDisabled}>
                            <h5 style={{margin:"auto"}}>Defend Yourself</h5>
                        </button>
                        </div>
                        <EcounterModal id="encounter"/>
                    </div>
                </div>   
            </div>
        </>
    )
}