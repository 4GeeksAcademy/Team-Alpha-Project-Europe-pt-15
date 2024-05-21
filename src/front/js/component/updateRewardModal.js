import React, { useContext, useEffect, useState} from "react";
import { Context } from "../store/appContext";

export const UpdateRewardModal=({modalId, modalTittel,placeholder,rarityId, id})=>{
    const { store, actions } = useContext(Context);
    const [label, setLabel]= useState("")
    const [rarity, setRarity]= useState("")




    return (
        <div className="modal fade text-center" id={modalId} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="card modal-content">
                    <h1 style={{marginTop:"30px"}}>{modalTittel}</h1>   
                    <div className="modal-body">
                        <div className="mb-3">
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="9" placeholder={placeholder} value={label} onChange={(e) =>setLabel(e.target.value)}></textarea>
                        </div>
                        <div>
                            <h4>Rarity</h4>
                            <button className="bttn" type="button" onClick={()=>setRarity("common")}><i className="far fa-star"></i>Common</button>
                            <button className="bttn" type="button" style={{marginLeft:"15px"}} onClick={()=>setRarity("rare")}><i className="fas fa-star-half-alt"></i>Rare</button>
                            <button className="bttn" type="button" style={{marginLeft:"15px"}} onClick={()=>setRarity("legendary")}><i className="fas fa-star"></i>Legendary</button>
                        </div>
                        <button type="button" className="bttn bg-yellow" style={{marginTop:"50px", width:"200px", fontWeight:"bold"}}
                            onClick={()=>{actions.updateReward(store.rewardId,label,actions.selectRarity(rarity))
                                setTimeout(() =>window.location.reload() , "500")
                            }}>Change It!</button>
                    </div>
                </div>
            </div>
        </div>
    )
}