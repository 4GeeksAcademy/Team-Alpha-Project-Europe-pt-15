import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import "../../styles/insertask.css";
import { Link } from "react-router-dom";

export const Tasker = () => {

    const { store, actions } = useContext(Context);
    const {tasks} = store;
      
  
    const {addTask, getTask, updateTask, getUsers, getLevel, handleChange, label } = actions;

    const handleSubmit = (e) => {
		e.preventDefault();
		actions.addTask(label, userId, taskDifficultyId);
	};

        return <div className="container-fluid text-center"> 
            <div className="row bg-custom-purple">
             <div className="col h-100 align-self-center">

            <div className="card col-lg-3 d-lg-inline-flex m-3 gap-3 card">

            <div className="title"><h1 className="quest text-center font-weight-bold"> New Quest</h1></div>

            <div className="card">Name your quest over here!
            <textarea className="inpuTasker form-control border-0 shadow-none"
            type="text"
            required
            //maxLength={}
            //value={label}
            //onChange={(e) => setTaskLabel(e.target.value)}

            ></textarea>
            </div>
        
            <div className="dif-title"><h4 className="quest align-items-center mb-0 mt-3"> Difficulty</h4></div>

            <div className="d-flex justify-content-evenly"> 
        
            <div className="btn bttn"
            //onclick={() => setTaskDifficulty("Easy")}
            >Easy</div> 
            <div className="btn bttn"
            //onclick={() => setTaskDifficulty("Medium")}
            >Medium</div> 
            <div className="btn bttn"
            //onclick={() => setTaskDifficulty("Hard")}
            >Hard</div>
            </div>

            <div className="btn bttn text-center bg-custom-yellow m-2 mt-3"
            onclick={handleSubmit}
            ><h3 className="addTaskBtn">Add it!</h3> </div>


        
            </div>
        </div>
    </div>
</div>
}