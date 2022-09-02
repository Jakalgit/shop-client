import {$host} from "../index";

/* Работа с категориями */
export const createDownCategory = async (object) => {
    const {data} = await $host.post('api/categorydown', {name: object.value, categoryId: object.categoryId}, {headers: {authorization: object.role}})
    return data
}

export const changeNameCategoryDown = async (role, name, id) => {
    const {data} = await $host.post('api/categorydown/changename', {name, id}, {headers: {authorization: role}})
    return data
}

export const deleteCategoryDown = async (role, id) => {
    const {data} = await $host.post('api/categorydown/delete', {id}, {headers: {authorization: role}})
    return data
}

export const fetchDownCategories = async () => {
    const {data} = await $host.get('api/categorydown')
    return data
}