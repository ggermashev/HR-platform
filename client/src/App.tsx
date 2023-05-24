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
import {isUser} from "./api/Api";
import Logout from "./components/Logout";
import Registration from "./components/Registration";
import ResumeForm from "./components/ResumeForm";
import Matches from "./components/Matches";
import VacancyForm from "./components/VacancyForm";
import {useSelector} from "react-redux";

function App() {
    // @ts-ignore
    const user = useSelector(state => state.user)
    const [isAuth, setIsAuth] = useState(false)
    useEffect(() => {
        // isUser(user.key).then(val => {
        //     setIsAuth(val)
        // })
        setIsAuth(true)
    }, [])

    return (
        <Fragment>
            <Navigation/>
                <main>
                    <Routes>
                        <Route path="/" element={<About/>}/>
                        {isAuth && <Route path="/profile" element={<Profile/>}/>}
                        {isAuth && <Route path="/vacancy_form" element={<VacancyForm/>}/>}
                        {isAuth && <Route path="/matches" element={<Matches/>}/>}
                        {isAuth && <Route path="/resume_form" element={<ResumeForm/>}/>}
                        <Route path="/search" element={<Search/>}/>
                        {!isAuth && <Route path="/login" element={<Login/>}/>}
                        {!isAuth && <Route path="/registration" element={<Registration/>}/>}
                        {isAuth && <Route path="/logout" element={<Logout/>}/>}
                    </Routes>
                </main>
            <Footer/>
        </Fragment>
    );
}

export default App;
