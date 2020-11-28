import axios from 'axios'
import Cookies from 'js-cookie';
//import jsonpAdapter from 'axios-jsonp'
//import {apiEndpoint} from '../config';

const headers = {
    'Content-Type': 'application/json',
};
//alert(process.env.REST_URL);
const badalsAPI = axios.create({
  baseURL: process.env.REACT_APP_SHOP_API,
    headers: headers
});

export const adminAPI = axios.create({
  baseURL: process.env.REACT_APP_ADMIN_API,
  headers: headers
});
export const flowAPI = axios.create({
  baseURL: process.env.REACT_APP_FLOW_API,
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
    const token = Cookies.get('token');
    if(token) {
        config.headers.Authorization = "Bearer " + token;
    }

    return config;
});

adminAPI.interceptors.request.use(function (config) {
    const token = Cookies.get('token');
    if(token) {
        config.headers.Authorization = "Bearer " + token;
    }
    return config;
});

flowAPI.interceptors.request.use(function (config) {
    const token = Cookies.get('token');
    if(token) {
        config.headers.Authorization = "Bearer " + token;
    }
    return config;
});

axios.interceptors.request.use(function (config) {
    const token = Cookies.get('token');
    if(token) {
        config.headers.Authorization = "Bearer " + token;
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
