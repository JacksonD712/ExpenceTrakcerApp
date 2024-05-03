// authSlice.ts

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
  accessToken: string;
  newaccessToken: string;
  isAuthenticated: boolean;
  userData: any;
  email: string;
  refreshToken: string;
}

const initialState: AuthState = {
  accessToken: '',
  newaccessToken: '',
  isAuthenticated: false,
  userData: null,
  email: '',
  refreshToken: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },
    setnewAccessToken: (state, action: PayloadAction<string>) => {
      state.newaccessToken = action.payload;
      state.isAuthenticated = true;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
      state.isAuthenticated = true;
    },
    setUserData: (state, action: PayloadAction<any>) => {
      state.userData = action.payload;
    },
    resetAuthState: state => {
      state.accessToken = '';
      state.isAuthenticated = false;
      state.userData = null;
      state.email = '';
    },
    loginSuccess: (
      state,
      action: PayloadAction<{
        accessToken: string;
        userData: any;
        email: string;
        refreshToken: string;
      }>,
    ) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;

      state.userData = action.payload.userData;
      state.email = action.payload.email;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.accessToken = '';
      state.userData = null;
      state.email = '';
    },
  },
});

export const {
  setAccessToken,
  setUserData,
  setRefreshToken,
  setnewAccessToken,
  resetAuthState,
  loginSuccess,
  logout,
} = authSlice.actions;

export const selectAccessToken = (state: {auth: AuthState}) =>
  state.auth.accessToken;
export const selectnewAccessToken = (state: {auth: AuthState}) =>
  state.auth.newaccessToken;
export const selectIsAuthenticated = (state: {auth: AuthState}) =>
  state.auth.isAuthenticated;
export const selectRefreshToken = (state: {auth: AuthState}) =>
  state.auth.refreshToken;
export const selectUserData = (state: {auth: AuthState}) => state.auth.userData;
export const selectEmail = (state: {auth: AuthState}) => state.auth.email;

export default authSlice.reducer;
