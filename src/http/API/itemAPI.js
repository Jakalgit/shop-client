import {$host} from "../index";

/* Работа с товарами */
export const createItem = async (object) => {
    const {data} = await $host.post('api/item', object.formData, {headers: {authorization: object.role}})
    return data
}

export const fetchFullItems = async (role) => {
    const {data} = await $host.get('api/item/all', {headers: {authorization: role}})
    return data
}

export const fetchItems = async () => {
    const {data} = await $host.get('api/item/')
    return data
}

export const fetchPageItems = async (categoryId, categoryDownId, brandId, scaleId, availability, visibility, discount_flag, page) => {
    const {data} = await $host.get('api/item/page', {params: {
            categoryId, categoryDownId, brandId, scaleId, availability, visibility, discount_flag, page
        }})
    return data
}

export const fetchOneItem = async (id) => {
    const {data} = await $host.get('api/item/' + id)
    return data
}

export const changeName = async (role, name, id) => {
    const {data} = await  $host.post('api/item/change-name', {name, id}, {headers: {authorization: role}})
    return data
}

export const changePrice = async (role, price, id) => {
    const {data} = await $host.post('api/item/change-price', {price, id}, {headers: {authorization: role}})
    return data
}

export const changeParams = async (role, categoryId, downCategoryId, brandId, id) => {
    const {data} = await $host.post('api/item/change-params', {categoryId, downCategoryId, brandId, id}, {headers: {authorization: role}})
    return data
}

export const changeAvailability = async (role, availability, id) => {
    const {data} = await $host.post('api/item/change-availability', {availability, id}, {headers: {authorization: role}})
    return data
}

export const changeVisibility = async (role, visibility, id) => {
    const {data} = await $host.post('api/item/change-visibility', {visibility, id}, {headers: {authorization: role}})
    return data
}

export const changeLength = async (role, length, id) => {
    const {data} = await $host.post('api/item/change-length', {length, id}, {headers: {authorization: role}})
    return data
}

export const changeWidth = async (role, width, id) => {
    const {data} = await $host.post('api/ite/change-width', {width, id}, {headers: {authorization: role}})
    return data
}

export const changeHeight = async (role, height, id) => {
    const {data} = await $host.post('api/item/change-height', {height, id}, {headers: {authorization: role}})
    return data
}

export const changeWeight = async (role, weight, id) => {
    const {data} = await $host.post('api/item/change-weight', {weight, id}, {headers: {authorization: role}})
    return data
}

export const changeDiscountFlag = async (id, discount_flag, role) => {
    const {data} = await $host.post('api/item/change-flag', {discount_flag, id}, {headers: {authorization: role}})
    return data
}

export const changeDiscount = async (id, discount, discount_flag, old_price, role) => {
    const {data} = await $host.post('api/item/change-discount', {discount, discount_flag, old_price, id}, {headers: {authorization: role}})
    return data
}

export const createItemInfo = async (role, info, itemId) => {
    const {data} = await $host.post('api/info', {info, itemId}, {headers: {authorization: role}})
    return data
}

export const fetchAllInfo = async (itemId) => {
    const {data} = await $host.get('api/info', {params: {itemId}})
    return data
}

export const changeInfo = async (role, info, id) => {
    const {data} = await $host.post('api/info/changeinfo', {info, id}, {headers: {authorization: role}})
    return data
}

export const deleteInfo = async (role, id) => {
    const {data} = await $host.post('api/info/delete', {id}, {headers: {authorization: role}})
    return data
}

export const changeScaleItem = async (role, scaleId, id) => {
    const {data} = await $host.post('api/item/change-scale', {scaleId, id}, {headers: {authorization: role}})
    return data
}