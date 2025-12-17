import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {IAuthState} from "../../Interfaces/user/IAuthState.ts";
import {jwtDecode} from "jwt-decode";
import type {IUserTokenInfo} from "../../Interfaces/user/IUserTokenInfo.ts";

const getUserFromToken = (token: string) : IUserTokenInfo | null  => {
    try {
        if (!token) {
            return null;
        }
        const decode = jwtDecode<IUserTokenInfo>(token);
        console.log("decoded text",decode);
        return decode ?? null;
    }
    catch (err) {
        console.error("Invalid token", err);
        return null;
    }
}
const token = localStorage.token;
const user = getUserFromToken(token);

const initialState: IAuthState = {
    user: user
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        login: (state, action: PayloadAction<string>) => {
            const user = getUserFromToken(action.payload);
            if(user){
                state.user = user;
                localStorage.setItem("token", action.payload);
            }

        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("token");
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
