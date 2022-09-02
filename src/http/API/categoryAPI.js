import {$host} from "../index";

/* Работа с категориями */
export const createCategory = async (object) => {
    const {data} = await $host.post('api/category', {name: object.value}, {headers: {authorization: object.role}})
    return data
}

export const changeCategoryName = async (role, name, id) => {
    const {data} = await $host.post('api/category/changename', {name, id}, {headers: {authorization: role}})
    return data
}

export const deleteCategory = async (role, id) => {
    const {data} = await $host.post('api/category/delete', {id}, {headers: {authorization: role}})
    return data
}

export const fetchCategories = async () => {
    const {data} = await $host.get('api/category')
    return data
}