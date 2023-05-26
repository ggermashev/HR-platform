import {$host} from "./index";
import {IResume} from "../types/types";

export const getResume = async (resumeId: number) => {
    const {data} = await $host.get(`api/resumes/${resumeId}`)
    return data
}

export const getResumesByUser = async (userId: number) => {
    const {data} = await $host.get(`api/resumes/by_user/${userId}`)
    return data
}

export const getResumes = async () => {
    const {data} = await $host.get(`api/resumes/`)
    return data
}

export const createResume = async (resume: IResume) => {
    const {data} = await $host.post(`api/resumes/`, resume)
    return data
}

export const updateResume = async (resumeId: number, resume: IResume) => {
    const {data} = await $host.put(`api/resumes/${resumeId}`, resume)
    return data
}

export const deleteResume = async (resumeId: number) => {
    const {data} = await $host.delete(`api/resumes/${resumeId}`)
    return data
}
