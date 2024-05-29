import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import DifficultyButtons from "./DifficultyButtons"

import "./styles.css";
import "../../../styles/index.css";

const CreateTaskCard = () => {

    const { actions } = useContext(Context);

    const [taskLabel, setTaskLabel] = useState('');
    const [taskDifficulty, setTaskDifficulty] = useState(0);

    const TEST_USER_ID = 1

    const handleSubmit = async (e) => {
        e.preventDefault();
        await actions.addTask(taskLabel, TEST_USER_ID, taskDifficulty);
    };

    return <form className="card mainCard  h-75 gap-3 m-3 p-3  ">

        <div className="title mt-5">

            <h1 className="quest text-center font-weight-bold"> New Quest</h1></div>

        <div className="card cardLabel m-3 mb-1">
            <textarea className="inpuTasker form-control border-0 shadow-none"
                type="text"
                required
                maxLength={100}
                value={taskLabel}
                onChange={(e) => setTaskLabel(e.target.value)}
                placeholder="Name your quest over here!"

            ></textarea>
        </div>


        <DifficultyButtons taskDifficulty={taskDifficulty} setTaskDifficulty={setTaskDifficulty} />

        <div className="addTask card btn bttn text-center bg-custom-yellow m-4 mt-5 mb-4 "
            onClick={handleSubmit}
        ><h3 className="addTaskBtn">Add it!</h3> </div>

    </form>

}

export default CreateTaskCard