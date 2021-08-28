import axios from 'axios';
import {message} from "antd";
import {getToken, removeToken} from "./services/token.service";


export default (history = null) => {
    const baseURL = "http://171.22.25.147:8080/";


    let headers = {};
    const token = getToken();
    const user = JSON.parse(token);
    if (user && user.token) {
        headers["x-access-token"] = `access_token=${user.token}`
    }


    const axiosInstance = axios.create({
        baseURL: baseURL,
        headers,
    });

    axiosInstance.interceptors.response.use(
        (response) =>
            new Promise((resolve, reject) => {
                resolve(response);
            }),
        (error) => {
            if (!error.response) {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }

            if (error.response.status === 401) {
                removeToken();
                if (history) {
                    history.push("/auth/login");
                } else {
                    window.location = "/auth/login";
                }
            } else if (error.response.status === 404) {
                message.error('ارور 404: خطا در دریافت اطلاعات')
            } else {
                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        }
    );

    return axiosInstance;
};
