import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import APP_ENV from "../env";

function AddCountry() {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [slug, setSlug] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("Name", name);
            formData.append("Code", code);
            formData.append("Slug", slug);
            if (image) formData.append("Image", image);

            await axios.post(`${APP_ENV.API_BASE_URL}/api/Countries`, formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigate("/");
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({ General: ["Помилка при додаванні країни"] });
            }
        }

    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 flex-col">
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
                >
                    Повернутись назад
                </button>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md border border-gray-200"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Додати країну
                </h2>

                {errors.General && (
                    <p className="text-red-600 mb-4 text-center font-medium">{errors.General[0]}</p>
                )}

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Назва
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                    />
                    {errors.Name && <p className="text-red-600 text-sm">{errors.Name[0]}</p>}
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Код
                    </label>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                    />
                    {errors.Code && <p className="text-red-600 text-sm">{errors.Code[0]}</p>}
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Slug
                    </label>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                    />
                    {errors.Slug && <p className="text-red-600 text-sm">{errors.Slug[0]}</p>}
                </div>

                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Зображення
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files ? e.target.files[0] : null;
                            if (file) {
                                if (file.type.startsWith("image/")) {
                                    setImage(file);
                                    setErrors({});
                                } else {
                                    setErrors({ Image: ["Можна обирати лише зображення"] });
                                    setImage(null);
                                    e.target.value = "";
                                }
                            }
                        }}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                    />
                    {errors.Image && <p className="text-red-600 text-sm">{errors.Image[0]}</p>}
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

export default AddCountry;