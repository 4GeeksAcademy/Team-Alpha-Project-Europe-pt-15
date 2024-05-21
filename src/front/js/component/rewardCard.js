import React, { useContext, useEffect} from "react";
import { Context } from "../store/appContext";

export const RewardCard =({label,index, BgColor,rarityId})=>{

    const { store, actions } = useContext(Context);

    const rarityColor=()=>{

        if(rarityId == 1){return (
            <div className="card-header d-flex flex-row justify-content-between p-4 bg-yellow">
                <button className="card circle"><i className="far fa-star"></i></button>
                <button className="card circle" style={{float:"right"}}><i className="fas fa-ellipsis-h"></i></button>
            </div>              
         )}
        else if(rarityId == 2){return (
            <div className="card-header d-flex flex-row justify-content-between p-4 bg-green">
                <button className="card circle"><i className="fas fa-star-half-alt"></i></button>
                <button className="card circle" style={{float:"right"}}><i className="fas fa-ellipsis-h"></i></button>
            </div>              
              
        )}
        else{return (
            <div className="card-header d-flex flex-row justify-content-between p-4 bg-purple">
                <button className="card circle"><i className="fas fa-star"></i></button>
                <button className="card circle" style={{float:"right"}}><i className="fas fa-ellipsis-h"></i></button>
            </div>                              
        )}

    }  
    
    return (
        <div className="col" key={index}> 
            <div className="card">
                {rarityColor()}              
                    <div className="card-body">
                    <p className="card-text">{label}</p>
                </div>
            </div>
        </div>
    )


}