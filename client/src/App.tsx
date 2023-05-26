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
import {clearUser, setIsAuth} from "./redux/userSlice";

function App() {
    // @ts-ignore
    const user = useSelector(state => state.user)
    const dispatch = useAppDispatch()

    useEffect(() => {
        isAuth().then(val => {dispatch(setIsAuth(true))},
            err => {dispatch(clearUser())})
    }, [user])

    return (
        <Fragment>
            <Navigation/>
            <main>
                <Routes>
                    <Route path="/" element={<About/>}/>
                    {user.isAuth && <Route path="/profile" element={<Profile/>}/>}
                    {user.isAuth && <Route path="/vacancy_form" element={<VacancyForm/>}/>}
                    {user.isAuth && <Route path="/matches" element={<Matches/>}/>}
                    {user.isAuth && <Route path="/resume_form" element={<ResumeForm/>}/>}
                    <Route path="/search" element={<Search/>}/>
                    {!user.isAuth && <Route path="/login" element={<Login/>}/>}
                    {!user.isAuth && <Route path="/registration" element={<Registration/>}/>}
                    {user.isAuth && <Route path="/logout" element={<Logout/>}/>}
                </Routes>
            </main>
            <Footer/>
        </Fragment>
    );
}

export default App;
