import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const ResponseModal = ({id, title, image, message, subMessage, confirmLabel, action}) => {

    const { store, actions } = useContext(Context);

    return (
        <>
		<div className="modal fade" id={id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="card modal-content p-4">
                {/* title */}
                <h1>{title}</h1>                 
                <div className="modal-body d-flex flex-column gap-4">
                    {/* image */} 
                    <img className="col-6 align-self-center" src={image} />
                    {/* message */} 
                    <h5>{message}</h5>
                    <div className="d-flex flex-row mx-auto gap-3">
                        {/* + info */} 
                        <p>{subMessage}</p>
                    </div>              
                    {/* confirm */}
                    <div type="submit" className="card p-2 text-center bg-yellow" data-bs-dismiss="modal" onClick={action}>
                        <h5>{confirmLabel}</h5>
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}