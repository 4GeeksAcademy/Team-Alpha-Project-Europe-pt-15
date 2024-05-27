import React, { useContext } from "react";
import { Context } from "../store/appContext";

import reward from "../../img/reward.png"
import weak from "../../img/weak.png"

export const TakeAction = ({id, view, label, tier, done}) => {

    const { store, actions } = useContext(Context);

    let actionIcon = actions.getActionIcon(view, done)

    //rewards data
    let abilityImg = store.images[store.user.user_role]
    let ability = store.abilities[tier]
    let energy = actions.checkEnoughEnergy(tier)

    return (
        <>
        <div className="card circle">
            { view === "rewards" && energy === true
            ? <i className={actionIcon} data-bs-toggle="modal" data-bs-target={`#attackReward${id}`}></i>
            : view === "rewards" && energy === false
            ? <i className={actionIcon} data-bs-toggle="modal" data-bs-target="#sorry"></i>
            : view === "tasks" && done === true
            ? <i className={actionIcon}></i>
            : <i className={actionIcon} data-bs-toggle="modal" data-bs-target={`#taskDone?${id}`}></i>}
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
                        <div className="d-flex flex-row mx-auto gap-3">
                        <i className="fa-solid fa-angles-up fa-bounce txt-green"></i><p>{store.difficulties[tier-1].experience_given} experience</p>
                        <i className="fa-solid fa-angles-up fa-bounce txt-yellow"></i><p>{store.difficulties[tier-1].energy_given} energy</p>
                        </div>              
                        {/* confirm */}
						<div type="submit" className="card p-2 text-center bg-yellow" data-bs-dismiss="modal" onClick={() => actions.doTask(tier, id)}>
							<h5>Collect prize</h5>
						</div>
                    </div>
                </div>
            </div>
        </div>


        {/* reward claim confirmation modal */}
		<div className="modal fade" id={`attackReward${id}`} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="card modal-content p-4">
                    {/* title */}
                    <h1>Attack this reward?</h1>                 
                    <div className="modal-body d-flex flex-column gap-4"> 
                        {/* image */} 
                        <img className="col-6 align-self-center" src={abilityImg !== undefined? abilityImg[tier] : null} alt="attack" />     
                        {/* message */} 
                        <div>
                            <h5>Use {ability.name} on</h5>
                            <p>{label}</p>
                        </div>             
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
        {/* reward claim response modal */}
		<div className="modal fade" id={`rewardResponse${id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="card modal-content p-4">
                    {/* title */}
                    <h1>Yeaaahhh</h1>                 
                    <div className="modal-body d-flex flex-column gap-4">
                        {/* image */} 
                        <img className="col-6 align-self-center" src={reward} alt="reward" />
                        {/* message */} 
						<h5>You're too powerful, they never saw it coming. Your hard work is paying off, keep it up.</h5>               
                        {/* confirm */}
						<div type="submit" className="card p-2 text-center bg-yellow" data-bs-dismiss="modal" onClick={() => actions.getReward(tier, id)}>
							<h5>Enjoy the spoils</h5>
						</div>
                    </div>
                </div>
            </div>
        </div>


        {/* not enough energy modal */}
		<div className="modal fade" id="sorry" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="card modal-content p-4">
                    {/* title */}
                    <h1>Daaamn...</h1>                 
                    <div className="modal-body d-flex flex-column gap-4">
                        {/* image */} 
                        <img className="col-6 align-self-center" src={weak} alt="reward" />
                        {/* message */} 
						<h5>The injuries from your last adventure still got you weak. You can't have this battle now, your energy is too low...</h5>               
                        {/* confirm */}
						<div type="reset" className="card p-2 text-center bg-black" data-bs-dismiss="modal">
							<h5>Retrieve</h5>
						</div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}