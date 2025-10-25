import {$authHost, $host} from "./index.js";


export const createMailing = async (alert) => {
    const {data} = await $authHost.post('api/mailing', alert)
    return data
}

export const fetchMailings = async (title,text,div,date) => {
    const {data} = await $host.get('api/mailing', {params: {
        title,text,div,date
        }})
    return data
}

export const fetchOneMailing= async (id) => {
    const {data} = await $host.get('api/mailing/' + id)
    return data
    
}
