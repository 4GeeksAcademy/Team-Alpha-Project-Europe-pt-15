import React, { useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { UpdateRewardModal } from "./updateRewardModal";

export const RewardCard =({label,index,rarityId,id})=>{

    const { store, actions } = useContext(Context);

    const rarityColor=()=>{

        if(rarityId == 1){return (

            <div className="card-header bg-yellow"><button className="bttn circle"><i className="far fa-star"></i></button>
            <button data-bs-toggle="modal" data-bs-target="#updateReward" className="bttn circle" style={{float:"right"}} onClick={()=>actions.setRewardId(id)}><i className="fas fa-ellipsis-h"></i></button></div>              
         )}
        else if(rarityId == 2){return (
            <div className="card-header bg-green"><button className="bttn circle"><i className="fas fa-star-half-alt"></i></button>
            <button data-bs-toggle="modal" data-bs-target="#updateReward" className="bttn circle" style={{float:"right"}} onClick={()=>actions.setRewardId(id)}><i className="fas fa-ellipsis-h"></i></button></div>              
              
        )}
        else{return (
            <div className="card-header bg-purple"><button className="bttn circle"><i className="fas fa-star"></i></button>
            <button data-bs-toggle="modal" data-bs-target="#updateReward" className="bttn circle" style={{float:"right"}} onClick={()=>actions.setRewardId(id)}><i className="fas fa-ellipsis-h"></i></button></div>                              

        )}

    }  
    
    return (
        <>
        <div className="col" key={index}> 
            <div className="card">
                {rarityColor()}              
                    <div className="card-body">
                    <p className="card-text">{label}</p>
                </div>
            </div>
        </div>
        {/* this modal is to update rewards */}
        <UpdateRewardModal modalId="updateReward" modalTittel="Update Your Reward" placeholder="here you can chage the reward you are working to get and the rarity in the buttons below"  />
        </>
    )


}