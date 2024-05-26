import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Single } from "./pages/single";

import { Login } from "./pages/logIn";
import { SignUp } from "./pages/signUp";
import { Role } from "./pages/choose_role";
import { Quests } from "./pages/quests";

import { Dash } from "./pages/dashboard";
import { Tasker } from "./pages/inserTask";
import { Rewards } from "./pages/rewards";

import {Dash} from "./pages/dashboard";
import { Rewards } from "./pages/rewards";
import { Bestiary } from "./pages/bestiary"; 



import injectContext from "./store/appContext";
import { ProfileEdit } from "./pages/profile_edit";



const Layout = () => {
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div className="h-100">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route element={<Home />} path="/" />

                        <Route element={<Role />} path="/chooseOne" />
                        <Route element={<Dash />} path="/dashboard" />
                        <Route element={<Tasker />} path="/inserTask" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Login />} path="/login" />

                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Role />} path="/role" />
                        <Route element={<Quests />} path="/quests" />
                        <Route element={<Rewards />} path="/rewards" />
                        <Route element={<ProfileEdit />} path="/editprofile" />
                        <Route element={<Bestiary />} path="/bestiary" />
                        <Route element={<Dash />} path="/dashboard" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
