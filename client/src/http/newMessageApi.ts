import {$host} from "./index"

export const addNewMessage = async (contactId: number, userId: number) => {
    const {data} = await $host.post(`api/new_messages/${contactId}/${userId}`)
    return data
}

export const deleteNewMessage = async (contactId: number, userId: number) => {
    const {data} = await $host.delete(`api/new_messages/${contactId}/${userId}`)
    return data
}

export const getNewMessages = async (userId: number) => {
    const {data} = await $host.get(`api/new_messages/${userId}`)
    return data
}

