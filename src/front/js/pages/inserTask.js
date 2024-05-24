import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import "../../styles/insertask.css";
import { Link } from "react-router-dom";
import { exact } from "prop-types";

export const Tasker = () => {

    const { actions } = useContext(Context);

    const [taskLabel, setTaskLabel] = useState('');
    const [taskDifficulty, setTaskDifficulty] = useState('');
    const [userId, setUserId] = useState('');

    const TEST_USER_ID = 1



    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.addTask(taskLabel, TEST_USER_ID, taskDifficulty);

    };


    return <div className="container-fluid text-center h-100">
        <div className="row bg-custom-purple h-100">
            <div className="align-self-center">

                <div className="card col-lg-3 d-lg-inline-flex h-75 gap-3 m-3 p-3">

                    <div className="title mt-5">
                        <h1 className="quest text-center font-weight-bold"> New Quest</h1></div>

                    <div className="card cardLabel m-3 mb-1">Name your quest over here!
                        <textarea className="inpuTasker form-control border-0 shadow-none"
                            type="text"
                            required
                            maxLength={100}
                            value={taskLabel}
                            onChange={(e) => setTaskLabel(e.target.value)}

                        ></textarea>
                    </div>

                    <div className="dif-title mt-1 mb-0">
                        <h4 className="quest align-items-center mb-0"> Difficulty</h4>
                    </div>

                    <div className="d-flex justify-content-evenly">

                        <div className={`btn bttn{${taskDifficulty === 1 ? 'selected' : ''}`}
                            onClick={() => setTaskDifficulty(1)}
                        >Easy</div>
                        <div className={`btn bttn{${taskDifficulty === 2 ? 'selected' : ''}`}
                            onClick={() => setTaskDifficulty(2)}
                        >Medium</div>
                        <div className={`btn bttn{${taskDifficulty === 3 ? 'selected' : ''}`}
                            onClick={() => setTaskDifficulty(3)}
                        >Hard</div>
                    </div>

                    <div className="card btn bttn text-center bg-custom-yellow m-2 mt-5 mb-4 "
                        onClick={handleSubmit}
                    ><h3 className="addTaskBtn">Add it!</h3> </div>

                </div>
            </div>
        </div>
    </div>
}