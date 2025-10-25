import {$authHost, $host} from "./index.js";


export const createAlert = async (alert) => {
    const {data} = await $authHost.post('api/alert', alert)
    return data
}

export const fetchAlerts = async (title,text,dispt,div,compl,im,ot,phone,mounth,date) => {
    const {data} = await $host.get('api/alert', {params: {
        title,text,dispt,div,compl,im,ot,phone,mounth,date
        }})
    return data
}

export const fetchOnealert = async (id) => {
    const {data} = await $host.get('api/alert/' + id)
    return data
    
}
