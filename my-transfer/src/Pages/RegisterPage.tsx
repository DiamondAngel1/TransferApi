import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import type {AppDispatch} from "../app/store.ts";
import {useDispatch} from "react-redux";
import APP_ENV from "../env";
import {login} from "../Features/auth/authSlice.ts";
import axios from "axios";
import type {IUserRegister} from "../Interfaces/user/IUserRegister.ts";

function RegisterPage() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const model : IUserRegister = {
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        phoneNumber:"",
        image:null,
    };
    const [form, setForm] = useState<IUserRegister>(model);
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setForm({ ...form, image: file });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try{
            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) => {
                if(value !== undefined && value !== null) {
                    formData.append(key, value);
                }
            });

            const res = await axios.post(`${APP_ENV.API_BASE_URL}/api/Account/register`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            dispatch(login(res.data.token));
            navigate("/profile");
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
                    onSubmit={handleSubmit}
                    className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl border border-gray-200"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        Реєстрація
                    </h2>

                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ім'я
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value = {form.firstName}
                            placeholder={"Ім'я"}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                        />
                        {errors.FirstName && (
                            <p className="text-red-600 text-sm mt-1">{errors.FirstName[0]}</p>
                        )}
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Прізвище
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder={"Прізвище"}
                            value={form.lastName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                        />
                        {errors.LastName && (
                            <p className="text-red-600 text-sm mt-1">{errors.LastName[0]}</p>
                        )}
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Емейл
                        </label>
                        <input
                            type="text"
                            name="email"
                            placeholder={"Емейл"}
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                        />
                        {errors.Email && (
                            <p className="text-red-600 text-sm mt-1">{errors.Email[0]}</p>
                        )}
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Пароль
                        </label>
                        <input
                            type="text"
                            name="password"
                            placeholder={"Пароль"}
                            value={form.password}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                        />
                        {errors.Password && (
                            <p className="text-red-600 text-sm mt-1">{errors.Password[0]}</p>
                        )}
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Номер телефона
                        </label>
                        <input
                            value={form.phoneNumber}
                            name="phoneNumber"
                            placeholder={"Номер телефона"}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                        >
                        </input>
                        {errors.PhoneNumber && (
                            <p className="text-red-600 text-sm mt-1">{errors.PhoneNumber[0]}</p>
                        )}
                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Фото профіля
                        </label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleFile}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                        />
                        {errors.Image && (
                            <p className="text-red-600 text-sm mt-1">{errors.Image[0]}</p>
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

export default RegisterPage;
