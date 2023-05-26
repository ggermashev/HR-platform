import {$host} from "./index";

export const getQuestionsByVacancy = async (vacancyId: number) => {
    const {data} = await $host.get(`api/questions/${vacancyId}`)
    return data
}