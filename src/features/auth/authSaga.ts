import { take, fork , call, delay, put} from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { authActions, LoginPayload } from "./authSlice";
import { push } from "connected-react-router";
import authApi from "api/authApi";

import { User } from "models";



function* handleLogin(payload: LoginPayload) {
  try {
    console.log(payload);
    const response: User =  yield call(authApi.login, payload);
    console.log('Handle Login oooooooo', payload);
    yield delay (2000);
    localStorage.setItem('access_token', 'fake_token');
    yield put(
      authActions.loginSuccess({
        id: response.id,
        username: response.username,
        password: response.password,
      })
    );
    yield put(push('/admin/dashboard'));
  } catch (error) {
    // yield put(
    //   authActions.loginFailed(error.message)
    // );
  }
  
  //redirect to admin page
}

function* handleLogOut() {
  console.log('Handle Logout');
  yield delay (1000);
  localStorage.removeItem('access_token');
  //redirect to login page
  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true){

    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }else {
      yield take(authActions.logout.type);
      yield call(handleLogOut);
    }
    

    
  }  
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
