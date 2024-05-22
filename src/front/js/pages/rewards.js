import React, { useContext, useEffect} from "react";
import { Context } from "../store/appContext";

import { Navbar } from "../component/navbar_dashboard";
import { DashCard } from "../component/card_dashboard";
import { RewardModal } from "../component/rewardModal";


export const Rewards = () => {

    const { store, actions } = useContext(Context);
   
    
    useEffect(()=>{
        actions.getRewards()
        actions.getAllRarities()
    },[]);

    
    
    return (
		<>
        <Navbar />
		<div className="row row-cols-1 row-cols-md-4 g-4">
			{store.rewards?.map((item,index)=>(
				<DashCard
					id={item.id}
					label={item.label}
					key={index}
					rank={item.rarity_id}
				/>
			))}
		</div>
		</>
	);
};

//<RewardModal modalId="createReward" modalTittel="New Loot" placeholder="Here you can enter a new reward in to your loot table, these are incentives to get you motivated to finish your tasks, remember to chosee the rarity of your loot acording with the value it has to you and how hard it is to get."/>
