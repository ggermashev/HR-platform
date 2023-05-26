import {useSelector} from "react-redux";
import {IResume, IUser, IVacancy} from "../types/types";

// export async function isUser(key: string) {
//     const response = await fetch(`/api/isUser/${key}/`)
//     const isUser = response.ok
//     return isUser
// }

//Список контактов (они же мэтчи)
export async function getContacts(userId: number) {
    const response = await fetch(`/api/contacts/${userId}`)
    const json = await response.json()
    return json
}

//Отдельный мэтч
export async function getContact(id: number) {
    const response = await fetch(`/api/contact/${id}/`)
    const json = await response.json()
    return json
}

//Отправить сообщение
export async function sendMessage(chatId: number, msg: string) {
    const response = await fetch(`api/chats/${chatId}/`,{
        method: 'POST',
        body: JSON.stringify({message: msg})
    })
    const status = response.ok
    return status
}

//Профессии
export async function getProfessions() {
    const response = await fetch(`/api/professions/`)
    const json = await response.json()
    return json
}

//Должности
export async function getPosts(professionId: string) {
    const response = await fetch(`/api/posts/${professionId}/`)
    const json = await response.json()
    return json
}

//Города
export async function getCities() {
    const response = await fetch(`/api/cities/`)
    const json = await response.json()
    return json
}

//Опыты работы (не важен. меньше 1 года, 1-3 и т.д)
export async function getWorkExperiences() {
    const response = await fetch(`/api/workExperiences/`)
    const json = await response.json()
    return json
}

export async function getEducations() {
    const response = await fetch(`/api/educations/`)
    const json = await response.json()
    return json
}

//Получить все ключевые навыки
export async function getSkills() {
    const response = await fetch(`api/skills/`)
    const json = await response.json()
    return json
}

//Получить ключевы навыки по шаблону
export async function getSimilarSkills(str: string) {
    const response = await fetch(`api/skills/${str}/`)
    const json = await response.json()
    return json
}

//Подтаскиваются резюме
export async function getResumes(userKey = "") {
    const response = await fetch(`/api/resumes/${userKey}/`)
    const json = await response.json()
    return json
}

//получить отдельное резюме
export async function getResume(resumeId: number) {
    const response = await fetch(`/api/resumes/${resumeId}/`)
    const json = await response.json()
    return json
}

//Добавить резюме
export async function createResume(resume: IResume) {
    const response = await fetch(`/api/resumes/`, {
        method: 'POST',
        body: JSON.stringify(resume)
    })
    return response.ok
}

//Подтаскиваются вакансии
export async function getVacancies(userKey = "") {
    const response = await fetch(`/api/vacancies/${userKey}/`)
    const json = await response.json()
    return json
}

//Получить отдельную вакансию
export async function getVacancy(vacancyId: number) {
    const response = await fetch(`/api/vacancies/${vacancyId}/`)
    const json = await response.json()
    return json
}

//Добавить вакансию
export async function createVacancy(vacancy: IVacancy) {
    const response = await fetch(`/api/vacancies/`, {
        method: 'POST',
        body: JSON.stringify(vacancy)
    })
    return response.ok
}

//Получить вопросы теста
export async function getTest(vacancyId: number) {
    const response = await fetch(`api/tests/${vacancyId}/`)
    const json = await response.json()
    return json
}

//Лайк резюме
export async function setLike(vacancyId: number, resumeId: number, status: "like" | "dislike") {
    const response = await fetch('/api/likes/', {
        method: 'POST',
        body: JSON.stringify({vacancyId: vacancyId, resumeID: resumeId, status: status})
    })
    return response.ok
}

//Получить данные пользователя
export async function getUser(userKey: string) {
    const response = await fetch(`/api/users/${userKey}/`)
    const json = await response.json()
    return json
}

export async function getUserById(userId: number) {
    const response = await fetch(`/api/users/${userId}/`)
    const json = await response.json()
    return json
}


//Вход в аккаунт
export async function logIn(login_: string, password: string) {
    const response = await fetch('/api/login/', {
        method: 'POST',
        body: JSON.stringify({login: login_, password: password})
    })
    const json = await response.json()
    return json
}


//Регистрация
export async function createAccount(data: IUser) {
    const response = await fetch(`/api/registration/`, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    return response.ok
}





