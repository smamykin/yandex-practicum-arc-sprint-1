import './blocks/popup/popup.css'
import './blocks/content/content.css'
import './vendor/fonts.css'
import './vendor/normalize.css'
import * as auth from "./utils/auth";
import * as api from "./utils/api";

// Anything exported from this file is importable by other in-browser modules.
export function getCurrentUserEmail() {

    const jwtData = localStorage.getItem('jwt-data')

    return jwtData ?? '';
}
export const signOutEventType = 'sign out';

export function onSignOut() {
    // при вызове обработчика onSignOut происходит удаление jwt
    localStorage.removeItem("jwt");
    localStorage.removeItem("jwt-data");
    document.dispatchEvent(new CustomEvent(signOutEventType))
}

export function getToken() {
    return localStorage.getItem("jwt");
}

export function checkToken() {
    const token = getToken();
    console.log('hwllo world', token);
    if (token) {
        return auth
            .checkToken(token)
            .then((res) => {
                localStorage.setItem('jwt-data', res.data.email)
                // return res
            })
            .catch((err) => {
                localStorage.removeItem("jwt");
                localStorage.removeItem("jwt-data");
                console.log(err);
            });
    }
    return new Promise((resolve) => {
        resolve(null)
    });
}

export function register(email, password) {
    return auth.register(email, password)
}

export function login(email, password) {
    return auth.login(email, password)
        .then((res) => {
            localStorage.setItem('jwt', res.token)
        })
}

export function getApiClient() {
    return api
}

export const EVENT_NAME_CLOSE_ALL_POPUPS = 'close all popup';
export const EVENT_NAME_USER_UPDATED = 'user updated';
