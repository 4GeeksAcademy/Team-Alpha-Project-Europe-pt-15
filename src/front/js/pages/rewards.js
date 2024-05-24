import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.css"

import { Navbar } from "../component/navbar_dashboard";
import { DashCard } from "../component/card_dashboard";
import { DashModal } from "../component/modal_dashboard";


export const Rewards = () => {

    const { store, actions } = useContext(Context);
   
    useEffect(() => {
        actions.getRewardList()
		actions.getRarities()
    },[]);

    let view = "rewards"
	let createModal = "createReward"
	let editModal = "editReward"
    
    return (
		<>
		{/* navigation */}
        <Navbar
			view={view}
			modal={`#${createModal}`}
		/>
		{/* list */}
		<div className="dashboard row row-cols-1 row-cols-md-4 g-4">
			{store.rewards?.map((item,index)=>(
				<DashCard key={index}
					view={view}
					id={item.id}
					label={item.label}
					tier={item.rarity_id}
					modal={`#editModal${item.id}`}
				/>
			))}
		</div>
		{/* create reward */}
		<DashModal
			id={createModal}
			label="New Reward"
			tier={store.rarities}
			submit={actions.createReward}
			delete={actions.delete}
		/>
		{/* edit reward */}
		{store.rewards?.map((item,index)=>(
		<DashModal
			id={`#editModal${item.id}`}
			label="Edit Reward"
			tier={store.rarities}
			submit=""
		/>
		))}
		</>
	);
};
