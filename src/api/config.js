import axios from 'axios'
//import jsonpAdapter from 'axios-jsonp'
//import {apiEndpoint} from '../config';

const headers = {
    'Content-Type': 'application/json',
};
//alert(process.env.REST_URL);
const badalsAPI = axios.create({
    baseURL: 'http://api.badals.com/api', //process.env.REST_URL,
    headers: headers
});

export const clearStore = () => {
    localStorage.removeItem('access_token');
    delete badalsAPI.defaults.headers.common.Authorization;
    window.location.replace("/");
};

export const errorHandler = err => {
    if (err.status === 401) clearStore()
};

export const isAuth = () => {
    return !!localStorage.getItem('access_token')
};

badalsAPI.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access_token');
    if(token) {
        config.headers.Authorization = token;
    }
    return config;
});

/*badalsAPI.interceptors.response.use(response => {
    console.log('response interceptors ===>', response);
    response.status = response.data.status;
    errorHandler(response);
    if (response.status > 399) {
        return Promise.reject(response);
    }
    return response;
}, error => {
    errorHandler(error);
    return Promise.reject(error.response);
});
*/
export default badalsAPI
