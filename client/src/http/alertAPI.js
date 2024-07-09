import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/type')
    return data
}

export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', brand)
    return data
}

export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand', )
    return data
}

export const createАlert = async (alert) => {
    const {data} = await $authHost.post('api/alert', alert)
    return data
}

export const fetchAlerts = async (typeId, brandId) => {
    const {data} = await $host.get('api/alert', {params: {
            typeId, brandId
        }})
    return data
}

export const fetchOnealert = async (id) => {
    const {data} = await $host.get('api/alert/' + id)
    return data
}
