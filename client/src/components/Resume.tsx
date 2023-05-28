import React, {FC, Fragment, useEffect, useState} from 'react';
import "./css/Resume.css"
import TagsContainer from "../ui/TagsContainer";
import {IJob, IResume, ISkill, IUniversity} from "../types/types";
import {getUniversities} from "../http/universityApi";
import {getJobsByResume} from "../http/jobApi";
import {getResumeSkills} from "../http/resumeSkillsApi";
import {getSkillById} from "../http/skillApi";


const Resume: FC<{data: IResume}> = ({data}) => {

    const [universities, setUniversities] = useState<IUniversity[]>()
    const [jobs, setJobs] = useState<IJob[]>()
    const [skills, setSkills] = useState<ISkill[]>()

    useEffect(() => {
        if (data && data.id) {
            getUniversities(data.id).then(vals => {
                setUniversities(vals)
            })
            getJobsByResume(data.id).then(vals => {
                setJobs(vals)
            })
            getResumeSkills(data.id).then(vals => {
                Promise.all(vals.map((v: { skillId: number; }) => getSkillById(v.skillId))).then(vals => {
                    setSkills(vals)
                })
            })
        }
    }, [])

    return (
        <div className="resume">
            <h3>Основная информация</h3>
            <div className="info-container">
                <div className="line">
                    <div><p>Город:</p></div>
                    <div><p>{data?.city}</p></div>
                </div>
                <div className="line">
                    <div><p>Желаемая зарплата:</p></div>
                    <div><p>{data?.salary}</p></div>
                </div>
                <div className="line">
                    <div><p>Образование:</p></div>
                    <div><p>{data?.education}</p></div>
                </div>
            </div>
            {universities && universities.map(u =>
                <Fragment key={u.id}>
                    <h3>Учебное заведение</h3>
                    <div className="info-container">
                        <div className="line">
                            <div><p>Название:</p></div>
                            <div><p>{u?.name}</p></div>
                        </div>
                        <div className="line">
                            <div><p>Факультет:</p></div>
                            <div><p>{u?.faculty}</p></div>
                        </div>
                        <div className="line">
                            <div><p>Специализация:</p></div>
                            <div><p>{u?.specialization}</p></div>
                        </div>
                        <div className="line">
                            <div><p>Год окончания:</p></div>
                            <div><p>{u?.graduationYear}</p></div>
                        </div>
                    </div>
                </Fragment>
            )}
            {jobs && jobs.map(j =>
                <Fragment key={j.id}>
                    <h3>Опыт работы</h3>
                    <div className="info-container">
                        <div className="line">
                            <div><p>Название компании:</p></div>
                            <div><p>{j?.companyName}</p></div>
                        </div>
                        <div className="line">
                            <div><p>Профессия:</p></div>
                            <div><p>{j?.profession}</p></div>
                        </div>
                        <div className="line">
                            <div><p>Должность:</p></div>
                            <div><p>{j?.post}</p></div>
                        </div>
                        <div className="line">
                            <div><p>Обязанности:</p></div>
                            <div><p>{j?.todos}</p></div>
                        </div>
                        <div className="line">
                            <div><p>Начало работы:</p></div>
                            <div><p>{j?.workFrom}</p></div>
                        </div>
                        <div className="line">
                            <div><p>Окончание работы:</p></div>
                            <div><p>{j?.workTo}</p></div>
                        </div>
                    </div>
                </Fragment>
            )}
            <h3>О себе</h3>
            <div className="info">
                <p>{data?.description}</p>
            </div>
            <h3>Ключевые навыки</h3>
            <TagsContainer tags={skills ? skills.map(s => s.skill) : []}/>
        </div>
    );
};

export default Resume;