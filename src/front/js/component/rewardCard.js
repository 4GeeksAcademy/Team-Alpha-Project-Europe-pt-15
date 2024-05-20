import React, { useContext, useEffect} from "react";
import { Context } from "../store/appContext";

export const RewardCard =({label,index, BgColor,rarityId})=>{

    const { store, actions } = useContext(Context);


    
    
    const rarityColor=()=>{

        if(rarityId == 1){return (
            <div className="card-header bg-yellow"><button className="bttn circle"><i className="far fa-star"></i></button>
            <button className="bttn circle" style={{float:"right"}}><i className="fas fa-ellipsis-h"></i></button></div>              
         )}
        else if(rarityId == 2){return (
            <div className="card-header bg-green"><button className="bttn circle"><i className="fas fa-star-half-alt"></i></button>
            <button className="bttn circle" style={{float:"right"}}><i className="fas fa-ellipsis-h"></i></button></div>              
              
        )}
        else{return (
            <div className="card-header bg-purple"><button className="bttn circle"><i className="fas fa-star"></i></button>
            <button className="bttn circle" style={{float:"right"}}><i className="fas fa-ellipsis-h"></i></button></div>                              
        )}

    }
    
    
    
    
    
    
    
    return (
        <div className="col" key={index}> 
            <div className="card mb-3">
                {rarityColor()}              
                    <div className="card-body">
                    <p className="card-text">{label}</p>
                </div>
            </div>
        </div>
    )


}