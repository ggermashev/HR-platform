import React, {Fragment, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import About from "./components/About";
import Search from "./components/Search";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Registration from "./components/Registration";
import ResumeForm from "./components/ResumeForm";
import Matches from "./components/Matches";
import VacancyForm from "./components/VacancyForm";
import {useSelector} from "react-redux";
import {isAuth} from "./http/userApi";
import {useAppDispatch, useAppSelector} from "./hooks/reduxHooks";
import {setIsAuthenticated} from "./redux/isAuthenticatedSlice";

function App() {
    // @ts-ignore
    const user = useSelector(state => state.user)
    const isAuthenticated = useAppSelector(state => state.isAuthenticated)
    const dispatch = useAppDispatch()

    return (
        <Fragment>
            <Navigation/>
                <main>
                    <Routes>
                        <Route path="/" element={<About/>}/>
                        {isAuthenticated.auth && <Route path="/profile" element={<Profile/>}/>}
                        {isAuthenticated.auth && <Route path="/vacancy_form" element={<VacancyForm/>}/>}
                        {isAuthenticated.auth && <Route path="/matches" element={<Matches/>}/>}
                        {isAuthenticated.auth && <Route path="/resume_form" element={<ResumeForm/>}/>}
                        <Route path="/search" element={<Search/>}/>
                        {!isAuthenticated.auth && <Route path="/login" element={<Login/>}/>}
                        {!isAuthenticated.auth && <Route path="/registration" element={<Registration/>}/>}
                        {isAuthenticated.auth && <Route path="/logout" element={<Logout/>}/>}
                    </Routes>
                </main>
            <Footer/>
        </Fragment>
    );
}

export default App;
