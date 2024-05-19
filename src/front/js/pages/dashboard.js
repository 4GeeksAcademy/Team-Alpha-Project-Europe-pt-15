import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import { Link } from "react-router-dom";


export const Dash = () => {
  const { store, actions } = useContext(Context);
  
  const {tasks} = store
  const {addTasks, getTask, getUsers } = actions



  return (
    <>
      <div className="container">
        <div className="d-flex">
          <div className="">
        <div className="mt-2">actions.getUsers</div>
        <div className="mt-2">store.Level</div>
        <div className="mt-2">store.user.roles</div>
        <div className="mt-2">barras ???</div>
        
        <div className=""><div className="carangueijo"></div><div className="something else"></div></div>
        <div className="">Edit Profile</div>
      </div>
      <div className="">
        <div className=""><div className="">quests</div><div className="">rewards</div></div>

        <div className="">actions.getTask()</div>
      </div>
      </div>
        <div className="Class bg-danger mt-2">Wizard</div>
        <div className="Title bg-light mt-2"><h1>Todo Magic task</h1></div>
        <input
          className="Tasker mt-2"
          type="text"
          onChange={(e) => store.tasks(e.target.value)}
          placeholder="Cast your task here"
          maxLength={80}
          //value={}
        />
        <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
        <label className="form-check-label">easy</label>
        </div>
        <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
        <label className="form-check-label" >medium</label>
        </div>
        <div className="form-check form-check-inline">
        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
        <label className="form-check-label" >hard</label>
        </div>

        <button type="button" className="btn btn-danger" onClick={actions.addTask}>Add Task</button>
        <button type="button" className="btn btn-danger">Fight</button>
        <button type="button" className="btn btn-warning">Edit Profile</button>
        <button type="button" className="btn btn-primary">Reward</button>
        <button type="button" className="btn btn-primary">Logout</button>

      
            
      <div className="TaskRemover mt-2">
        {actions.getTask && actions.getTask.length > 0 &&
          actions.getTask.map((task, index) => (
            <div className="ListTasks d-flex container p-0" key={index}>
              <div className="navbar navbar-light bg-light container p-4">
                <p className="Newtasks mb-0">{actions.task.label}</p>
                <span className="spanIcone">
                  <i className="fa-solid fa-ban " onClick={() => actions.updateTask(task.id)}></i>
                </span>
              </div>
            </div>
          ))}
      </div>
      </div>
    </>
  );
};












