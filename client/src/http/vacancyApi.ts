import {$host} from "./index";
import {IResume, IVacancy} from "../types/types";

export const getVacancy = async (vacancyId: number) => {
    const {data} = await $host.get(`api/vacancies/${vacancyId}`)
    return data
}

export const getVacancies = async () => {
    const {data} = await $host.get(`api/vacancies/`)
    return data
}

export const getVacanciesByUser = async (userId: number) => {
    const {data} = await $host.get(`api/vacancies/by_user/${userId}`)
    return data
}

export const createVacancy = async (resume: IVacancy) => {
    const {data} = await $host.post(`api/vacancies`, resume)
    return data
}

export const updateVacancy = async (vacancyId: number, vacancy: IVacancy) => {
    const {data} = await $host.put(`api/vacancies/${vacancyId}`, vacancy)
    return data
}

export const deleteVacancy = async (vacancyId: number) => {
    const {data} = await $host.delete(`api/vacancies/${vacancyId}`)
    return data
}