import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const TakeAction = ({id, view, tier, done}) => {

    const { store, actions } = useContext(Context);

    let actionIcon = actions.getActionIcon(view, done)

    return (
        <>
        <div className="card circle">
            { view === "rewards"
            ? <i className={actionIcon} data-bs-toggle="modal" data-bs-target={`#rewardClaim?${id}`}></i>
            : view === "tasks" && done === true
            ? <i className={actionIcon}></i>
            : <i className={actionIcon} data-bs-toggle="modal" data-bs-target={`#taskDone?${id}`}></i>
            }
        </div>


        {/* task done confirmation modal */}
		<div className="modal fade" id={`taskDone?${id}`} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="card modal-content p-4">
                    {/* title */}
                    <h1>Is it done?</h1>                 
                    <div className="modal-body d-flex flex-column gap-4">                  
                        {/* confirm */}
						<div type="submit" className="card p-2 text-center bg-yellow" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target={`#taskResponse${id}`}>
							<h5>Firmly nod once</h5>
						</div>
                        {/* cancel */}
                        <div type="reset" className="card p-2 text-center bg-black" data-bs-dismiss="modal">
                            <h5>Retrieve</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* task response modal */}
		<div className="modal fade" id={`taskResponse${id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="card modal-content p-4">
                    {/* title */}
                    <h1>Gooooood</h1>                 
                    <div className="modal-body d-flex flex-column gap-4">
                        {/* image */} 
                        <img className="col-6 align-self-center" src={store.images[0]} alt="mysterious figure" />
                        {/* message */} 
						<h5>The mysterious figure responds as it fades back into the dark corner. No one notices your interaction, as you face the tavern again, it is filled with noise and the smell of strong ale.</h5>
                        <p>+{tier} task completed</p>                
                        {/* confirm */}
						<div type="submit" className="card p-2 text-center bg-yellow" data-bs-dismiss="modal" onClick={() => actions.doTask(tier, id)}>
							<h5>Collect prize</h5>
						</div>
                    </div>
                </div>
            </div>
        </div>


        {/* reward claim confirmation modal */}
		<div className="modal fade" id={`rewardClaim?${id}`} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="card modal-content p-4">
                    {/* title */}
                    <h1>You wish to claim this reward?</h1>                 
                    <div className="modal-body d-flex flex-column gap-4"> 
                        {/* image */} 
                        <img className="col-6 align-self-center" src={store.images[0]} alt="attack" />     
                        {/* message */} 
						<h5>Use ability</h5>
                        <p>+{tier} task completed</p>             
                        {/* confirm */}
						<div type="submit" className="card p-2 text-center bg-yellow" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target={`#rewardResponse${id}`}>
							<h5>Go for it</h5>
						</div>
                        {/* cancel */}
                        <div type="reset" className="card p-2 text-center bg-black" data-bs-dismiss="modal">
                            <h5>Not yet</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* reward response modal */}
		<div className="modal fade" id={`rewardResponse${id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="card modal-content p-4">
                    {/* title */}
                    <h1>Gooooood</h1>                 
                    <div className="modal-body d-flex flex-column gap-4">
                        {/* image */} 
                        <img className="col-6 align-self-center" src={store.images[0]} alt="mysterious figure" />
                        {/* message */} 
						<h5>The mysterious figure responds as it fades back into the dark corner. No one notices your interaction, as you face the tavern again, it is filled with noise and the smell of strong ale.</h5>
                        <p>+{tier} task completed</p>                
                        {/* confirm */}
						<div type="submit" className="card p-2 text-center bg-yellow" data-bs-dismiss="modal" onClick={() => actions.doTask(tier, id)}>
							<h5>Enjoy the spoils</h5>
						</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}