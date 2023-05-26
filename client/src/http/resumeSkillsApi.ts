import {$host} from "./index";

export const getResumeSkills = async (resumeId: number) => {
    const {data} = await $host.get(`api/resume_skills/${resumeId}`)
    return data
}