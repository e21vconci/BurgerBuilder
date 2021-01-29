//import axios from 'axios';

import * as actionTypes from './actionTypes';

// azione di caricamento per mostrare eventualmente uno spinner
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

// moving logic to Saga
export const logout = () => {
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        //type: actionTypes.AUTH_LOGOUT
        type: actionTypes.AUTH_INITIATE_LOGOUT
    };
};

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

// logout automatico alla scadenza del token
export const checkAuthTimeout = (expirationTime) => {
    // utilizzo redux Saga
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime: expirationTime
    };
};

// funzione per ottenere il token (utilizza redux saga)
export const auth = (email, password, isSignup) => {
    return {
        type: actionTypes.AUTH_USER,
        email: email,
        password: password,
        isSignup: isSignup
    };
    // return dispatch => {
    //     dispatch(authStart());
    //     const authData = {
    //         email: email,
    //         password: password,
    //         returnSecureToken: true
    //     };
    //     let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyByKftZr_8Ey-x5SihGEtiOODCwDZKOhfQ';
    //     if (!isSignup) {
    //         url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyByKftZr_8Ey-x5SihGEtiOODCwDZKOhfQ';
    //     }
    //     // API_KEY va sostituita con quella del progetto firebase (panoramica del progetto)
    //     axios.post(url, authData)
    //         .then(response => {
    //             //console.log(response);
    //             // scedenza token
    //             const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
    //             // memorizzo il token nella memoria locale del browser
    //             localStorage.setItem('token', response.data.idToken);
    //             localStorage.setItem('expirationDate', expirationDate);
    //             localStorage.setItem('userId', response.data.localId);
    //             dispatch(authSuccess(response.data.idToken, response.data.localId));
    //             // per il logout
    //             dispatch(checkAuthTimeout(response.data.expiresIn));
    //         })
    //         .catch(err => {
    //             dispatch(authFail(err.response.data.error));
    //         });
    // };
};

export const setAuthRedirectPath = ( path ) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

// controllo la validità del token e lo utilizzo anche dopo un refresh
export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    };

    // codice spostato in auth di redux-saga
    // return dispatch => {
    //     const token = localStorage.getItem('token');
    //     if (!token) {
    //         dispatch(logout());
    //     } else {
    //         const expirationDate = new Date(localStorage.getItem('expirationDate'));
    //         if (expirationDate <= new Date()) {
    //             dispatch(logout());
    //         } else {
    //             const userId = localStorage.getItem('userId');
    //             dispatch(authSuccess(token, userId));
    //             // verifica se il token è scaduto
    //             dispatch(checkAuthTimeout( ( expirationDate.getTime() - new Date().getTime() ) / 1000 ) );
    //         }
    //     }
    // };
};