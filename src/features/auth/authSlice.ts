import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { User } from "models/user";


export interface LoginPayload {
  username: string;
  password: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  logging?: boolean;
  currentUser?: User;  
}

const initialState: AuthState = {
  isLoggedIn: false,
  logging: false,
  currentUser: undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>){
      state.logging = true;
    },
    loginSuccess(state, action: PayloadAction<User>){
      state.isLoggedIn = true;
      state.logging = false;
      state.currentUser = action.payload;
    },
    loginFailed(state, action: PayloadAction<string>){
      state.logging = false;
    },

    logout(state) {
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  }
})

//Actions
export const authActions = authSlice.actions;

//Selectors
export const selectiSLoggedIn = (state:any) => state.auth.isLoggedIn;
export const selectiSLogging = (state:any) => state.auth.logging;

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;

//Reducer
const authReducer = authSlice.reducer;
export default authReducer;