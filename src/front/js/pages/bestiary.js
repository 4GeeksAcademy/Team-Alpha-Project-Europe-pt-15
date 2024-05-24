import React, { useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";
import { Navbar } from "../component/navbar_dashboard";
import { useNavigate } from "react-router-dom";

import aberration from "../../img/aberration.jpg"
import beast from "../../img/beast.jpg"
import celestial from "../../img/celestial.jpg"
import construct from "../../img/construct.jpg"
import dragon from "../../img/dragon.jpg"
import elemental from "../../img/elemental.jpg"
import fey from "../../img/fey.jpg"
import fiend from "../../img/fiend.jpg"
import giant from "../../img/giant.jpg"
import humanoid from "../../img/humanoid.jpg"
import monstrosity from "../../img/monstrosity.jpg"
import ooze from "../../img/ooze.jpg"
import plant from "../../img/plant.jpg"
import undead from "../../img/undead.jpg"



export const Bestiary = () =>{

    const { store, actions } = useContext(Context);
    const navigate = useNavigate()
  


    return (
    <>
     <div className="container">
        <Navbar />
        <div className="row row-cols-1 row-cols-md-5 g-4">
            {store.bestiary?.map((item,index)=>(
              <div className="col" key={index}>
                  <div className="card p-2">
                  <img src="..." className="card-img-top monsterImage" alt="..."/>
                  <div className="card-body">
                    <h5 className="card-title">{item.monster_name}</h5>
                  </div>
                </div>
              </div>
            ))}
            <button onClick={()=>actions.decideVictory(20,1)}>encounter</button>
            <button onClick={()=>actions.getCreatureType()}>haha</button>
        </div>
     </div>
    </>
);

}