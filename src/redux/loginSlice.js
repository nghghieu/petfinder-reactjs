import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  access_token: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    login: (state, action) => {
      const token = action.payload;
      localStorage.setItem("access_token", token);
      state.access_token = token;
    },
    checkLogin: (state, action) => {
      state.isLogin = action.payload;
    },
    logout: (state) => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("apiKey");
      localStorage.removeItem("secretKey");
      state.isLogin = false;
    },
  },
});

export const { login, logout, checkLogin } = loginSlice.actions;

const loginReducer = loginSlice.reducer;

export default loginReducer;
