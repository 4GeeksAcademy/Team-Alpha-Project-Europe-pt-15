import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext"
import { Link } from "react-router-dom";
import { IMAGES } from "../../img/all_images";
import { TEXT } from "../../text/all_messages";


export const Encounter = () => {
    const { store, actions } = useContext(Context);
    const [isDesktop, setDesktop] = useState(window.innerWidth > 992);

    const updateMedia = () => {
        setDesktop(window.innerWidth > 992);
    };

    useEffect(() => {
        actions.battle()
		actions.getBackgroundColor("encounter")
        window.addEventListener("resize", updateMedia);
        return () => window.removeEventListener("resize", updateMedia);
    },[]);
    
    return (
    <>
    <div className="card col-md-10 mx-auto p-3 p-md-5">
        {/* title */}
        <h1>Where are you?</h1>
        {isDesktop ? (
            <>
            {/* desktop map */}
            <img className="col-9 mx-auto z-0 position-relative" src={IMAGES.map} alt="map" />
            <Link to="/battle" type="button" className="card bg-black p-1 position-absolute" style={{margin: "11% 0% 0% 43%"}}>
                Snow Forest
            </Link>
            <Link to="/battle" type="button" className="card bg-black p-1 position-absolute" style={{margin: "14% 0% 0% 61%"}}>
                Volcano Island
            </Link>
            <Link to="/battle" type="button" className="card bg-black p-1 position-absolute" style={{margin: "26% 0% 0% 40%"}}>
                Main Cave Entrance
            </Link>
            <Link to="/battle" type="button" className="card bg-black p-1 position-absolute" style={{margin: "29% 0% 0% 18%"}}>
                The Wasteland
            </Link>
            <Link to="/battle" type="button" className="card bg-black p-1 position-absolute" style={{margin: "44% 0% 0% 62%"}}>
                Obligatory <br></br> Underwater Level
            </Link>
            <Link to="/battle" type="button" className="card bg-black p-1 position-absolute" style={{margin: "50% 0% 0% 12%"}}>
                Sacret Waterfall
            </Link>
            </>
        ) : (
            <>
            {/* smaller screens locations */}
            <div className="row row-cols-1 row-cols-md-4 p-3 g-4">
                <Link to="/battle" className="card p-3">
                    <img className="col" src={IMAGES.snow_forest} alt="snow forest" />
                    <h5 className="card bg-black p-1">Snow Forest</h5>
                </Link>
                <Link to="/battle" className="card p-3">
                    <img className="col" src={IMAGES.cave} alt="cave" />
                    <h5 className="card bg-black p-1">Cave Entrance</h5>
                </Link>
                <Link to="/battle" className="card p-3">
                    <img className="col" src={IMAGES.waterfall} alt="waterfall" />
                    <h5 className="card bg-black p-1">Sacret Waterfall</h5>
                </Link>
                <Link to="/battle" className="card p-3">
                    <img className="col" src={IMAGES.desert} alt="desert" />
                    <h5 className="card bg-black p-1">The Wasteland</h5>
                </Link>
                <Link to="/battle" className="card p-3">
                    <img className="col" src={IMAGES.ocean} alt="ocean" />
                    <h5 className="card bg-black p-1">Obligatory Underwater Level</h5>
                </Link>
            </div>
            </>
      )}
    </div>
    {/* go back */}
    <div className="navbar fixed-bottom py-3 d-flex justify-content-center">
        <Link to="/quests" className="card col-9 p-3 text-center bg-black">
            <h5>Go back I'm not ready</h5>
        </Link>
    </div>
    </>
    )
}