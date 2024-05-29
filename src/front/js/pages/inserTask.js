
import React from "react";
import "../../styles/index.css";

import CreateTaskCard from "../component/CreateTaskCard"

export const Tasker = () => {

    return <div className="container-fluid h-100" style={{ backgroundColor: "#9111F2" }}>
        <div className="row h-100 align-items-center justify-content-center">
            <div className=" col-auto">
                <CreateTaskCard />
            </div>
        </div>
    </div>
}