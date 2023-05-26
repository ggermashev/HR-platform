import {$host} from "./index"

export const getJobsByResume = async (resumeId: number) => {
    const {data} = await $host.get(`api/jobs/${resumeId}`)
    return data
}
