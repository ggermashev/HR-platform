import {$host} from "./index";

export const getWorkExperiences = async () => {
    const {data} = await $host.get(`api/work_experiences/`)
    return data
}