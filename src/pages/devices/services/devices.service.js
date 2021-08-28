import axiosInstance from "../../../shared/axiosInstance";


const API_URL = "devices/";

class DevicesService {

    getAllDevices(history) {
        return axiosInstance(history)
            .post(API_URL, {})
            .then(response => {


                return response;
            });
    }

    turnOffCooler(history, data) {
        return axiosInstance(history)
            .post('gCoolers/changeStatus', data)
            .then(response => {


                return response;
            });
    }
    turnOnCooler(history, data) {
        console.log(data)
        return axiosInstance(history)
            .post('gCoolers/turnOnGCooler', data)
            .then(response => {


                return response;
            });
    }

}

export default new DevicesService();

