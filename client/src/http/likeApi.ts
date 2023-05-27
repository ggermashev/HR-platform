import {$host} from "./index"

export const setLike = async (resumeId: number, vacancyId: number, status: string, role: string) => {
    if (resumeId === 0 || vacancyId === 0) {
        return null
    }
    const {data} = await $host.post(`api/likes`, {resumeId, vacancyId, status: status, role})
    return data
}