import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { LogIn } from "./pages/logIn";
import { SignUp } from "./pages/signUp";
import { Role } from "./pages/choose_role";
import { Quests } from "./pages/dashboard_quests";
import {Dash} from "./pages/dashboard";
import { Rewards } from "./pages/rewards"; 

import injectContext from "./store/appContext";



const Layout = () => {
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<LogIn />} path="/LogIn" />
                        <Route element={<SignUp />} path="/SignUp" />
                        <Route element={<Role />} path="/chooseOne" />
                        <Route element={<Quests />} path="/quests" />
                        <Route element={<Dash />} path="/Dashboard" />
                        <Route element={<Rewards />} path="/rewards" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
