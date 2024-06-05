import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import injectContext from "./store/appContext";

import { Home } from "./pages/home";
import { Login } from "./pages/logIn";
import { Forgot } from "./pages/forgot_password";
import { SignUp } from "./pages/signUp";
import { Role } from "./pages/choose_role";
import { Quests } from "./pages/quests";
import { Rewards } from "./pages/rewards";
import { Bestiary } from "./pages/bestiary"; 
import { Encounter } from "./pages/encounter";
import { Scoreboard } from "./pages/scoreboard";
import { ProfileEdit } from "./pages/profile_edit";
import { PrivateRoutes } from "./privateRoutes";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Forgot />} path="/forgot" />
                        <Route element={<SignUp />} path="/signup" />
                        <Route element={<PrivateRoutes />}>
                            <Route element={<Role />} path="/role" />
                            <Route element={<Quests />} path="/quests" />
                            <Route element={<Rewards />} path="/rewards" />
                            <Route element={<Bestiary />} path="/bestiary" />
                            <Route element={<Encounter />} path="/encounter" />
                            <Route element={<Scoreboard />} path="/scoreboard" />
                            <Route element={<ProfileEdit />} path="/editprofile" />
                        </Route>
                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);