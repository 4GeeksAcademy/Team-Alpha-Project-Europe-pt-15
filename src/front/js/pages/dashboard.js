import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css";
import "../../styles/dashboard.css";
import { Link } from "react-router-dom";

export const Dash = () => {
  const { store, actions } = useContext(Context);
  const { tasks } = store;
  const { addTask, getTask, updateTask, getUsers, getLevel, handleChange, label } = actions;

  return (
    <>
      <div className="container">
        <div className="row d-flex">
          <div className="col-sm-4 leftBar bg-custom-red">
            <div className="align-items-center">
              <img
                className="Axe"
                alt="Axe"
                src="/workspaces/Team-Alpha-Project-Europe-pt-15/src/front/img/icon_pw.png"
                ></img>
              </div>

              <div className="headerDashBoard">
              <div className="card m-2">Username: .username{store.user}</div>
              <div className="d-inline-flex">
                <div className="card m-2">Lvl: .level{store.user}</div>
                <div className="card mt-2">Role: .role{store.user}</div>
              </div>

              <div className="card mt-2">
                Energy: .energy{store.user}
                <div className="mt-2">XP: .experience{store.user}</div>
              </div>

              <div>
                <div className="card carangueijo">Bestiary</div>
                <div className="card carangueijo">Beasts</div>
                <div className="card something-else">Something Else?</div>
                </div>
                <div className="card">Edit Profile</div>
                </div>
              </div>

              <div className="col-sm-8 bg-custom-white">
               <div className="row justify-content-center">
                <div className="card toggle-button">
                    <div className="option" id="quests"> Quests</div>
                    <div className="option" id="rewards">Rewards</div>
                    <div className="slider"></div>
                  </div>
               </div>
            <div className="card">getTask(){}</div>
          </div>
        </div>
      </div>
    </>
  );
};
