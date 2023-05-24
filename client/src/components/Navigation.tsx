import React, {useEffect, useState} from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from "react-router-dom";
import {isUser} from "../api/Api";
import "./css/Navigation.css"
import {useSelector} from "react-redux";
import {IUser} from "../types/types";

const Navigation = () => {
    const [active, setActive] = useState(-1)
    const [isAuth, setIsAuth] = useState(false)
    // @ts-ignore
    const user = useSelector(state => state.user)
    useEffect(() => {
        // isUser(user.key).then(val => {
        //     setIsAuth(val)
        // })
        setIsAuth(true)
    }, [])

    return (
        <Navbar collapseOnSelect expand="md">
            <Container fluid>
                <Navbar.Brand style={{marginLeft: 20}} href="/">MATCHR</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link active={active == 0} onClick={e => setActive(0)} as={Link} to={"/"}>О платформе</Nav.Link>
                        <Nav.Link active={active == 1} onClick={e => setActive(1)} as={Link} to="/search">Поиск</Nav.Link>
                        {isAuth && <Nav.Link active={active == 2} onClick={e => setActive(2)} as={Link} to="/profile">Профиль</Nav.Link>}
                        {isAuth && <Nav.Link active={active == 3} onClick={e => setActive(3)} as={Link} to="/matches">Мэтчи</Nav.Link>}
                    </Nav>
                    <Nav>
                        {isAuth
                        ?<Nav.Link as={Link} to="/logout">Выход</Nav.Link>
                        :<Nav.Link as={Link} to="/login">Вход</Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;