import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import "./css/Test.css"
import Btn from "../ui/Btn";
import {setTestId} from "../redux/activeTestSlice";
import FormRadio from "../ui/FormRadio";
import {Simulate} from "react-dom/test-utils";
import copy = Simulate.copy;
import {useAppSelector} from "../hooks/reduxHooks";
import {IAnswerVariant, IQuestion, ITestResult} from "../types/types";
import {addTestResult, getTestResult} from "../http/testResultsApi";
import {getVacancy} from "../http/vacancyApi";
import {getQuestionsByVacancy} from "../http/questionApi";
import {getAnswerVariants} from "../http/answerVariantApi";

interface ITest {
    onBack: () => void,
    vacancyId: number,
    setTestResults: (tr: ITestResult) => void
}

const Test: FC<ITest> = ({onBack, vacancyId, setTestResults}) => {
    const user = useAppSelector(state => state.user)
    const [testInProgress, setTestInProgress] = useState(false)
    const [testComplited, setTestComplited] = useState(false)

    const [points, setPoints] = useState(0)
    const [questions, setQuestions] = useState<IQuestion[]>([])
    const [answers, setAnswers] = useState<IAnswerVariant[]>([])
    const [companyName, setCompanyName] = useState("")

    useEffect(() => {
        getTestResult(vacancyId, user.id).then(val => {
            if (val) {
                setTestComplited(true)
            }
        })

        getVacancy(vacancyId).then(vac => setCompanyName(vac.companyName))

        return () => {
            if (testInProgress) {
                console.log("adding test result")
                addTestResult(vacancyId, user.id, answers).then()
            }
        }

    }, [])

    useEffect(() => {
        getQuestionsByVacancy(vacancyId).then(qs => {
            const questions_: IQuestion[] = []
            console.log(qs)
            Promise.all(qs.map((q: { id: number; }) => getAnswerVariants(q.id))).then(variantss => {
                console.log(variantss)
                for (let variants of variantss) {
                    questions_.push({
                        id: variants[0].questionId,
                        question: qs.find((q: { id: any; }) => q.id = variants[0].questionId).question,
                        variants: variants
                    })
                }
                console.log(questions_)
                setAnswers(new Array(questions_.length))
                setQuestions(questions_)
            })
        })
    }, [testInProgress])

    return (
        <div>
            <div className="test">
                <div className="header">
                    <Btn text={"Назад"} onClick={() => {
                        onBack()
                    }
                    }/>
                </div>
                <div className="test-filed">
                    <h1>Тест от компании {companyName}</h1>
                    {testComplited
                        ? <h1>Вы уже прошли этот тест</h1>
                        : !testInProgress
                            ? <div>
                                <p>Нажимая на кнопку вы запустите тест,
                                    который можно пройти один раз. При закрытии или обновлении
                                    страницы результаты теста отправятся.</p>
                                <Btn text={"Начать тест"} onClick={() => {
                                    setTestInProgress(true)
                                }}></Btn>
                            </div>
                            : <div>
                                {questions.map((q, i) =>
                                    <>
                                        <h3>{q.question}</h3>
                                        <FormRadio name={q.question} variants={q.variants.map(v => v.variant)}
                                                   onChange={(e) => {
                                                       const copy_answers = [...answers]
                                                       copy_answers[i]
                                                           ? copy_answers[i].variant = e.target.value
                                                           : copy_answers[i] = {
                                                               questionId: q.id,
                                                               variant: e.target.value
                                                           }
                                                       setAnswers(copy_answers)
                                                   }
                                                   }/>

                                    </>
                                )}
                                <Btn text={"Отправить"} onClick={() => {
                                    addTestResult(vacancyId, user.id, answers).then(val => {
                                        setTestInProgress(false)
                                        onBack()
                                    })
                                }}/>
                            </div>
                    }

                </div>
            </div>

        </div>
    );
};

export default Test;