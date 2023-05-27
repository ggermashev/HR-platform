import {$host} from "./index";
import {IAnswerVariant} from "../types/types";

export const getTestResult = async (vacancyId: number, userId: number) => {
    const {data} = await $host.get(`api/test_results/${vacancyId}/${userId}`)
    return data
}

export const addTestResult = async (vacancyId: number, userId: number, answers: IAnswerVariant[]) => {
    const {data} = await $host.post(`api/test_results/`, {vacancyId, userId, answers})
    return data
}