import React, {useState} from 'react';
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";
import "./css/Login.css"
import Input from "../ui/Input";
import {Link, useNavigate} from "react-router-dom";
import Btn from "../ui/Btn";
import {login} from "../http/userApi";
import {useDispatch} from "react-redux";
import {setUser} from "../redux/userSlice";
import {useAppSelector} from "../hooks/reduxHooks";
import {setIsAuthenticated} from "../redux/isAuthenticatedSlice";

const Login = () => {
    const [login_, setLogin] = useState("")
    const [password, setPassword] = useState("")
    const auth = useAppSelector(state => state.isAuthenticated)
    const user = useAppSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div className="login">
            <Container style={{height: "100%"}} fluid>
                <Row style={{height: "100%"}}>
                    <Col className="login-col" xs={12} sm={12} md={12} lg={12}>
                        <div className="login-form">
                            <h1>Вход</h1>
                            <Input text={"Почта"} value={login_} setValue={setLogin}/>
                            <Input text={"Пароль"} value={password} setValue={setPassword}/>
                            <Btn text={"Войти"} onClick={() => {
                                login(login_, password).then(val => {
                                        dispatch(setUser(val))
                                        dispatch(setIsAuthenticated(true))
                                        navigate("/")
                                    },
                                    err => {
                                        console.log(err.message)
                                    }
                                )
                            }}/>
                            <p style={{fontSize: "0.8em"}}>Не зарегистрированы?<Link
                                to={"/registration"}>Регистрация</Link></p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;