import axios from 'axios'

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

/*
const $adminHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
}

$adminHost.interceptors.request.use(authInterceptor)
*/

export {
    $host,
    //$adminHost
}