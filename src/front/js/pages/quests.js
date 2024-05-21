import React, { useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import "../../styles/index.css";
import { Navbar } from "../component/navbar_dashboard";

export const Quests = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		
	},[])

	return (
        <Navbar />

	);
};