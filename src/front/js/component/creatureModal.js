import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const CreatureModal= ({id, index}) => {
    const { store, actions } = useContext(Context);

    actions.getMonsterByIndex(index)

    return (
        <>
             <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="card modal-content p-5">
                        {/* title */}
                        <h1>{store.creatureInfo?.name}</h1>
                        <img src={actions.getMonsterImage(store.creatureInfo)}/>
                        <div>
                            <h6>it has {store.creatureInfo?.hit_points} hit points</h6>
                            <h6>size : {store.creatureInfo?.size}</h6>
                            <h6>alignment: {store.creatureInfo?.alignment}</h6>
                            <p>{store.creatureInfo?.desc}</p>
                        </div>
                        <div type="button" className="card p-3 text-center bg-yellow" data-bs-dismiss="modal" aria-label="Close">
                            <h5>Go back to the Bestiary</h5>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )



}