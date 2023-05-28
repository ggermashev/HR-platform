import React, {FC, useEffect, useState} from 'react';
import {ISkill, IVacancy} from "../types/types";
import TagsContainer from "../ui/TagsContainer";
import {getResumeSkills} from "../http/resumeSkillsApi";
import {getSkillById} from "../http/skillApi";
import {getVacancySkills} from "../http/vacancySkillsApi";

const Vacancy: FC<{data: IVacancy}> = ({data}) => {

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
            <h2>{data?.companyName}</h2>
            <h2>{data?.profession} - {data?.post}</h2>
            <p>{data?.city}</p>
            <p>{data?.salary}</p>
            <p>{data?.workExperience}</p>
            <p>{data?.todos}</p>
            <p>{data?.requirements}</p>
            <p>{data?.desirable}</p>
            <p>{data?.offer}</p>
            <h3>Ключевые навыки</h3>
            <TagsContainer tags={skills ? skills.map(s => s.skill) : []}/>
        </div>
    );
};

export default Vacancy;