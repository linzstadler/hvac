
export function hasToken() {
    if(localStorage.getItem('hvac')) {
        return true;
    } else {
        return false;
    }
}
export function getToken() {
    if(localStorage.getItem('hvac')) {
        return localStorage.getItem('hvac');
    } else {
        return null;
    }
}
export function setToken(token) {
    localStorage.setItem('hvac', token);
}
export function removeToken() {
    localStorage.removeItem('hvac');
}
