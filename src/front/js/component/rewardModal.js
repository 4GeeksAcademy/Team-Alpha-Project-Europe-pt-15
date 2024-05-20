import React, { useContext, useEffect} from "react";
import { Context } from "../store/appContext";

export const RewardModal=({modalId, modalTittel,placeholder })=>{
    const { store, actions } = useContext(Context);



    return (
        <div className="modal fade text-center" id={modalId} tabindex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="card modal-content">
                    <h1 style={{marginTop:"30px"}}>{modalTittel}</h1>   
                    <div className="modal-body">
                        <div class="mb-3">
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="9" placeholder={placeholder}></textarea>
                        </div>
                        <div>
                            <h4>Rarity</h4>
                            <button className="bttn"><i className="far fa-star"></i>Common</button>
                            <button className="bttn" style={{marginLeft:"15px"}}><i className="fas fa-star-half-alt"></i>Rare</button>
                            <button className="bttn" style={{marginLeft:"15px"}}><i className="fas fa-star"></i>Legendary</button>
                        </div>
                        <button className="bttn bg-yellow" style={{marginTop:"50px", width:"200px", fontWeight:"bold"}}>Add It!</button>
                    </div>
                </div>
            </div>
        </div>
    )
}