import { createSlice, configureStore } from "@reduxjs/toolkit";
import dataSlice from "./studentDataSlice";
const initialAuthState = {
  isAuthenticated: false,
  jwtToken: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.jwtToken = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.jwtToken = "";
    },
  },
});

const store = configureStore({
  reducer: { auth: authSlice.reducer, profileData: dataSlice.reducer },
});

export const authActions = authSlice.actions;

export default store;
