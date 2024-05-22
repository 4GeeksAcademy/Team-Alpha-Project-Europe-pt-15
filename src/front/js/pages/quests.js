import React, { useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/index.css";
import { Navbar } from "../component/navbar_dashboard";
import { DashCard } from "../component/card_dashboard";

export const Quests = () => {
	const { store, actions } = useContext(Context);

	useEffect(()=>{
        actions.getTaskList()
    },[]);

	return (
		<>
        <Navbar />
		<div className="row row-cols-1 row-cols-md-4 g-4">
			{store.tasks?.map((item,index)=>(
				<DashCard
					id={item.id}
					label={item.label}
					key={index}
					rank={item.task_difficulty_id}
				/>
			))}
		</div>
		</>
	);
};