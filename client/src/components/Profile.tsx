import React, {useEffect, useState} from 'react';
import "./css/Profile.css"
import {Accordion, Button, Col, Container, Image, Row} from "react-bootstrap";
import Btn from "../ui/Btn";
import {useNavigate} from "react-router";
import Resume from "./Resume";
import DropDowns from "../ui/DropDowns";
import {useSelector} from "react-redux";
import {IResume, IUser, IVacancy} from "../types/types";
import {getResumes, getVacancies} from "../api/Api";
import Vacancy from "./Vacancy";
import {useAppSelector} from "../hooks/reduxHooks";

const Profile = () => {
    const navigate = useNavigate()
    const user = useAppSelector(state => state.user)
    const [data, setData] = useState<IResume[] | IVacancy[]>([])

    useEffect(() => {
        // user?.role == "user"
        //     ? getResumes(user?.key).then(
        //         vals => {
        //             setData(vals)
        //         })
        //     : getVacancies(user?.key).then(
        //         vals => {
        //             setData(vals)
        //         }
        //     )

    }, [])

    return (
        <div className="profile">
            <Container fluid>
                <Row style={{display: "flex", justifyContent: "center"}}>
                    <Col xs={5} sm={4} lg={2}>
                        <Image className="ava" src={require("../images/ava.jpg")}/>
                    </Col>
                    <Col xs={7} sm={8} lg={4} xl={3} style={{display: "flex", justifyContent: "center"}}>
                        <div>
                            <div className="line">
                                <div><p>ФИО:</p></div>
                                <div><p>{user?.lastName} {user?.firstName}</p></div>
                            </div>
                            {/*<div className="line">*/}
                            {/*    <div><p>Телефон:</p></div>*/}
                            {/*    <div><p>{user?.phone}</p></div>*/}
                            {/*</div>*/}
                            {/*<div className="line">*/}
                            {/*    <div><p>Почта:</p></div>*/}
                            {/*    <div><p>{user?.mail}</p></div>*/}
                            {/*</div>*/}
                            {/*<div className="line">*/}
                            {/*    <div><p>Дата рождения:</p></div>*/}
                            {/*    <div><p>{user?.birthDay}</p></div>*/}
                            {/*</div>*/}
                            <div className="line">
                                <Btn text={"Добавить резюме"} onClick={() => {
                                    navigate("/resume_form")
                                }}/>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="resumes">
                    <Col className="col" xs={12} sm={12} style={{display: "flex", justifyContent: "center"}}>
                        <h1>Мои {user.role == 'user' ? 'резюме' : 'вакансии'}</h1>
                    </Col>
                    <Col className="col" xs={12} sm={12} style={{display: "flex", justifyContent: "center"}}>
                        <DropDowns titles={data.map(d => d.profession + " - " + d.post)}
                                   bodies={user?.role == "user"
                                       ? data.map(d => <Resume data={d as IResume}/>)
                                       : data.map(d => <Vacancy data={d as IVacancy}/>)
                        }/>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Profile;