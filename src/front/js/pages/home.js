import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { IMAGES } from "../../img/all_images";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { NavbarHome } from "../component/navbarHome";
import { Footer } from "../component/footer";



export const Home = () => {
	const { store, actions } = useContext(Context);
	

	return (
		<>
			<div>
				<NavbarHome />
				<div className="container-1 card" style={{marginTop:"10px", padding:"10px"}}>
					<div className="card bg-body-secondary" style={{width: "30%", height: "55%", marginLeft:"30px",marginTop:"20px"}}>
						<h3 style={{marginTop:"20px"}}>Welcome to te best decision you are going to make today<br/><br/>
						prepare to adventure trough your tasks, from making the bed to slaying dragons</h3>
					</div>
				</div>
				<div className="container-1 card" style={{marginTop: "50px", padding:"10px"}}>
					<div>
						<div className="card bg-body-secondary" style={{width: "30%", height: "35%", marginRight:"30px",marginTop:"20px", float:"right"}}>
							<h3 style={{marginTop: "20px"}}>Choose one of 
							our clases to chalenge your daily adventures with your own style</h3>
						</div>
						<div>
							<div className="d-flex" style={{marginTop: "200px"}}>	
								<div className="card" style={{width: "18%", height: "250px"}}><img className="homeImg" src={IMAGES.barbarian_home} />
								<p>the Strong Barbarian</p></div>
								<div className="card" style={{width: "18%", height: "250px", marginLeft:"100px"}}><img className="homeImg" src={IMAGES.wizard_home} />
								<p>the wise Wizard</p></div>
								<div  className="card" style={{width: "18%", height: "250px", marginLeft:"100px"}}><img className="homeImg" src={IMAGES.rougue_home} />
								<p>the cunning Rogue</p></div>
							</div>
						</div>
					</div>
				</div>
				<div className="container-1 card" style={{marginTop: "50px", padding:"10px"}}>
					<div className="card" style={{width: "30%", height: "65%", marginLeft:"30px",marginTop:"20px"}}>
						<h3 style={{ marginTop: "20px"}}>
							Join TaskSlayer so you can manage all your daily tasks while questing and getting rewards, have fun while doing all 
							the things you feel need to be done but sometimes get forgoten or are hard to manage.
						</h3>
					</div>
				</div>
				<Footer/>
			</div>
		</>
	);
};
