import React, {useEffect, useState} from 'react';
import Input from "../ui/Input";
import "./css/VacancyForm.css"
import TextInput from "../ui/TextInput";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import TagsInput from "../ui/TagsInput";
import SelectInput from "../ui/SelectInput";
import Btn from "../ui/Btn";
import {IAnswerVariant, IQuestion, IVacancy, IWorkExperience} from "../types/types";
import FormRadio from "../ui/FormRadio";
import {useSelector} from "react-redux";
import {useAppSelector} from "../hooks/reduxHooks";
import {createVacancy} from "../http/vacancyApi";
import {useNavigate} from "react-router-dom";
import resume from "./Resume";
import {getWorkExperiences} from "../http/workExperienceApi";

const VacancyForm = () => {

    const user = useAppSelector(state => state.user)
    const [experiences, setExperiences] = useState<IWorkExperience[]>([])

    useEffect(() => {
        getWorkExperiences().then(vals => {
            console.log(experiences)
            setExperiences(vals)
        })
    }, [])

    const [vacancy, setVacancy] = useState<IVacancy>({
        userId: user.id,
        companyName: "",
        profession: "",
        post: "",
        city: "",
        salary: 0,
        workExperience: "",
        todos: "",
        requirements: "",
        desirable: "",
        offer: "",
        skills: [],
        questions: [],
        // answerVariants: []
    })

    const [tag, setTag] = useState("")
    const [display, setDisplay] = useState("none")
    const navigate = useNavigate()

    return (
        <div className="vacancy-form" onClick={() => {
            setDisplay("none")
        }}>
            <h3>Создание вакансии</h3>
            <div className="form-container">
                <Input text={"Название компании"} value={vacancy.companyName} setValue={s => {
                    setVacancy({...vacancy, companyName: s})
                }}/>
                <Input text={"Профессия"} value={vacancy.profession}
                       setValue={s => setVacancy({...vacancy, profession: s})}/>
                <Input text={"Должность"} value={vacancy.post} setValue={s => setVacancy({...vacancy, post: s})}/>
                <Input text={"Город"} value={vacancy.city} setValue={s => setVacancy({...vacancy, city: s})}/>
                <Input text={"Зарплата"} value={vacancy.salary ? vacancy.salary.toString() as string : ""}
                       setValue={s => {
                           setVacancy({...vacancy, salary: parseInt(s)})
                       }}/>
                <SelectInput default_={"Опыт не важен"}
                             options={experiences.map(e => e.workExperience)}
                             setValue={s => {
                                 setVacancy({...vacancy, workExperience: s})
                             }}/>
                <TextInput value={vacancy.todos} setValue={s => {
                    setVacancy({...vacancy, todos: s})
                }} label={"Обязанности"}/>
                <TextInput value={vacancy.requirements} setValue={s => {
                    setVacancy({...vacancy, requirements: s})
                }} label={"Требования"}/>
                <TextInput value={vacancy.desirable} setValue={s => {
                    setVacancy({...vacancy, desirable: s})
                }} label={"Будет плюсом"}/>
                <TextInput value={vacancy.offer} setValue={s => {
                    setVacancy({...vacancy, offer: s})
                }} label={"Мы предлагаем"}/>
                <Container>
                    <Row>
                        <Col xs={4} sm={4}>
                            <h3>Ключевые навыки</h3>
                        </Col>
                        <Col xs={8} sm={8}>
                            <TagsInput tags={vacancy.skills}
                                       setTags={s => setVacancy({...vacancy, skills: [...s]})}
                                       display={display}
                                       setDisplay={setDisplay} text={"Навыки"} value={tag}
                                       setValue={setTag}/>
                        </Col>
                    </Row>
                </Container>

                {vacancy.questions.map((q, i) =>
                    <div key={q.id}
                         style={{display: "flex", flexDirection: "row", justifyContent: "top", width: "100%"}}>
                        <div style={{width: "100%"}}>
                            <TextInput value={q.question} setValue={(val) => {
                                let copy_questions = [...vacancy.questions]
                                copy_questions[i].question = val
                                setVacancy({...vacancy, questions: copy_questions})
                            }} label={"Вопрос"}/>
                            <FormRadio name={"variants"}
                                       variants={
                                           q.variants.map((v, j) =>
                                               <div key={j} style={{display: "flex", flexDirection: "row"}}>
                                                   <Input text={"Вариант ответа"} value={v.variant} setValue={val => {
                                                       let copy_questions = [...vacancy.questions]
                                                       copy_questions[i].variants[j].variant = val
                                                       setVacancy({...vacancy, questions: copy_questions})

                                                   }}/>
                                                   <Image className="delete-img" src={require("../images/delete.png")}
                                                          onClick={() => {
                                                              let copy_questions = [...vacancy.questions]
                                                              copy_questions[i].variants = copy_questions[i].variants.filter((vr, k) => j != k)
                                                              setVacancy({...vacancy, questions: copy_questions})
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
                                           )
                                       }
                                       values={q.variants.map(variant => variant.variant)}
                                       onChange={(e) => {
                                           let copy_questions = [...vacancy.questions]
                                           copy_questions[i].answer = e.target.value
                                           setVacancy({...vacancy, questions: copy_questions})
                                       }}/>
                            <Btn className="add-variant" text={"Добавить вариант ответа"} onClick={() => {
                                let copy_questions = [...vacancy.questions]
                                copy_questions[i].variants.push({questionId: q.id as number, variant: ""})
                                setVacancy({...vacancy, questions: copy_questions})
                            }
                            }/>
                        </div>
                        <div>
                            <Image className="delete-img" src={require("../images/delete.png")}
                                   onClick={() => {
                                       setVacancy({
                                           ...vacancy,
                                           questions: vacancy.questions.filter(quest => quest != q)
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

                <div>
                    <Btn text={"Добавить тестовый вопрос"} onClick={() => {
                        setVacancy({
                            ...vacancy,
                            questions: [...vacancy.questions, {question: "", variants: [], answer: ""}]
                        })
                        // setQuestions([...questions, {question: "", variants: [], answer: "", vacancyId: 0}])
                    }}/>
                </div>
                <Btn className="publish" text={"Опубликовать вакансию"} onClick={() => {
                    console.log(vacancy)
                    createVacancy(vacancy).then(() => {
                        navigate('/profile')
                    })
                }}/>
            </div>
        </div>
    );
};

export default VacancyForm;