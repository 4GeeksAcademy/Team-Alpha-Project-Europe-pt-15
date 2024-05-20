import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import { Link } from "react-router-dom";


export const Dash = () => {
  const { store, actions } = useContext(Context);
  
  const {tasks} = store;
  const {addTasks, getTask, updateTask, getUsers, getLevel, handleChange, label } = actions;
  //user for test
  const user = 1


  return (
    <>
      <div className="container">
        <div className="d-flex ">
        
        <div className="card bg-red">
        <div className="m-2">{store.user[id]}</div>
        <div className="m-2">{store.user.Level}</div>
        <div className="mt-2">{store.user.roles}</div>
        <div className="mt-2">{store.user.energy}</div>
        <div className="mt-2">{store.user.experience}</div>
        
        <div className=""><div className="carangueijo"></div><div className="something else"></div></div>
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












