import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/index.css";
import { Navbar } from "../component/navbar_dashboard";
import { DashCard } from "../component/card_dashboard";
import { DashModal } from "../component/modal_dashboard";

export const Quests = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
        actions.getTaskList(1)
		//actions.getDifficulties()
    },[]);

    let view = "tasks"
	let createModal = "createQuest"
	let editModal = "editQuest"
    
    return (
		<>
		{/* navigation */}
        <Navbar
			view={view}
			modal={`#${createModal}`}
		/>
		{/* list */}
		<div className="dashboard row row-cols-1 row-cols-md-4 g-4">
			{store.tasks?.map((item,index)=>(
				<DashCard key={index}
					view={view}
					id={item.id}
					label={item.label}
					tier={item.task_difficulty_id}
					done={item.done}
					modal={`#${editModal}`}
				/>
			))}
		</div>
		{/* create quest */}
		<DashModal
			id={createModal}
			label="New Quest"
			tier={store.difficulties}
			submit=""
		/>
		{/* edit quest */}
		<DashModal
			id={editModal}
			label="Edit Quest"
			tier={store.difficulties}
			submit=""
		/>
		</>
	);
};