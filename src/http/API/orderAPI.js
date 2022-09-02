import {$host} from "../index";

/* Работа с заказами */
export const createOrder = async (token, number, firstName, lastName, secondName, phoneNumber, email, index, street, house, flat, price, typePay, typeDelivery, typeSubmit) => {
    const {data} = await $host.post('api/order/', {token, number, firstName, lastName, secondName, phoneNumber, email, index, street, house, flat, price, typePay, typeDelivery, typeSubmit})
    return data
}

export const changeSubmit = async (role, id, typeSubmit) => {
    const {data} = await $host.post('api/order/change/', {id, typeSubmit}, {headers: {authorization: role}})
    return data
}

export const setTrackNumber = async (role, id, track) => {
    const {data} = await $host.post('api/order/settrack', {id, track}, {headers: {authorization: role}})
    return data
}

export const fetchOneOrder = async (role, id) => {
    const {data} = await $host.get('api/order/id/' + id, {headers: {authorization: role}})
    return data
}

export const fetchOneOrderByNumber = async (number) => {
    const {data} = await $host.get('api/order/number/' + number)
    return data
}

export const fetchOrdersByPhone = async (phone) => {
    const {data} = await $host.get('api/order/phone/' + phone)
    return data
}

export const fetchAllOrders = async () => {
    const {data} = await $host.get('api/order/')
    return data
}

export const deleteOrder = async (role, id) => {
    const {data} = await $host.post('api/order/delete', {id}, {headers: {authorization: role}})
    return data
}