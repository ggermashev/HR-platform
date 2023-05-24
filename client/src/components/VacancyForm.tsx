import React, {useState} from 'react';
import Input from "../ui/Input";
import "./css/VacancyForm.css"
import TextInput from "../ui/TextInput";
import {Button, Col, Container, Image, Row} from "react-bootstrap";
import TagsInput from "../ui/TagsInput";
import SelectInput from "../ui/SelectInput";
import Btn from "../ui/Btn";
import {IQuestion, IVacancy} from "../types/types";
import FormRadio from "../ui/FormRadio";
import {useSelector} from "react-redux";
import {useAppSelector} from "../hooks/reduxHooks";
import {createTest, createVacancy} from "../api/Api";

const VacancyForm = () => {

    const user = useAppSelector(state => state.user)
    const experiences = useAppSelector(state => state.experiences)
    const [vacancy, setVacancy] = useState<IVacancy>({
        ownerId: user.id,
        companyName: "",
        profession: "",
        post: "",
        city: "",
        salary: null,
        workExperience: "",
        todos: "",
        requirements: "",
        desirable: "",
        offer: "",
        skills: [],
    })

    const [tag, setTag] = useState("")
    const [questions, setQuestions] = useState<IQuestion[]>([])
    const [display, setDisplay] = useState("none")

    return (
        <div className="vacancy-form" onClick={() => {
            setDisplay("none")
        }}>
            <h3>Создание вакансии</h3>
            <div className="form-container">
                <Input text={"Название компании"} value={vacancy.companyName} setValue={s => {
                    setVacancy({...vacancy, companyName: s})
                }}/>
                <Input text={"Должность"} value={vacancy.post} setValue={s => setVacancy({...vacancy, post: s})}/>
                <Input text={"Зарплата"} value={vacancy.salary?.toString() as string} setValue={s => {
                    setVacancy({...vacancy, salary: parseInt(s)})
                }}/>
                <SelectInput default_={"Опыт не важен"}
                             options={experiences.values}
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
                            <TagsInput tags={vacancy.skills} setTags={s => setVacancy({...vacancy, skills: [...s]})}
                                       display={display} setDisplay={setDisplay} text={"Навыки"} value={tag}
                                       setValue={setTag}/>
                        </Col>
                    </Row>
                </Container>

                {questions.map((q, i) =>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "top", width: "100%"}}>
                        <div style={{width: "100%"}}>
                            <TextInput value={q.question} setValue={(val) => {
                                let copy_questions = [...questions]
                                copy_questions[i].question = val
                                setQuestions(copy_questions)
                            }} label={"Вопрос"}/>
                            <FormRadio name={"variants"}
                                       variants={
                                           q.variants.map((v, j) =>
                                               <div key={j} style={{display: "flex", flexDirection: "row"}}>
                                                   <Input text={"Вариант ответа"} value={v} setValue={val => {
                                                       let copy_questions = [...questions]
                                                       copy_questions[i].variants[j] = val
                                                       setQuestions(copy_questions)
                                                   }}/>
                                                   <Image className="delete-img" src={require("../images/delete.png")}
                                                          onClick={() => {
                                                              let copy_questions = [...questions]
                                                              copy_questions[i].variants = copy_questions[i].variants.filter((vr, k) => j != k)
                                                              setQuestions(copy_questions)
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
                                       values={q.variants}
                                       onChange={(e) => {
                                           let copy_questions = [...questions]
                                           copy_questions[i].answer = e.target.id
                                           setQuestions(copy_questions)
                                       }}/>
                            <Btn className="add-variant" text={"Добавить вариант ответа"} onClick={() => {
                                let copy_questions = [...questions]
                                copy_questions[i].variants.push("")
                                setQuestions(copy_questions)
                            }
                            }/>
                        </div>
                        <div>
                            <Image className="delete-img" src={require("../images/delete.png")}
                                   onClick={() => {
                                       setQuestions(questions.filter(quest => quest != q))
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

                <Btn text={"Добавить тестовый вопрос"} onClick={() => {
                    setQuestions([...questions, {question: "", variants: [], answer: ""}])
                }}/>
                <Btn className="publish" text={"Опубликовать вакансию"} onClick={() => {
                    createVacancy(vacancy).then()
                    createTest({questions: questions}).then()
                }}/>
            </div>
        </div>
    );
};

export default VacancyForm;