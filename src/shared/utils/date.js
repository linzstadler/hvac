import moment from "jalali-moment";

function getDate() {
    const m = moment().locale('fa').format('YYYY/M/D');
    const split = m.split('/')
    const date = {
        year: split[0],
        month: split[1],
        day: split[2],
    }
    return date;
}
function getDateTimeHalfHour() {
    const m = moment().locale('fa').format('YYYY/M/D HH:mm')
    const split = m.split(' ')
    const dateSplited = split[0].split('/')
    let timeSplited = split[1].split(':')
    if(parseInt(timeSplited[1]) >= 5) {
        timeSplited[1] = '5'
    } else if(parseInt(timeSplited[1]) < 5) {
        timeSplited[1] = '0'
    }

    const date = {
        year: parseInt(dateSplited[0]),
        month: parseInt(dateSplited[1]),
        day: parseInt(dateSplited[2]),
        start : {
            hour: 0,
            min: 0
        },
        end: {
            hour: 23,
            min: 59
        }
    }
    return date;
}
export {getDate, getDateTimeHalfHour}
