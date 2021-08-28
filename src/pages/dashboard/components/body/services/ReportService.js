import axiosInstance from '../../../../../shared/axiosInstance'
import {getDate, getDateTimeHalfHour} from "../../../../../shared/utils/date";
import axios from "axios"
const cancelTokenSource = axios.CancelToken.source();
const API_URL = "reports/";

class ReportService {
    date = getDate();

    // مصرف لحظه ای
    getSumOfPower(history) {

        return axiosInstance(history)
            .post(API_URL + "getSumOfPower", {
                "oid": "zanjan",
                "time": this.date
            }, { cancelToken: cancelTokenSource.token })
            .then(response => {
                return response;
            });
    }

    // میانگین دما
    getMidTemp(history) {
        return axiosInstance(history)
            .post(API_URL + "getMidTemp", {
                "oid": "zanjan",
                "time": this.date
            }, { cancelToken: cancelTokenSource.token })
            .then(response => {
                return response;
            });
    }

    // باکس چهارتایی
    // سمت چپی اولی
    gCoolers(history) {
        return axiosInstance(history)
            .post("gCoolers", {}, { cancelToken: cancelTokenSource.token })
            .then(response => {
                return response;
            });
    }

    // سمت چپی دومی
    getAllSumTemp(history) {
        return axiosInstance(history)
            .post(API_URL + "getAllTemp", {
                "oid": "zanjan",
                "time": this.date
            }, { cancelToken: cancelTokenSource.token })
            .then(response => {
                return response;
            });
    }

    // سمت چپی سومی
    getAllSumPower(history) {
        return axiosInstance(history)
            .post(API_URL + "getAllSumPower", {
                "oid": "zanjan",
                "time": this.date
            }, { cancelToken: cancelTokenSource.token })
            .then(response => {
                return response;
            });
    }

    // سمت چپی چهارمی
    getSumOfPower(history) {
        return axiosInstance(history)
            .post(API_URL + "getSumOfPower", {
                "oid": "zanjan",
                "time": this.date
            }, { cancelToken: cancelTokenSource.token })
            .then(response => {
                return response;
            });
    }

    // خاموش کردن تمام دستگاه ها
    superAdminForceOff(history) {
        return axiosInstance(history)
            .post("policy/superAdminForceOff", {
                "oid": "zanjan",
                "mode": false
            }, { cancelToken: cancelTokenSource.token })
            .then(response => {
                return response;
            });
    }
    // غیرفعال کردن force off
    turnOffForceOff(history) {
        return axiosInstance(history)
            .post("policy/turnOffForceOff", {
                "oid": "zanjan"
            }, { cancelToken: cancelTokenSource.token })
            .then(response => {
                return response;
            });
    }

// وضعیت دستگاه ها: خاموش یا غیرفعال
    getSuperAdminPolicy(history) {
        return axiosInstance(history)
            .post("policy/getSuperAdminPolicy",
                {
                    "oid": "zanjan",
                    "time": this.date
                }, { cancelToken: cancelTokenSource.token })
            .then(response => {
                return response;
            });
    }


    getPowerConsumtionOidThirtyMin(dateTime, history) {
        return axiosInstance(history)
            .post(API_URL + "getPowerConsumtionOidFiveMin", {
                "oid": "zanjan",
                "time": dateTime
            }, { cancelToken: cancelTokenSource.token })
            .then(response => {


                return response;
            });
    }

    turnOnAllGCooler(history) {
        return axiosInstance(history)
            .post("gCoolers/turnOnAllGCooler", {}, { cancelToken: cancelTokenSource.token })
            .then(response => {


                return response;
            });
    }



    // report page

    getTempAndPower(history, range_date) {
        return axiosInstance(history)
            .post('/newReports/getTempAndPower', {
                "oid": "zanjan",
                "range_date": range_date
            }, { cancelToken: cancelTokenSource.token })
            .then(response => {


                return response;
            });
    }

    cancel() {
        console.log(';asdasdasd')
        // cancelTokenSource.cancel()
    }
}

export default new ReportService();

