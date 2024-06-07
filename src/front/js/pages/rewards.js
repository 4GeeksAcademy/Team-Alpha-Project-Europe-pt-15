import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext"
import { TEXT } from "../../text/all_messages";

import { Navbar } from "../component/navbar_dashboard";
import { DashCard } from "../component/card_dashboard";
import { AddEditModal } from "../component/add_edit_modal_dashboard";


export const Rewards = () => {
    const { store, actions } = useContext(Context);
   
    useEffect(() => {
        actions.getRewardList()
		actions.getBackgroundColor("rewards")
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
		<div className="dashboard card col p-4">
			{/* no rewards message */}
			{store.rewards?.length === 0
			?<div className="card col-lg-6 p-3 mx-auto mb-4"><h5>{TEXT.zeroRewards}</h5></div>
			: null}
			{/* list */}
			<div className="row row-cols-1 row-cols-md-4 g-4">
				{store.rewards?.map((item,index)=>(
					<DashCard key={index}
						id={item.id}
						view={view}
						label={item.label}
						tier={item.rarity_id}
						modal={`#${item.id}`}
					/>
				))}
			</div>
		</div>
		{/* create reward */}
		<AddEditModal
			id={idCreateModal}
			view={view}
			label="New Reward"
			tier={store.rarities}
		/>
		{/* edit reward */}
		{store.rewards?.map((item,index)=>(
		<AddEditModal key={index}
			id={item.id}
			view={view}
			label="Edit Reward"
			tier={store.rarities}
		/>
		))}
		</>
	);
};
