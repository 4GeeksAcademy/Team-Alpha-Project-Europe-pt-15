import React from "react";
//import iconUser from '../../img/icon_user.png';

// import "../../../styles/index.css";
// import "../../../styles/dashboard.css";
import "./styles.css";


export const UserPanel = (props) => {
    const { user } = props


    return (


        <div className="user-panel">
            <div className="imageRole">
                
                <i className="fa-solid fa-remove icone btn"></i>
                <div className="img align-items-center">
                    <img />
                </div>

                <div className="headerDashBoard">

                    <div className="card card-userName">Username Player1: {user?.name}</div>
                    <div className="lvl-role">
                        <div className="card card-lvl">Lvl {user?.level}</div>
                        <div className="card card-role">Role {user?.user_role}</div>
                    </div>

                    <div className="card card-user-power">
                        <div className="energy">Energy {user?.energy}</div>
                        <div className="exp">Xp {user?.experience}</div>
                    </div>

                    <div>
                        <div className="beast-board">
                            <div className="card card-bestiary"></div>
                            <div className="set-beast-else">
                                <div className="card card-beast">Beasts</div>
                                <div className="card card-something-else">Something Else?</div>
                            </div></div></div>
                    <div className="card card-edit">Edit Profile</div>
                </div>
            </div>


        </div>


    );
};
