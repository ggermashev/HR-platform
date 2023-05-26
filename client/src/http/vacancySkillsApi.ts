import {$host} from "./index";

export const getVacancySkills = async (vacancyId: number) => {
    const {data} = await $host.get(`api/vacancy_skills/${vacancyId}`)
    return data
}