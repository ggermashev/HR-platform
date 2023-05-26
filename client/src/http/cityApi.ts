import {$host} from "./index"

export const getCities = async () => {
    const {data} = await $host.get('api/cities')
    return data
}
