import React, {FC, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import "./css/Test.css"
import Btn from "../ui/Btn";
import {setTestId} from "../redux/activeTestSlice";
import FormRadio from "../ui/FormRadio";
import {Simulate} from "react-dom/test-utils";
import copy = Simulate.copy;

interface ITest {
    onBack: () => void
}

const Test: FC<ITest> = ({onBack}) => {
    // @ts-ignore
    const testId = useSelector(state => state.activeTest.id)
    const dispatch = useDispatch()
    const [testInProgress, setTestInProgress] = useState(false)
    const questions = [
        {
            question: "Вопрос1?",
            variants: ["1", "2", "3", "4"]
        },
        {
            question: "Вопрос2?",
            variants: ["1", "2", "3", "4"]
        },
        {
            question: "Вопрос3?",
            variants: ["1", "2", "3", "4"]
        },
        {
            question: "Вопрос4?",
            variants: ["1", "2", "3", "4"]
        },
        {
            question: "Вопрос5?",
            variants: ["1", "2", "3", "4"]
        },
        {
            question: "Вопрос6?",
            variants: ["1", "2", "3", "4"]
        },
    ]
    const [answers, setAnswers] = useState(new Array(questions.length).fill(""))
    return (
        <div>
            {testId !== -1
                ? <div className="test">
                    <div className="header">
                        <Btn text={"Назад"} onClick={() => {
                            dispatch(setTestId(-1))
                            onBack()
                        }
                        }/>
                    </div>
                    <div className="test-filed">
                        <h1>Тест от компании X</h1>
                        {!testInProgress
                            ? <div>
                                <p>Нажимая на кнопку вы запустите тест,
                                    который продлиться 10 минут</p>
                                <Btn text={"Начать тест"} onClick={() => {
                                    setTestInProgress(true)
                                }}></Btn>
                            </div>
                            : <div>
                                {questions.map((q, i) =>
                                    <>
                                        <h3>{q.question}</h3>
                                        <FormRadio name={q.question} variants={q.variants} onChange={(e) => {
                                            let copyAnswers = answers
                                            copyAnswers[i] = e.target.value
                                            setAnswers(copyAnswers)
                                        }
                                        }/>

                                    </>
                                )}
                                <Btn text={"Отправить"} onClick={() => {console.log(answers)}}/>
                            </div>
                        }

                    </div>
                </div>
                : <>
                </>
            }
        </div>
    );
};

export default Test;