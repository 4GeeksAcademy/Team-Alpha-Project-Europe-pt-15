import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/index.css";
import { Navbar } from "../component/navbar_dashboard";
import { DashCard } from "../component/card_dashboard";

export const Quests = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
        actions.getTaskList()
    },[]);

	return (
		<>
        <Navbar use="tasks"/>
		<div className="row row-cols-1 row-cols-md-4 g-4">
			{store.tasks?.map((item,index)=>(
				<DashCard
					use="tasks"
					id={item.id}
					key={index}
					label={item.label}
					rank={item.task_difficulty_id}
					done={item.done}
				/>
			))}
		</div>
		</>
	);
};