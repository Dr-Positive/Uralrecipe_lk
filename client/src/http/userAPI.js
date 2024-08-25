import {$authHost, $host} from "./index";
import { jwtDecode } from 'jwt-decode';


export const logining = async (login, password) => {
    const {data} = await $host.post('api/user/logining', {login, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const hashPasswords = async () => {
    const { data } = await $host.post('api/user/hash-passwords');
    return data;
};  