import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { IMAGES } from "../../img/all_images";
import { TEXT } from "../../text/all_messages";

import { ConfirmationModal } from "./confirmation_modal";
import { ResponseModal } from "./response_modal";

export const TakeAction = ({id, view, label, tier, done}) => {
    const { store, actions } = useContext(Context);

    // component icon icon
    let actionIcon = actions.getActionIcon(view, done)

    // tasks data
    let difficulty = store.difficulties[tier]
    let randomIndex = localStorage.getItem('randomNPC')
    
    //rewards data
    let ability = store.abilities[tier]
    let energy = actions.checkEnoughEnergy(tier)
    let abilityImg = actions.getAbilityImage(tier)

    return (
        <>
        <div className="card circle">
            { view === "rewards" && energy === true
            ? <i className={actionIcon} data-bs-toggle="modal" data-bs-target={`#attackReward${id}`}></i>
            : view === "rewards" && energy === false
            ? <i className={actionIcon} data-bs-toggle="modal" data-bs-target={`#sorry${id}`}></i>
            : view === "tasks" && done === true
            ? <i className={actionIcon}></i>
            : <i className={actionIcon} data-bs-toggle="modal" data-bs-target={`#taskDone?${id}`}></i>}
        </div>


        {/* task done modals */}
		<ConfirmationModal 
            id={`taskDone?${id}`}
            title="Is it Done?"
            confirmLabel="Firmly nod once"
            targetModal={`#taskResponse${id}`}
            dismissLabel="Retrieve"
        />
        <ResponseModal
            id={`taskResponse${id}`}
            title={store.npc[randomIndex].title}
            image={store.npc[randomIndex].image}
            message={store.npc[randomIndex].response}
            subMessage={<> <p className="d-flex flex-row gap-3">
                        <i className="fa-solid fa-angles-up fa-bounce txt-green"></i>
                        {difficulty !== undefined? difficulty.experience_given : null} experience
                        <i className="fa-solid fa-angles-up fa-bounce txt-yellow"></i>
                        {difficulty !== undefined? difficulty.energy_given : null} energy</p> 
                        {store.user.role === "Rogue"? <p className="d-inline-flex gap-3">
                        <i className="fa-solid fa-plus fa-bounce txt-purple"></i> some you stole!</p> : null}
                        </>}
            confirmLabel="Collect prize"
            action={() => actions.doTask(tier, id)}
        />


        {/* reward claim modals */}
        <ConfirmationModal 
            id={`attackReward${id}`}
            title="Attack this reward?"
            image={abilityImg}
            message={`Use ${ability !== undefined? ability.name : null} on`}
            subMessage={label}
            confirmLabel="Use Ability"
            targetModal={`#rewardResponse${id}`}
            dismissLabel="Not yet"
        />
        <ResponseModal
            id={`rewardResponse${id}`}
            title="Yeaaahhh"
            image={IMAGES.reward}
            message={TEXT.rewardClaimed}
            confirmLabel="Take loot"
            action={() => actions.getReward(tier, id)}
        />


        {/* not enough energy modal */}
        <ResponseModal
            id={`sorry${id}`}
            title="Daaamn..."
            image={IMAGES.weak}
            message={TEXT.rewardLocked}
            subMessage={`You need to have ${ability !== undefined? ability.energy_required : null} energy`}
            confirmLabel="Retrieve"
        />
        </>
    )
}