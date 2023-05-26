import {$host} from "./index"

export const setLike = async (resumeId: number, vacancyId: number, status: string) => {
    const {data} = await $host.post(`api/likes`, {resumeId, vacancyId, status})
    return data
}