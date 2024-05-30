import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import "./styles.css";

const DifficultyButton = ({ taskDifficulty, setTaskDifficulty, number, text, icone }) => {
    const isThisSelected = number == taskDifficulty
    const backgroundColor = isThisSelected ? "black" : "white"
    const textColor = isThisSelected ? "white" : "black"


    return <button className={"btnDif card btn "} style={{ backgroundColor }}
        onClick={() => setTaskDifficulty(number)}
    >
        <div className=" btn-content">
            <i className={icone} style={{ color: textColor }}></i>
            <div className={`label `} style={{ color: textColor }}>{text}</div>
        </div>

    </button>
}



const DifficultyButtons = ({ taskDifficulty, setTaskDifficulty }) => {

    return <>
        <div className="dif-title mt-1 mb-0">
            <h4 className="quest align-items-center mb-0"> Difficulty</h4>
        </div>

        <div className="d-flex justify-content-evenly difSelector">

            <DifficultyButton taskDifficulty={taskDifficulty} setTaskDifficulty={setTaskDifficulty} number={1} text="Easy" icone={"fa-regular fa-star"} />
            <DifficultyButton taskDifficulty={taskDifficulty} setTaskDifficulty={setTaskDifficulty} number={2} text="Medium" icone={"fa-solid fa-star-half-stroke"} />
            <DifficultyButton taskDifficulty={taskDifficulty} setTaskDifficulty={setTaskDifficulty} number={3} text="Hard" icone={"fa-solid fa-star"} />

        </div>
    </>

}

export default DifficultyButtons