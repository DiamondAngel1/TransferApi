import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import APP_ENV from "../env";
import axios from "axios";
import type {IResetPassword} from "../Interfaces/user/IResetPassword.ts";
function ResetPasswordPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const queryParams = new URLSearchParams(window.location.search);
    const email= queryParams.get("email");
    const token = queryParams.get("token");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try{
            const model: IResetPassword = {
                email:email ?? "",
                token: token ?? "",
                newPassword: form.newPassword,
                confirmPassword: form.confirmPassword
            }
            console.log(model);
            await axios.post(`${APP_ENV.API_BASE_URL}/api/Account/resetPassword`, model)
            navigate("/login");
        }
        catch(err) {
            if (axios.isAxiosError(err) && err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            }
        }finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
            <form
                onSubmit={handleReset}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl border border-gray-200"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Зміна паролю
                </h2>

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Пароль
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        placeholder={"Пароль"}
                        value={form.newPassword}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                    />
                    {errors.newPassword && (
                        <p className="text-red-600 text-sm mt-1">{errors.newPassword[0]}</p>
                    )}
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Підтвердіть пароль
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder={"Підтвердженя паролю"}
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                    />
                    {errors.confirmPassword && (
                        <p className="text-red-600 text-sm mt-1">{errors.confirmPassword[0]}</p>
                    )}
                </div>


                <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded-lg transition font-semibold shadow ${
                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700 text-white"
                    }`}
                >
                    {loading ? "Зачекайте..."  : "Зберегти"}
                </button>
                {loading && (
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full animate-pulse w-3/4"></div>
                    </div>
                )}
            </form>
        </div>
    );
}

export default ResetPasswordPage;
