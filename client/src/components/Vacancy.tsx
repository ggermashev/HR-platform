import React, {FC} from 'react';
import {IVacancy} from "../types/types";
import TagsContainer from "../ui/TagsContainer";

const Vacancy: FC<{data: IVacancy}> = ({data}) => {
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
            <TagsContainer tags={data?.skills}/>
        </div>
    );
};

export default Vacancy;