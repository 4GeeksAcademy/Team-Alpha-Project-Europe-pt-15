import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { TEXT } from "../../text/all_messages";

export const Bestiary = () =>{
  const { store, actions } = useContext(Context);

  useEffect(() => {
    actions.getBackgroundColor("bestiary")
    },[]);
  
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
          {store.creatureInfo?.map((item,index)=>(
            <div className="col" key={index}>
              <div className="card p-3 gap-3">
                <img src={actions.getMonsterImage(item)} className="col-8 align-self-center"/>
                <div className="card p-1 text-center bg-yellow">
                  <h6>{item.name}</h6>
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
    </> 
);

}