import {$host} from "./index";

export const getUniversities = async (resumeId: number) => {
    const {data} = await $host.get(`api/universities/${resumeId}`)
    return data
}