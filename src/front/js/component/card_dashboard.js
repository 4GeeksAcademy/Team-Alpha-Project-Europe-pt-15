import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const DashCard = ({id, view, label, tier, modal, done}) => {

    const { store, actions } = useContext(Context);

    let cardColor = actions.getCardColor(view, tier, done)
    let cardIcon = actions.getCardIcon(view, tier, done)

    return (
        <>
        <div className="col" key={id}> 
            <div className="card">
            <div className={`card-header d-flex flex-row justify-content-between p-3 ${cardColor}`}>
                <div className="card circle">
                <i className={cardIcon}></i>
                </div>
                <button className="card circle"
                    data-bs-toggle="modal" data-bs-target={modal}>
                    <i className="fas fa-ellipsis-h"></i>
                </button>
            </div>   
                {view === "tasks"
                ? <div className="card-body" data-bs-toggle="modal" data-bs-target="#taskdone?">
                    <p className="card-text">{label}</p>
                  </div>
                : <div className="card-body">
                    <p className="card-text">{label}</p>
                  </div>
                }
            </div>
        </div>

        {/* task done confirmation modal */}
		<div className="modal fade" id="taskdone?" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="card modal-content p-4">
                    {/* title */}
                    <h1>Is it done?</h1>                 
                    <div className="modal-body d-flex flex-column gap-4">                  
                        {/* confirm */}
						<div type="submit" className="card p-2 text-center bg-yellow" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#doneResponse">
							<h5>Show what little remains</h5>
						</div>
                        {/* cancel */}
                        <div type="reset" className="card p-2 text-center bg-black" data-bs-dismiss="modal">
                            <h5>Retrieve</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* response modal */}
		<div className="modal fade" id="doneResponse" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="card modal-content p-4">
                    {/* title */}
                    <h1>Gooooood</h1>                 
                    <div className="modal-body d-flex flex-column gap-4">
                        {/* image */} 
                        <img className="col-6 align-self-center" src={store.images[2]} alt="" />
                        {/* message */} 
						<h5>The mysterious figure responds as it fades back into the dark and the tabern is filled with noise again. No one notices your interaction.</h5>
                        <p>+{store.difficulties[tier - 1].experience_given} and + {store.difficulties[tier - 1].energy_given}</p>                
                        {/* confirm */}
						<div type="submit" className="card p-2 text-center bg-yellow" data-bs-dismiss="modal" onClick={() => actions.doTask(tier, id)}>
							<h5>Collect prize</h5>
						</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}