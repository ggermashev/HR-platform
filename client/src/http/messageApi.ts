import {$host} from "./index"

export const getMessages = async (contactId: number) => {
    const {data} = await $host.get(`api/messages/${contactId}`)
    return data
}

export const sendMessage = async (message: string, userIdFrom: number, userIdTo: number, contactId: number) => {
    const {data} = await $host.post(`api/messages/`, {message, userIdFrom, userIdTo, contactId})
    return data
}

export const deleteMessage = async (messageId: number) => {
    const {data} = await $host.delete(`api/messages/${messageId}`)
    return data
}

export const changeMessage = async (messageId: number, message: string) => {
    const {data} = await $host.put(`api/messages/${messageId}`, {message})
    return data
}