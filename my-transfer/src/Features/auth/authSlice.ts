import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {IAuthState} from "../../Interfaces/user/IAuthState.ts";


const initialState: IAuthState = {
    token: localStorage.getItem("token"),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem("token", action.payload);
        },
        logout: (state) => {
            state.token = null;
            localStorage.removeItem("token");
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
