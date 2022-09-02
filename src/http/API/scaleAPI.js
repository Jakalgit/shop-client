import {$host} from "../index";

export const createScale = async (role, value) => {
    const {data} = await $host.post('api/scale/', {value}, {headers: {authorization: role}})
    return data
}

export const fetchScales = async () => {
    const {data} = await $host.get('api/scale/all/')
    return data
}

export const changeScale = async (role, value, id) => {
    const {data} = await $host.post('api/scale/change/', {value, id}, {headers: {authorization: role}})
    return data
}

export const deleteScale = async (role, id) => {
    const {data} = await $host.post('api/scale/delete/', {id}, {headers: {authorization: role}})
    return data
}