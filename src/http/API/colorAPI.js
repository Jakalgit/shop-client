import {$host} from "../index";

/* Работа с цветами */
export const createItemColor = async (formData, role) => {
    const {data} = await $host.post('api/color/', formData, {headers: {authorization: role}})
    return data
}

export const changeImg_1 = async (formData, role) => {
    const {data} = await $host.post('api/color/change/img1', formData, {headers: {authorization: role}})
    return data
}

export const changeImg_2 = async (formData, role) => {
    const {data} = await $host.post('api/color/change/img2', formData, {headers: {authorization: role}})
    return data
}

export const changeImg_3 = async (formData, role) => {
    const {data} = await $host.post('api/color/change/img3', formData, {headers: {authorization: role}})
    return data
}

export const changeImg_4 = async (formData, role) => {
    const {data} = await $host.post('api/color/change/img4', formData, {headers: {authorization: role}})
    return data
}

export const deleteColor = async (id, role) => {
    const {data} = await $host.post('api/color/delete', {id}, {headers: {authorization: role}})
    return data
}

export const fetchColor = async (id) => {
    const {data} = await $host.get('api/color/get/' + id)
    return data
}

export const fetchAllColor = async (itemId) => {
    const {data} = await $host.get('api/color/', {params: {itemId}})
    return data
}

export const fetchFullColors = async (role) => {
    const {data} = await $host.get('api/color/full', {headers: {authorization: role}})
    return data
}