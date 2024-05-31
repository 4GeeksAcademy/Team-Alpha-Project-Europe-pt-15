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
	let idCreateModal = "createReward"
    
    return (
		<>
		{/* navigation */}
        <Navbar
			view={view}
			modal={`#${idCreateModal}`}
		/>
		{/* list */}
		<div className="dashboard row row-cols-1 row-cols-md-4 g-4">
			{store.rewards?.filter(item => item.done === false).map((item,index)=>(
				<DashCard key={index}
					id={item.id}
					view={view}
					label={item.label}
					tier={item.rarity_id}
					modal={`#${item.id}`}
				/>
			))}
		</div>
		{/* create reward */}
		<DashModal
			id={idCreateModal}
			view={view}
			label="New Reward"
			tier={store.rarities}
		/>
		{/* edit reward */}
		{store.rewards?.map((item,index)=>(
		<DashModal key={index}
			id={item.id}
			view={view}
			label="Edit Reward"
			tier={store.rarities}
		/>
		))}
		</>
	);
};
