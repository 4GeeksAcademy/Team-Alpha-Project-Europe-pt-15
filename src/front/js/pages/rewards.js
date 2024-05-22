import React, { useContext, useEffect} from "react";
import { Context } from "../store/appContext";

import { RewardCard } from "../component/rewardCard";

import { RewardModal } from "../component/rewardModal";
import { Navbar } from "../component/navbar_dashboard";


export const Rewards = () => {

    const { store, actions } = useContext(Context);
   
    
    useEffect(()=>{
        actions.getRewards(1)
        actions.getAllRarities()
    },[]);

    
    
    return (
        <>
            <Navbar />
            <div className="row row-cols-1 row-cols-md-4 g-4" style={{marginTop:"3%"}}>
                {store.rewards?.map((item,index)=>(
                    <RewardCard label={item.label} key={index} rarityId={item.rarity_id} id={item.id}/>
                ))}
                <RewardModal modalId="createReward" modalTittel="New Loot" placeholder="Here you can enter a new reward in to your loot table, these are incentives to get you motivated to finish your tasks, remember to chosee the rarity of your loot acording with the value it has to you and how hard it is to get."/>
            </div>
        </>
    )
};

/*
            <div className="mx-auto p-2" style={{marginTop:"5%"}}>
                <div style={{display:"flex", justifyContent:"center"}}><button className="bttn p-3 bg-black text-white">Actions</button></div>
                <div style={{display:"flex", justifyContent:"center", marginTop:"30px"}}>
                    <button type="button" className="bttn" data-bs-toggle="modal" data-bs-target="#createReward">temporary modal</button>
                    <button className="bttn" style={{marginLeft:"30px"}}>Template</button>
                    <button className="bttn" style={{marginLeft:"30px"}}>Template</button>
                </div>
            </div>  
        </div>
    )
};
*/

