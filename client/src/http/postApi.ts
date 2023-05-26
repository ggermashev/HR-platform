import {$host} from "./index"

export const getPosts = async () => {
    const {data} = await $host.get('api/posts')
    return data
}

export const getPostsByProfession = async (professionId: number) => {
    const {data} = await $host.get(`api/posts/${professionId}`)
    return data
}