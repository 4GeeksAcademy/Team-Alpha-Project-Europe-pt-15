import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const ConfirmationModal = ({id, title, image, message, subMessage, confirmLabel, targetModal, dismissLabel}) => {

    const { store, actions } = useContext(Context);

    return (
        <>
		<div className="modal fade" id={id} tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="card modal-content p-4">
                    {/* title */}
                    <h1>{title}</h1>                 
                    <div className="modal-body d-flex flex-column gap-4"> 
                        {/* image */}  
                        <img className="col-6 align-self-center" src={image} />
                        {/* message */} 
                        <div>
                            <h5>{message}</h5>
                            <p>{subMessage}</p>
                        </div>             
                        {/* confirm */}
						<div type="submit" className="card p-2 text-center bg-yellow" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target={targetModal}>
							<h5>{confirmLabel}</h5>
						</div>
                        {/* cancel */}
                        <div type="reset" className="card p-2 text-center bg-black" data-bs-dismiss="modal">
                            <h5>{dismissLabel}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}