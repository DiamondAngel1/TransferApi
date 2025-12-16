import {combineReducers, configureStore} from "@reduxjs/toolkit";
// import authReducer from "../Features/auth/authSlice";
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import authSlice from "../Features/auth/authSlice.ts";

// export const store = configureStore({
//     reducer: {
//         auth: authReducer,
//     },
// });
const rootReducer = combineReducers({
    auth: authSlice
})
export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                // authApi.middleware,
            ),

    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
//dispatch - дає команди в redux - у редюсер, що треба, що виконати
export const useAppDispatch: () => AppDispatch = useDispatch
//selector - отримує дані з redux у будь-якому місці
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector