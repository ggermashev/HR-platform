import {$host} from "./index"

export const getContact = async (contactId: number) => {
    const {data} = await $host.get(`api/contacts/${contactId}`)
    return data
}

export const getContactsByVacancy = async (vacancyId: number) => {
    const {data} = await $host.get(`api/contacts/by_vacancy/${vacancyId}`)
    return data
}

export const getContactsByResume = async (resumeId: number) => {
    const {data} = await $host.get(`api/contacts/by_resume/${resumeId}`)
    return data
}


