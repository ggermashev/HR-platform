import React, {useEffect, useRef, useState} from 'react';
import "./css/Profile.css"
import {Accordion, Button, Col, Container, Image, Row} from "react-bootstrap";
import Btn from "../ui/Btn";
import {useNavigate} from "react-router";
import Resume from "./Resume";
import DropDowns from "../ui/DropDowns";
import {useSelector} from "react-redux";
import {IResume, IUser, IVacancy} from "../types/types";
import Vacancy from "./Vacancy";
import {useAppSelector} from "../hooks/reduxHooks";
import {getResumesByUser} from "../http/resumeApi";
import {getVacanciesByUser} from "../http/vacancyApi";
import {isAuth} from "../http/userApi";
import gsap from "gsap";

const Profile = () => {
    const navigate = useNavigate()
    const user = useAppSelector(state => state.user)
    const [data, setData] = useState<IResume[] | IVacancy[]>()
    const tl = gsap.timeline()
    const [onBtn, setOnBtn] = useState(false)

    useEffect(() => {
        isAuth().then(() => {
            user?.role == "USER"
                ? getResumesByUser(user.id).then(
                    vals => {
                        setData([...vals])
                    })
                : getVacanciesByUser(user.id).then(
                    vals => {
                        setData([...vals])
                    }
                )
        })
    }, [])

    return (
        <div className="profile">
            <Container fluid>
                <Row style={{display: "flex", justifyContent: "center"}}>
                    <Col xs={5} sm={4} lg={2}>
                        <Image className="ava" src={require("../images/ava.jpg")}
                               onMouseOver={() => {

                                   tl.to(".add-avatar", {
                                       visibility: "initial",
                                       duration: 0
                                   })
                               }}
                               onMouseLeave={() => {
                                   if (!onBtn) {
                                       tl.to(".add-avatar", {
                                           visibility: "hidden",
                                           duration: 0
                                       })
                                   } else {
                                       tl.to(".add-avatar", {
                                           visibility: "initial",
                                           duration: 0
                                       })
                                   }
                               }}
                        />
                        <Btn className="add-avatar"
                             text={"Добавить аватар"}
                             onMouseOver={() => {
                                 setOnBtn(true)
                                 tl.to(".add-avatar", {
                                     visibility: "initial",
                                     duration: 0
                                 })
                             }}
                             onMouseLeave={() => {
                                 setOnBtn(false)
                             }}
                             onClick={() => {
                             }}/>
                    </Col>
                    <Col xs={7} sm={8} lg={4} xl={3} style={{display: "flex", justifyContent: "center"}}>
                        <div>
                            <div className="line">
                                <div><h1>{user.lastName} {user.firstName}</h1></div>
                            </div>
                            <div className="line">
                                <Btn text={user.role === "USER" ? "Добавить резюме" : "Добавить вакансию"}
                                     onClick={() => {
                                         navigate(user.role === "USER" ? "/resume_form" : "/vacancy_form")
                                     }}/>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="resumes">
                    <Col className="col" xs={12} sm={12} style={{display: "flex", justifyContent: "center"}}>
                        <h1>Мои {user.role == 'USER' ? 'резюме' : 'вакансии'}</h1>
                    </Col>
                    <Col className="col" xs={12} sm={12} style={{display: "flex", justifyContent: "center"}}>
                        {data && data.length > 0
                            ? <DropDowns titles={data ? data.map(d => d.profession + " - " + d.post) : []}
                                         bodies={data
                                             ? (user.role == "USER"
                                                 ? data.map(d => <Resume key={d.id} data={d as IResume}/>)
                                                 : data.map(d => <Vacancy key={d.id} data={d as IVacancy}/>))
                                             : []
                                         }/>
                            : <p>У вас пока что нет ни {user.role === 'USER' ? "одного резюме" : "одной вакансии"}</p>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Profile;