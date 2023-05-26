import React, {useEffect, useState} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import "./css/Navigation.css"
import {useSelector} from "react-redux";
import {IUser} from "../types/types";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {isAuth} from "../http/userApi";
import {setIsAuthenticated} from "../redux/isAuthenticatedSlice";
import {clearUser} from "../redux/userSlice";

const Navigation = () => {
    const [active, setActive] = useState(-1)
    const isAuthenticated = useAppSelector(state => state.isAuthenticated)
    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <Navbar collapseOnSelect expand="md">
            <Container fluid>
                <Navbar.Brand style={{marginLeft: 20}} href="/">MATCHR</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link active={active == 0} onClick={e => setActive(0)} as={Link} to={"/"}>О
                            платформе</Nav.Link>
                        <Nav.Link active={active == 1} onClick={e => setActive(1)} as={Link}
                                  to="/search">Поиск</Nav.Link>
                        {isAuthenticated.auth && <Nav.Link active={active == 2} onClick={e => setActive(2)} as={Link}
                                             to="/profile">Профиль</Nav.Link>}
                        {isAuthenticated.auth && <Nav.Link active={active == 3} onClick={e => setActive(3)} as={Link}
                                             to="/matches">Мэтчи</Nav.Link>}
                    </Nav>
                    <Nav>
                        {isAuthenticated.auth
                            ? <Nav.Link as={Link} to="#" onClick={() => {
                                localStorage.removeItem('token')
                                dispatch(clearUser())
                                dispatch(setIsAuthenticated(false))
                                navigate("/login")
                            }
                            }>Выход</Nav.Link>
                            : <><Nav.Link as={Link} to="/registration">Регистрация</Nav.Link><Nav.Link as={Link} to="/login">Вход</Nav.Link></>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;