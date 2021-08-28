import {getDate} from "../../../shared/utils/date";
import axiosInstance from "../../../shared/axiosInstance";


const API_URL = "getLogs/";
class LogService {
    date = getDate();

    // لاگ ها
    getLogs(history) {

        return axiosInstance(history)
            .post(API_URL, {
                "oid": "zanjan",
                "time": this.date
            })
            .then(response => {
                return response;
            });
    }

}

export default new LogService();

