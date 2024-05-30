import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/landingPage.css";
import barbarian1 from "../../img/barbarian1.png"
import barbarian3 from "../../img/barbarian3.png"
import treasure from "../../img/treasure_2642175.png"
import carangueijo from "../../img/beast.png"
import { useNavigate } from 'react-router-dom';

export const Home = () => {

	const { store, actions } = useContext(Context);
	const navigate = useNavigate();




	return (
		<div className="text-center  landingPage h-100">
			<nav className="d-flex justify-content-between align-items-center mb-5 p-2">


				<img className="imgLogo"
					src={treasure}
				/>


				<div className="nabBtn gap-2 d-md-flex ml-auto">
					<button className="loginNavBtn card me-md-2"
						onClick={() => navigate('/login')}
					>Login
					</button>
					<button className="signNavBtn card"
						onClick={() => navigate('/signup')}
					>Signup
					</button>
				</div>
			</nav>
			<div className="row">
				<div className="col-6 ">
					<div className="card m-auto p-3 cardTitle">
						<h2>Level up with your tasks done</h2>
					</div>
					<div className="infoLandingPage mt-2 color-light p-5 ">
						<br className=""></br>
						<h4 className="subtitleCard">Unleash your productivity with our To-Do List game!
							Finish your tasks, earn rewards, and watch your progress soar.
							Level up your warrior and beat the monsters.
							<p>Challenge yourself to new levels of organization and efficiency.</p>
						</h4>


					</div>

					<div className="imgLandingPage"></div>

				</div>

				<div className="col-6">
					<img className="imgLandingPage"
						src={barbarian1}
					/>

					<img className="imgLandingPage"
						src={barbarian3}
					/>
					<img className="carangueijo"
						src={carangueijo} />
				</div>



			</div>

		</div>
	);

};
