import {$host} from "./index"

export const getEducations = async () => {
    const {data} = await $host.get(`api/educations`)
    return data
}