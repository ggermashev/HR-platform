import {$authHost, $host} from "./index"
import jwt_decode from "jwt-decode"

export const registration = async (user) => {
    const {data} = await $host.post('api/user/registration', user)
    // localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (login, password) => {
    const {data} = await $host.post('api/user/login', {login, password})
    console.log(data)
    localStorage.setItem('token', data)
    return jwt_decode(data)
}

export const isAuth = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data)
}