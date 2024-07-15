import {$authHost, $host} from "./index";


export const createAlert = async (alert) => {
    const {data} = await $authHost.post('api/alert', alert)
    return data
}

export const fetchAlerts = async (title,text,dispt,div,compl,im,ot,phone,userId,mailingId) => {
    const {data} = await $host.get('api/alert', {params: {
        title,text,dispt,div,compl,im,ot,phone,userId,mailingId
        }})
    return data
}

export const fetchOnealert = async (id) => {
    const {data} = await $host.get('api/alert/' + id)
    return data
    
}
