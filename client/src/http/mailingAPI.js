import {$authHost, $host} from "./index";


export const createMailing = async (alert) => {
    const {data} = await $authHost.post('api/mailing', alert)
    return data
}

export const fetchMailing = async (title,text,dispt,div) => {
    const {data} = await $host.get('api/alemailingrt', {params: {
        title,text,dispt,div
        }})
    return data
}

export const fetchOneMailing= async (id) => {
    const {data} = await $host.get('api/mailing/' + id)
    return data
    
}
