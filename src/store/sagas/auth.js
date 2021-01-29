import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga/effects';
import axios from 'axios';

import * as actions from '../actions/index';

export function* logoutSaga(action) {
    yield call([localStorage, "removeItem"], "token");
    yield call([localStorage, "removeItem"], "expirationDate");
    yield call([localStorage, "removeItem"], "userId");
    // yield localStorage.removeItem('token');
    // yield localStorage.removeItem('expirationDate');
    // yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
    // ritardo dell'esecuzione del passaggio successivo
    yield delay(action.expirationTime * 1000);
    // procedo al logout
    yield put(actions.logout());
}

export function* authUserSaga(action) {
    // in Saga non chiamiamo dispatch ma put
    yield put(actions.authStart());
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    };
    // API_KEY va sostituita con quella del progetto firebase (panoramica del progetto)
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyByKftZr_8Ey-x5SihGEtiOODCwDZKOhfQ';
    if (!action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyByKftZr_8Ey-x5SihGEtiOODCwDZKOhfQ';
    }
    try {
        // la Promise viene ora gestita in questo modo 
        const response = yield axios.post(url, authData)

        // scedenza token
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
        // memorizzo il token nella memoria locale del browser
        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);
        yield put(actions.authSuccess(response.data.idToken, response.data.localId));
        // per il logout
        yield put(actions.checkAuthTimeout(response.data.expiresIn));
    } catch (error) {
        yield put(actions.authFail(error.response.data.error));
    }
}

export function* authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
        if (!token) {
            yield put(actions.logout());
        } else {
            const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()) {
                yield put(actions.logout());
            } else {
                const userId = yield localStorage.getItem('userId');
                yield put(actions.authSuccess(token, userId));
                // verifica se il token è scaduto
                yield put(actions.checkAuthTimeout( ( expirationDate.getTime() - new Date().getTime() ) / 1000 ) );
            }
        }
}