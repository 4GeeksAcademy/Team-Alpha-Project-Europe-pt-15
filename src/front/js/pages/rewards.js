import React, { useContext, useEffect} from "react";
import { Context } from "../store/appContext";

import { RewardCard } from "../component/rewardCard";
import { Navbar } from "../component/navbar_dashboard";

export const Rewards = () => {

    const { store, actions } = useContext(Context);

    useEffect(()=>{
        actions.getRewards(1)
    },[]);

    
    
    return (
        <>
            <Navbar />
            <div className="row row-cols-1 row-cols-md-4 g-4" style={{marginTop:"3%"}}>
                {store.rewards?.map((item,index)=>(
                    <RewardCard label={item.label} key={index} rarityId={item.rarity_id}/>
                ))}
            </div>
        </>
    )
};

/*
            <div className="mx-auto p-2" style={{marginTop:"5%"}}>
                <div style={{display:"flex", justifyContent:"center"}}><button className="bttn p-3 bg-black text-white">Actions</button></div>
                <div style={{display:"flex", justifyContent:"center", marginTop:"30px"}}>
                    <button className="bttn">Template</button>
                    <button className="bttn" style={{marginLeft:"30px"}}>Template</button>
                    <button className="bttn" style={{marginLeft:"30px"}}>Template</button>
                </div>
            </div>
            */