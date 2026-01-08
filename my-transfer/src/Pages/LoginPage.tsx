import axios from "axios";
import {useGoogleLogin} from "@react-oauth/google";
import APP_ENV from "../env";
import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {login} from "../Features/auth/authSlice.ts";
import { jwtDecode } from 'jwt-decode';
import type {IUserTokenInfo} from "../Interfaces/user/IUserTokenInfo.ts";
import {useAppDispatch} from "../app/store.ts";


function LoginPage() {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const res = await axios.post(`${APP_ENV.API_BASE_URL}/api/Account/login`, {
                email,
                password
            });
            const {token} = res.data;
            const decode = jwtDecode<IUserTokenInfo>(token);
            console.log(decode);
            dispatch(login(res.data.token));
            navigate("/profile");
        }
        catch(err){
            if (axios.isAxiosError(err) && err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else if (axios.isAxiosError(err) && err.response?.data?.message) {
                setErrors({ General: [err.response.data.message] });
            }
        }
    }

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) =>
        {
            console.log("tokenResponse", tokenResponse.access_token);
            //console.log("tokenResponse", tokenResponse);
            try {

                const response =
                    await axios.post(`${APP_ENV.API_BASE_URL}/api/Account/googleLogin`, {
                        idToken: tokenResponse.access_token
                    });
                const { token } = response.data;
                dispatch(login(token));
                navigate("/");
                console.log("Google користувач:", response.data);
            } catch (error) {
                console.error("Google логін не вдалий:", error);
            }
        },
    });

    return (

            <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
                <form
                    onSubmit={handleLogin}
                    className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-200"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        Логін
                    </h2>

                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email[0]}</p>}

                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Емейл
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            placeholder="Емейл"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                        />
                        {errors.Email && (
                            <p className="text-red-600 text-sm mt-1">{errors.Email[0]}</p>
                        )}
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Пароль
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            placeholder="Пароль"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                        />
                        {errors.Password && (
                            <p className="text-red-600 text-sm mt-1">{errors.Password[0]}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold shadow"
                    >
                        Зберегти
                    </button>
                    <Link
                        to="/forgot-password"
                        className="text-blue-500 hover:text-blue-800 transition font-medium items-center"
                    >
                        Забули пароль
                    </Link>
                </form>
                <hr style={{ margin: "20px 0" }} />

                <button
                    onClick={(event) => {
                        event.preventDefault();
                        handleGoogleLogin();
                    }}
                    className="bg-blue-500 hover:bg-blue-600 transition text-white font-semibold px-4 py-2 rounded w-full mt-4"
                >
                    {'LoginGoogle'}
                </button>
            </div>
    );
}

export default LoginPage;
