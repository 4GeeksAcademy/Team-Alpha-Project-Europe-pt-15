import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import { Link, useNavigate } from "react-router-dom";
import { CreatureModal } from "../component/creatureModal";
import { TEXT } from "../../text/all_messages";


export const Bestiary = () =>{
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getBackgroundColor("bestiary")
    actions.getBestiary()
    },[]);
  

  const navigate = useNavigate()


  //console.log("creature info", store.creatureInfo);
  //console.log("bestiary", store.bestiary);
  //console.log(store.creatureInfo);
  

    return (
    <>
    <div className="col-md-10 mx-auto p-5 card">
    {/* title */}
    <h1>Bestiary</h1>
    {/* zero beasts */}
    {store.bestiary.length === 0
    ? <div className="col m-3 p-3"><h5>{TEXT.zeroBeasts}</h5></div>
    : null}
    {/* beasts */}
    <div className="row row-cols-1 row-cols-md-5 gy-4">
          {store.bestiary?.map((item,index)=>(
            <div className="col" key={index}>
              <div className="card p-3 gap-3" data-bs-toggle="modal" data-bs-target="#info" onClick={()=>actions.getMonsterByIndex(item.monster_name)}>
                <img src={actions.getMonsterImage(item)} className="col-8 align-self-center"/>
                <div className="card p-1 text-center bg-yellow">
                  <h6>{item.monster_name}</h6>
                </div>
              </div>
            </div>
          ))}
    </div>
    </div>
    {/* close bestiary */}
    <div className="navbar fixed-bottom py-3 d-flex justify-content-center">
      <Link to="/quests" className="card col-9 p-3 text-center bg-black">
        <h5>Back to questing!</h5>
      </Link>
    </div>   

    {store.bestiary?.map((item,index)=>(<CreatureModal id="info" key={index}/>))}
    </> 
)
}