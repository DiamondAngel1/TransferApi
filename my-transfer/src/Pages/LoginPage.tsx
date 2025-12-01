import axios from "axios";
import {GoogleOAuthProvider, GoogleLogin, type CredentialResponse} from "@react-oauth/google";
import APP_ENV from "../env";

function LoginPage() {
    const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
        try {
            const idToken = credentialResponse.credential;
            const response = await axios.post(`${APP_ENV.API_BASE_URL}/api/Account/googleLogin`, {
                idToken
            });
            console.log("Google користувач:", response.data);
        } catch (error) {
            console.error("Google логін не вдалий:", error);
        }
    };

    return (
        <GoogleOAuthProvider clientId="334276158389-94cate7sf5jbeta7thb2k96h6vrf94c6.apps.googleusercontent.com">
            <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
                <form
                    className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-200"
                >
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                        Логін
                    </h2>

                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ім'я
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Ім'я"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Прізвище
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Прізвище"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Емейл
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Емейл"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                        />

                    </div>

                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Пароль
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Пароль"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold shadow"
                    >
                        Зберегти
                    </button>
                </form>
                <hr style={{ margin: "20px 0" }} />

                <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => console.log("Логін не вдалий")}
                />
            </div>
        </GoogleOAuthProvider>
    );
}

export default LoginPage;
