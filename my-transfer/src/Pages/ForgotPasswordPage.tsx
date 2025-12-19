import axios from "axios";
import APP_ENV from "../env";
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";


function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<Record<string, string[]>>({});
    const navigate = useNavigate();

    const handleForgot = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            await axios.post(`${APP_ENV.API_BASE_URL}/api/Account/forgotPassword`, {
                email
            });

            navigate("/login");
        }
        catch(err){
            if (axios.isAxiosError(err) && err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else if (axios.isAxiosError(err) && err.response?.data?.message) {
                setErrors({ General: [err.response.data.message] });
            }
        }
    }


    return (

            <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
                <form
                    onSubmit={handleForgot}
                    className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-200"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        Емейл для відновлення паролю
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


                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold shadow"
                    >
                        Зберегти
                    </button>
                </form>
                <hr style={{ margin: "20px 0" }} />

            </div>
    );
}

export default ForgotPasswordPage;
