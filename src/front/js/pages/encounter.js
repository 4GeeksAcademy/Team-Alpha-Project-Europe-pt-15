import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom";

import { EcounterModal } from "../component/encountermodal";


import cross_swords_encounter from "../../img/cross_swords_encounter.png"
import aberration from "../../img/aberration.png"
import beast from "../../img/beast_creature.png"
import celestial from "../../img/celestial.png"
import construct from "../../img/construct.png"
import dragon from "../../img/dragon.png"
import elemental from "../../img/elemental.png"
import fey from "../../img/fey.png"
import fiend from "../../img/fiend.png"
import giant from "../../img/giant.png"
import humanoid from "../../img/humanoid.png"
import monstrosity from "../../img/monstrosity.png"
import ooze from "../../img/ooze.png"
import plant from "../../img/plant.png"
import undead from "../../img/undead.png"


export const Encounter = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    const roleImg=()=>{
        if(store.user.role === "Barbarian"){return store.images[0]}
        if(store.user.role === "Wizard"){return store.images[1]}
        if(store.user.role === "Rogue"){return store.images[2]}
    }
    const roleDescription= ()=>{
        if(store.user.role === "Barbarian"){return store.roles[0].description}
        if(store.user.role === "Wizard"){return store.roles[1].description}
        if(store.user.role === "Rogue"){return store.roles[2].description}
    }

    const handleClick=()=>{
        navigate("/bestiary")
        window.location.reload()
    }


    return (
        <>
            <div className="container">
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                        <div className="card">
                            <img src={roleImg()} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{store.user.name}</h5>
                                <p className="card-text">{roleDescription()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card" style={{borderWidth: "0", boxShadow:"none"}}>
                            <img src={cross_swords_encounter} className="card-img-top" alt="..."/>
                            <div className="card-body">
                            {/* this button is for testing */}  
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#encounter" onClick={()=>actions.creatureRoll()} >Start Ecounter</button>
                            <EcounterModal id="encounter"/>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card">
                            <img src={actions.getMonsterimage(store.encounterInfo,aberration,beast,celestial,construct,dragon,elemental,fey,fiend,giant,humanoid,monstrosity,ooze,plant,undead)} className="card-img-top" alt="..."/>
                            <div className="card-body">
                                <h5 className="card-title">{store.encounterInfo?.name}</h5>
                                <p className="card-text">{store.encounterInfo?.desc}</p>
                            </div>
                        </div>
                    </div>  
                </div>
                <button onClick={()=>handleClick()}>Lets go back to the bestiary</button>
            </div>
        </>
    )
}