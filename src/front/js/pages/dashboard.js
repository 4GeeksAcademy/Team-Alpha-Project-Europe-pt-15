import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import "../../styles/dashboard.css";
import { Link } from "react-router-dom";


export const Dash = () => {
  const { store, actions } = useContext(Context);
  
  const {tasks} = store;
  const {addTasks, getTask, updateTask, getUsers, getLevel, handleChange, label } = actions;
 


  return (
    <>
      <div className="container">
        <div className="d-flex ">
        
        <div className="card bg-red">
        <div className="m-2">username{store.user}</div>
        <div className="m-2">Lvl{store.user.Level}</div>
        <div className="mt-2">Role{store.user.roles}</div>
        <div className="mt-2">energy{store.user.energy}</div>
        <div className="mt-2">xp{store.user.experience}</div>
        
        <div className="">
          <div className="carangueijo"></div>
        <div className="something else"></div></div>
        <div className="">Edit Profile</div>
        </div>
        <div className="">
        <div className=""><div className="">quests</div><div className="">rewards</div></div>

        <div className="">actions.getTask()</div>
        </div>
      
        </div>

      
      </div>
    </>
  );
};












