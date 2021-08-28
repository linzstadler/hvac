import axiosInstance from './../../../shared/axiosInstance'
import {removeToken, setToken} from './../../../shared/services/token.service'
import {getToken} from "../../../shared/services/token.service";

const API_URL = "users";

class AuthService {


    login(username, password, history) {
        return axiosInstance(history)
            .post(`${API_URL}/login`, {
                username,
                password
            })
            .then(response => {
                if (response.data) {
                    setToken(JSON.stringify(response.data.user))
                }

                return response.data;
            });
    }

    logout() {

        removeToken();
    }

    register(username, password, confirmPassword, role, history) {
        return axiosInstance(history).post(`${API_URL}/register`, {
            username,
            password,
            confirmPassword,
            role
        });
    }

    getCurrentUser() {
        const token = getToken();
        return JSON.parse(token);
    }
}

export default new AuthService();
