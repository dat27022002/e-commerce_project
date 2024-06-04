import axios from 'axios';
import { toast } from 'react-toastify';
const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_BE_URL,
});
httpRequest.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => toast.error(error),
);

export const get = async (path, options = {}) => {
    const response = await httpRequest.get(path, options);
    return response.data.data;
};

export const post = async (path, data = {}) => {
    const response = await httpRequest.post(path, data);
    return response.data.data;
};

export default httpRequest;
