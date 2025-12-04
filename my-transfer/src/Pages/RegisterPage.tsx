import axios from "axios";
import React, {useState} from "react";
import APP_ENV from "../env";
import type {IUserRegister} from "../Interfaces/IUserRegister.ts";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.ts";

function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        try {
            const model : IUserRegister = {
                firstName,
                lastName,
                email,
                password,
                phoneNumber,
                image
            };
            const res = await axios.post(`${APP_ENV.API_BASE_URL}/api/Account/register`, model, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            login(res.data.token);
            navigate("/Profile");
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            }
        }
    }

    return (
            <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
                <form
                    onSubmit={handleRegister}
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
                            value = {firstName}
                            placeholder={"Ім'я"}
                            onChange={(e) => setFirstName(e.target.value)}
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
                            placeholder={"Прізвище"}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
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
                            placeholder={"Емейл"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            placeholder={"Пароль"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                            value={phoneNumber}
                            placeholder={"Номер телефона"}
                            onChange={(e) => setPhoneNumber(e.target.value)}
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
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files ? e.target.files[0] : null;
                                if (file) {
                                    if (file.type.startsWith("image/")) {
                                        setImage(file);

                                    } else {
                                        setImage(null);
                                        e.target.value = "";
                                    }
                                }
                            }}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                        />
                        {errors.Image && (
                            <p className="text-red-600 text-sm mt-1">{errors.Image[0]}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold shadow"
                    >
                        Зберегти
                    </button>
                </form>
            </div>
    );
}

export default RegisterPage;
