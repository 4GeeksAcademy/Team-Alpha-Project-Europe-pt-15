import React, { useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar_dashboard";
import { useNavigate } from "react-router-dom";

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

export const Bestiary = () =>{

    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

  const handleClick=()=>{
    actions.decideEncounter(10,1)
    actions.getEncounterInfo()
    setTimeout(() => navigate("/encounter"), "500")
  }
  
    return (
    <>
     <div className="container">
      <div className="d-grid gap-2">
        <button className="card p-3 bg-yellow" data-bs-toggle="modal" data-bs-target="#encounter" onClick={()=>navigate("/quests")}>
                            <h5 style={{margin:"auto"}}>lets go back to questing!</h5>
        </button>
      </div>
      <div className="row row-cols-1 row-cols-md-1 g-4"  style={{marginTop:"10px"}}>
        <div className="card">
          <div className="row row-cols-1 row-cols-md-5 g-4" style={{marginTop:"30px", marginBottom:"30px"}}>
            {store.creatureInfo?.map((item,index)=>(
              <div className="col" key={index}>
                  <div className="card">
                  <img src={actions.getMonsterimage(item,aberration,beast,celestial,construct,dragon,elemental,fey,fiend,giant,humanoid,monstrosity,ooze,plant,undead)} className="card-img-top monsterImage" alt="..."/>
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                  </div>
                </div>
              </div>
            ))}
            </div>
            </div>
        </div>
        <button onClick={()=>handleClick()}> encounter</button>
     </div>
    </> 
);

}