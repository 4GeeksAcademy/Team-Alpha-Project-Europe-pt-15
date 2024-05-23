import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

import { Navbar } from "../component/navbar_dashboard";
import { DashCard } from "../component/card_dashboard";
import { RewardModal } from "../component/rewardModal";


export const Rewards = () => {

    const { store, actions } = useContext(Context);
   
    
    useEffect(() => {
        actions.getRewards()
        actions.getAllRarities()
    },[]);

    
    
    return (
		<>
        <Navbar use="rewards"/>
		<div className="row row-cols-1 row-cols-md-4 g-4">
			{store.rewards?.map((item,index)=>(
				<DashCard
					use="rewards"
					id={item.id}
					key={index}
					label={item.label}
					rank={item.rarity_id}
				/>
			))}
		</div>
		</>
	);
};
