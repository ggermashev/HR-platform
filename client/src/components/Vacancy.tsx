import React, {FC, useEffect, useState} from 'react';
import {ISkill, IVacancy} from "../types/types";
import TagsContainer from "../ui/TagsContainer";
import {getResumeSkills} from "../http/resumeSkillsApi";
import {getSkillById} from "../http/skillApi";
import {getVacancySkills} from "../http/vacancySkillsApi";
import "./css/Vacancy.css"

const Vacancy: FC<{ data: IVacancy }> = ({data}) => {

    const [skills, setSkills] = useState<ISkill[]>()
    useEffect(() => {
        getVacancySkills(data.id as number).then(vals => {
            Promise.all(vals.map((v: { skillId: number; }) => getSkillById(v.skillId))).then(vals => {
                setSkills(vals)
            })
        })
    }, [])

    return (
        <div className="vacancy">

            <h3>{data?.companyName}: {data?.profession} - {data?.post}</h3>

            <div className="info-container">
                <div className="line">
                    <p>Зарплата:</p>
                    <p>{data?.salary}</p>
                </div>
                <div className="line">
                    <p>Требуемый опыт работы:</p>
                    <p> {data?.workExperience}</p>
                </div>
            </div>

            <h3>Обязанности</h3>
            <div className="info-container">
                <div className="line">
                    <p>{data?.todos}</p>
                </div>
            </div>

            <h3>Требования</h3>
            <div className="info-container">
                <div className="line">
                    <p>{data?.requirements}</p>
                </div>
            </div>

            <h3>Желательно</h3>
            <div className="info-container">
                <div className="line">
                    <p>{data?.desirable}</p>
                </div>
            </div>

            <h3>Мы предлагаем</h3>
            <div className="info-container">
                <div className="line">
                    <p>{data?.offer}</p>
                </div>
            </div>

            <div className="line">
                <h3>Ключевые навыки</h3>
            </div>
            <TagsContainer tags={skills ? skills.map(s => s.skill) : []}/>
        </div>
    );
};

export default Vacancy;