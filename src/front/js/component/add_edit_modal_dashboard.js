import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const AddEditModal = ({id, view, label, tier}) => {
    const { store, actions } = useContext(Context);

    return (
        <div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="card modal-content p-5">
                    {/* title */}
                    <h1>{label}</h1>
                    {/* form */}                  
                    <form className="modal-body d-flex flex-column gap-4">
                        {/* label input */}
                        <textarea className="form-control card text-start"
                            placeholder={"thou shall name me"}
                            rows="4"
                            name="label"
                            value={store.inputs.label || ""}
                            onChange={event => actions.getInput(event)} />
                        {/* tier input */}
                        <div>
                            <h5>Tier</h5>
                            <select className="form-select card mb-2"
                                name="tier"
                                value={store.inputs.tier || ""}
                                onChange={event => actions.getInput(event)}>
                                    <option value={0} default >How would you rank it?</option>
                                    {/* tier options */}
                                    {tier?.filter(item => item !== null).map( item => (
                                        <option value={item.id} key={item.id}>{item.name}</option>
                                    ))}
                            </select>
                        </div>                        
                        {/* submit */}
                        <div type="submit" className="card p-2 text-center bg-yellow"
                            data-bs-dismiss="modal" onClick={() => actions.getDashboardModalAction(view, id)}>
                            <h5>Let's go!</h5>
                        </div>
                        {/* cancel */}
                        <div type="reset" className="card p-2 text-center bg-black"
                            data-bs-dismiss="modal" onClick={actions.resetInput}>
                            <h5>Nevermind</h5>
                        </div>
                        {/* delete */}
                        {view === "rewards" && typeof id === "number"
                        ?   <div type="reset" className="card p-2 text-center bg-red"
                            data-bs-dismiss="modal" onClick={() => actions.deleteReward(id)}>
                                <h5>Delete</h5>
                            </div>
                        : null                       
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}