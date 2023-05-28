import {$host} from "./index";

export const getAllSkills = async () => {
    const {data} = await $host.get(`api/skills`)
    return data
}

export const getSkillById = async (skillId: number) => {
    const {data} = await $host.get(`api/skills/by_id/${skillId}`)
    return data
}

export const getSimilarSkills = async (value: string) => {
    const {data} = await $host.get(`api/skills/${value}`)
    return data
}

