import React, {useEffect, useRef, useState} from 'react';
import "./css/ResumeForm.css"
import Input from "../ui/Input";
import {Col, Container, Form, Image, Row} from "react-bootstrap";
import Btn from "../ui/Btn";
import TagsInput from "../ui/TagsInput";
import TextInput from "../ui/TextInput";
import FormRadio from "../ui/FormRadio";
import {IEducation, IResume} from "../types/types";
import {useSelector} from "react-redux";
import {useAppSelector} from "../hooks/reduxHooks";
import {createResume} from "../http/resumeApi";
import {useNavigate} from "react-router-dom";

const ResumeForm = () => {

    const user = useAppSelector(state => state.user)
    const educations = ['Среднее', 'Среднее специальное', 'Неоконченное высшее', 'Высшее', 'Бакалавр', 'Магистр', 'Кандидат наук', 'Доктор наук']
    const [resume, setResume] = useState<IResume>({
        userId: user?.id,
        profession: "",
        post: "",
        city: "",
        salary: 0,
        education: null,
        workExperience: "",
        universities: [],
        jobs: [],
        description: "",
        skills: []
    })
    const [tag, setTag] = useState("")
    const [display, setDisplay] = useState("none")
    const navigate = useNavigate()

    return (
        <div className="resume-form" onClick={() => {
            setDisplay("none")
        }}>
            <div className="inputs">
                <Input text={"Профессия"} value={resume.profession} setValue={s => {
                    setResume({...resume, profession: s})
                }}/>
                <Input text={"Должность"} value={resume.post} setValue={s => {
                    setResume({...resume, post: s})
                }}/>
                <Input text={"Город"} value={resume.city} setValue={s => {
                    setResume({...resume, city: s})
                }}/>
                <Input text={"Желаемая зарплата"} value={resume.salary? resume.salary.toString() : ""} setValue={s => {
                    setResume({...resume, salary: parseInt(s)})
                }}/>
                <Container fluid>
                    <Row>
                        <Col xs={6} sm={6}>
                            <h3>Образование</h3>
                        </Col>
                        <Col xs={6} sm={6}>
                            <FormRadio name={"edu_form"} variants={educations} onChange={e => {
                                setResume({
                                    ...resume,
                                    universities: [{
                                        name: "",
                                        faculty: "",
                                        specialization: "",
                                        graduationYear: null
                                    }],
                                    jobs: [{
                                        companyName: "",
                                        post: "",
                                        profession: "",
                                        todos: "",
                                        workFrom: null,
                                        workTo: null,
                                        resumeId: null
                                    }],
                                    education: e.target.value
                                })
                            }}/>
                        </Col>
                    </Row>
                </Container>
                {resume.education && resume.education !== educations[0] && <h3>Учебное заведение</h3>}
                {resume.education && resume.education !== educations[0] && resume.universities.map((uni, i) =>
                    <div className="university">
                        <div>
                            <Input text={"Учебное заведение"} value={uni.name} setValue={(val) => {
                                const copy_universities = [...resume.universities]
                                copy_universities[i].name = val
                                setResume({
                                    ...resume,
                                    universities: copy_universities
                                })
                            }}/>
                            <Input text={"Факультет"} value={uni.faculty} setValue={(val) => {
                                const copy_universities = [...resume.universities]
                                copy_universities[i].faculty = val
                                setResume({
                                    ...resume,
                                    universities: copy_universities
                                })
                            }}/>

                            <Input text={"Специализация"} value={uni.specialization} setValue={(val) => {
                                let copy_universities = [...resume.universities]
                                copy_universities[i].specialization = val
                                setResume({
                                    ...resume,
                                    universities: copy_universities
                                })
                            }}/>

                            <Input text={"Год окончания"} value={uni.graduationYear ? uni.graduationYear.toString() : ""}
                                   setValue={(val) => {
                                       let copy_universities = [...resume.universities]
                                       copy_universities[i].graduationYear = parseInt(val)
                                       setResume({
                                           ...resume,
                                           universities: copy_universities
                                       })
                                   }}/>
                        </div>
                        <div>
                            <Image className="delete-img" src={require("../images/delete.png")}
                                   onClick={() => {
                                       setResume({
                                           ...resume,
                                           universities: resume.universities.filter(u => u != uni)
                                       })
                                   }}
                                   onMouseOver={(e) => {
                                       //@ts-ignore
                                       e.target.src = require("../images/delete_red.png")
                                   }}
                                   onMouseOut={(e) => {
                                       //@ts-ignore
                                       e.target.src = require("../images/delete.png")
                                   }}
                            />
                        </div>
                    </div>
                )}
                {resume.education && resume.education !== educations[0] &&
                    <Btn text={"Добавить учебное заведение"} onClick={() => {
                        const copy_universities = [...resume.universities]
                        copy_universities.push({name: "", faculty: "", specialization: "", graduationYear: null})
                        setResume({
                            ...resume,
                            universities: copy_universities,
                        })
                    }}/>}

                {resume.education && <h3>Опыт работы</h3>}
                {resume.education && resume.jobs.map((j, i) =>
                    <div className="company">
                        <div>
                            <Input text={"Название компании"} value={j.companyName} setValue={(val) => {
                                let copy_jobs = [...resume.jobs]
                                copy_jobs[i].companyName = val
                                setResume({
                                    ...resume,
                                    jobs: copy_jobs
                                })
                            }}/>
                            <Input text={"Профессия"} value={j.profession} setValue={(val) => {
                                let copy_jobs = [...resume.jobs]
                                copy_jobs[i].profession = val
                                setResume({
                                    ...resume,
                                    jobs: copy_jobs
                                })
                            }}/>
                            <Input text={"Должность"} value={j.post} setValue={(val) => {
                                let copy_jobs = [...resume.jobs]
                                copy_jobs[i].post = val
                                setResume({
                                    ...resume,
                                    jobs: copy_jobs
                                })
                            }}/>

                            <Input text={"Обязанности"} value={j.todos} setValue={(val) => {
                                let copy_jobs = [...resume.jobs]
                                copy_jobs[i].todos = val
                                setResume({
                                    ...resume,
                                    jobs: copy_jobs
                                })
                            }}/>

                            <Input text={"Начало работы"} value={j.workFrom ? j.workFrom.toString() : ""} setValue={(val) => {
                                let copy_jobs = [...resume.jobs]
                                copy_jobs[i].workFrom = parseInt(val)
                                setResume({
                                    ...resume,
                                    jobs: copy_jobs
                                })
                            }}/>
                            <Input text={"Окончание работы"} value={j.workTo ? j.workTo.toString() : ""} setValue={(val) => {
                                let copy_jobs = [...resume.jobs]
                                copy_jobs[i].workTo = parseInt(val)
                                setResume({
                                    ...resume,
                                    jobs: copy_jobs
                                })
                            }}/>
                        </div>
                        <div>
                            <Image className="delete-img" src={require("../images/delete.png")}
                                   onClick={() => {
                                       setResume({
                                           ...resume,
                                           jobs: resume.jobs.filter(v => v != j)
                                       })
                                   }}
                                   onMouseOver={(e) => {
                                       //@ts-ignore
                                       e.target.src = require("../images/delete_red.png")
                                   }}
                                   onMouseOut={(e) => {
                                       //@ts-ignore
                                       e.target.src = require("../images/delete.png")
                                   }}
                            />
                        </div>
                    </div>
                )}
                {resume.education &&
                    <Btn text={"Добавить опыт работы"} onClick={() => {
                        const copy_jobs = [...resume.jobs]
                        copy_jobs.push({companyName: "", profession: "", post: "", todos: "", workFrom: null, workTo: null, resumeId: null})
                        setResume({
                            ...resume,
                            jobs: copy_jobs
                        })
                    }}/>}
                {resume.education && <TextInput value={resume.description} setValue={s => {
                    setResume({...resume, description: s})
                }} label={"О себе"}/>}
                {resume.education &&
                    <Container>
                        <Row>
                            <Col xs={4} sm={4}>
                                <h3>Ключевые навыки</h3>
                            </Col>
                            <Col xs={8} sm={8}>
                                <TagsInput
                                    tags={resume.skills}
                                    setTags={vals => {
                                        setResume({...resume, skills: [...vals]})
                                    }}
                                    display={display}
                                    setDisplay={setDisplay}
                                    text={"Навыки"}
                                    value={tag}
                                    setValue={setTag}/>
                            </Col>
                        </Row>
                    </Container>
                }
                <Btn className="publish" text={"Опубликовать резюме"} onClick={() => {
                    createResume(resume).then(() => {
                        navigate('/profile')
                    })
                }}/>
            </div>
        </div>
    );
};

export default ResumeForm;