import React, {useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Input from "../ui/Input";
import Btn from "../ui/Btn";
import {Link, useNavigate} from "react-router-dom";
import "./css/Login.css"
import {IUser} from "../types/types";
import {registration} from "../http/userApi";
import {useDispatch} from "react-redux";
import {setChatId} from "../redux/activeChatSlice";

const Registration = () => {
    const [user, setUser] = useState<IUser>({
        firstName: "",
        lastName: "",
        login: "",
        password: "",
        role: "USER"
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <div>
            <div className="login">
                <Container style={{height: "100%"}} fluid>
                    <Row style={{height: "100%"}}>
                        <Col className="login-col" xs={12} sm={12} md={12} lg={12}>
                            <div className="login-form">
                                <h1>Регистрация</h1>
                                <Input text={"Имя"} value={user.firstName} setValue={(s) => {setUser({...user, firstName: s})}}/>
                                <Input text={"Фамилия"}value={user.lastName} setValue={(s) => {setUser({...user, lastName: s})}}/>
                                <Input text={"Почта"} value={user.login} setValue={(s) => {setUser({...user, login: s})}}/>
                                <Input text={"Пароль"}value={user.password} setValue={(s) => {setUser({...user, password: s})}}/>
                                <Btn text={"Зарегистрироваться"} onClick={() => {
                                    registration(user).then(val => {navigate('/login')})
                                }}/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Registration;