import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import "../../styles/insertask.css";
import { Link } from "react-router-dom";

export const Tasker = () => {

    const { store, actions } = useContext(Context);
    const { task, difficulty } = store;

    const [experience, setExperience] = useState(null);
    const [energy, setEnergy] = useState(null);
    const [taskLabel, setTaskLabel] = useState('');
    const [taskDifficulty, setTaskDifficulty] = useState('');
    const [userId, setUserId] = useState('');

    const { addTask, getTask, updateTask, getUsers, getLevel, handleChange, label } = actions;


    const handleSubmit = (e) => {
        e.preventDefault();

        const difficultyLevels = {
            easy: 12,
            medium: 24,
            hard: 60,
        };

        const value = difficultyLevels[taskDifficulty];

        if (value) {
            store.difficulty(value);
            setExperience(value);
            setEnergy(value);
            store.energy();
            store.experience();
        }

        if (taskLabel && taskDifficulty) {
            actions.addTask(taskLabel, userId, taskDifficulty);
            console.log(taskLabel);
        } else {
            alert("Please fill in all fields.");
        }
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
                            maxLength={100}
                            value={taskLabel}
                            onChange={(e) => setTaskLabel(e.target.value)}

                        ></textarea>
                    </div>

                    <div className="dif-title"><h4 className="quest align-items-center mb-0 mt-3"> Difficulty</h4></div>

                    <div className="d-flex justify-content-evenly">

                        <div className={`btn bttn{${taskDifficulty === 'Easy' ? 'selected' : ''}`}
                            onClick={() => setTaskDifficulty("Easy")}
                        >Easy</div>
                        <div className={`btn bttn{${taskDifficulty === 'Medium' ? 'selected' : ''}`}
                            onClick={() => setTaskDifficulty("Medium")}
                        >Medium</div>
                        <div className={`btn bttn{${taskDifficulty === 'Hard' ? 'selected' : ''}`}
                            onClick={() => setTaskDifficulty("Hard")}
                        >Hard</div>
                    </div>

                    <div className="btn bttn text-center bg-custom-yellow m-2 mt-3"
                        onClick={handleSubmit}
                    ><h3 className="addTaskBtn">Add it!</h3> </div>



                </div>
            </div>
        </div>
    </div>
}