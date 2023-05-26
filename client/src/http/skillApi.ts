import {$host} from "./index";

export const getSkills = async () => {
    const {data} = await $host.get(`api/skills/`)
    return data
}