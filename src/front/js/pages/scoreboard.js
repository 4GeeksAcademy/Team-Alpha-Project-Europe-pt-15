import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext"
import { Link } from "react-router-dom";

export const Scoreboard = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
        actions.getScoreboard()
        actions.getUserDataAndAbilities()
        actions.getBestiary()
        actions.getBackgroundColor("scoreboard")
    },[]);

	return (
		<>
		<div className="col-md-9 mx-auto p-5 gap-4 card">
			<h1>Top 10</h1>
            {/* user bar */}
            <div className="card d-flex flex-row p-3 bg-yellow">
                <h5 className="col">{store.user.name}</h5>
                <h5 className="col">{store.user.role}</h5>
                <h5 className="col">LVL {store.user.level}</h5>
                <h5 className="col">{store.bestiary.length} Beasts</h5>
            </div>
            <div className="d-flex flex-row gap-2">
                <div className="card col p-2 bg-black" data-bs-toggle="collapse" href="#TopLevel" role="button" aria-controls="TopLevel">
                    <h5>By Level</h5>
                </div>
                <div className="card col p-2 bg-black" data-bs-toggle="collapse" href="#TopBeasts" role="button" aria-controls="TopBeasts">
                    <h5>By Beasts</h5>
                </div>
            </div>
            <div id="TopBeasts" className="collapse">
                {/* beasts labels bar */}
                <div className="card d-flex flex-row p-3 bg-green">
                    <h5 className="col">Rank</h5>
                    <h5 className="col">Player</h5>
                    <h5 className="col">Role</h5>
                    <h5 className="col">Beasts</h5>
                </div>
                {/* by beasts list */}
                {store.scoreboard?.filter(player => player.email !== "").sort((a, b) => b.bestiary - a.bestiary).slice(0, 10).map((item,index)=>(
                item.id === store.user.id
                ? <div className="card d-flex flex-row my-4 p-3 bg-yellow" key={index}>
                    <h5 className="col">{index + 1}</h5>
                    <h5 className="col">{item.name}</h5>
                    <h5 className="col">{item.role}</h5>
                    <h5 className="col">{item.bestiary}</h5>
                </div>
                : <div className="card d-flex flex-row my-4 p-3" key={index}>
                    <h5 className="col">{index + 1}</h5>
                    <h5 className="col">{item.name}</h5>
                    <h5 className="col">{item.role}</h5>
                    <h5 className="col">{item.bestiary}</h5>
                </div>
                ))}
            </div>
            <div id="TopLevel" className="collapse">
                {/* level labels bar */}
                <div className="card d-flex flex-row p-3 bg-red">
                    <h5 className="col">Rank</h5>
                    <h5 className="col">Player</h5>
                    <h5 className="col">Role</h5>
                    <h5 className="col">LVL</h5>
                </div>
                {/* by level list */}
                {store.scoreboard?.filter(player => player.email !== "").sort((a, b) => b.level - a.level).slice(0, 10).map((item,index)=>(
                item.id === store.user.id
                ? <div className="card d-flex flex-row my-4 p-3 bg-yellow" key={index}>
                    <h5 className="col">{index + 1}</h5>
                    <h5 className="col">{item.name}</h5>
                    <h5 className="col">{item.role}</h5>
                    <h5 className="col">{item.level}</h5>
                </div>
                : <div className="card d-flex flex-row my-4 p-3" key={index}>
                    <h5 className="col">{index + 1}</h5>
                    <h5 className="col">{item.name}</h5>
                    <h5 className="col">{item.role}</h5>
                    <h5 className="col">{item.level}</h5>
                </div>
                ))}
            </div>
            {/* close bestiary */}
            <div className="navbar fixed-bottom py-3 d-flex justify-content-center">
                    <Link to="/quests" className="card p-3 text-center bg-black">
                        <h5>Back to questing!</h5>
                    </Link>
            </div>            
		</div>
		</>
	);
};