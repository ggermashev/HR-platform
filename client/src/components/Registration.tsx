import React, {useState} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import Input from "../ui/Input";
import Btn from "../ui/Btn";
import {Link} from "react-router-dom";
import "./css/Login.css"

const Registration = () => {
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [login, setLogin] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div>
            <div className="login">
                <Container style={{height: "100%"}} fluid>
                    <Row style={{height: "100%"}}>
                        <Col className="login-col" xs={12} sm={12} md={12} lg={12}>
                            <div className="login-form">
                                <h1>Регистрация</h1>
                                <Input text={"Имя"} value={name} setValue={setName}/>
                                <Input text={"Фамилия"}value={surname} setValue={setSurname}/>
                                <Input text={"Почта"} value={login} setValue={setLogin}/>
                                <Input text={"Пароль"}value={password} setValue={setPassword}/>
                                <Btn text={"Зарегистрироваться"} onClick={() => {console.log(login)}}/>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Registration;