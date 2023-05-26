import {$host} from "./index";

export const getProfessions = async () => {
    const {data} = await $host.get(`api/professions`)
    return data
}