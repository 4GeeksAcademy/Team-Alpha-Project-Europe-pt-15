import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { TEXT } from "../../text/all_messages";

import { Navbar } from "../component/navbar_dashboard";
import { DashCard } from "../component/card_dashboard";
import { AddEditModal } from "../component/add_edit_modal_dashboard";

export const Quests = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
        actions.getTaskList()
		actions.getBackgroundColor("quests")
		actions.decideEncounter()
		actions.getEncounterInfo()

    },[]);

    let view = "tasks"
	let idCreateModal = "createTask"
    
    return (
		<>
		{/* navigation */}
        <Navbar
			view={view}
			modal={`#${idCreateModal}`}
		/>
		<div className="dashboard card col p-4">
			{/* no rewards message */}
			{store.tasks?.length === 0
			?<div className="card col-lg-6 p-3 mx-auto mb-4"><h5>{TEXT.zeroQuests}</h5></div>
			: null}
			{/* list */}
			<div className="row row-cols-1 row-cols-md-4 g-4">
				{store.tasks?.map((item,index)=>(
					<DashCard key={index}
						id={item.id}
						view={view}
						label={item.label}
						tier={item.task_difficulty_id}
						modal={`#${item.id}`}
						done={item.done}
					/>
				))}
			</div>
		</div>
		{/* create quest */}
		<AddEditModal
			id={idCreateModal}
			view={view}
			label="New Quest"
			tier={store.difficulties}
		/>
		{/* edit quest */}
		{store.tasks?.map((item,index)=>(
		<AddEditModal key={index}
			id={item.id}
			view={view}
			label="Edit Quest"
			tier={store.difficulties}
		/>
		))}
		</>
	);
};