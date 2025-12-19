import {type FormEvent, useState} from "react";
import axios from "axios";
import {Navigate, useNavigate} from "react-router-dom";
import APP_ENV from "../env";
import {useAppSelector} from "../app/store.ts";

function AddCountry() {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [slug, setSlug] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const user =
        useAppSelector(redux => redux.auth.user);
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!user.roles?.includes("Admin")) {
        return <Navigate to="/" replace />;
    }
    const handleSubmit = async (e: FormEvent) => {
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
            navigate(-1);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({ General: ["Помилка при додаванні країни"] });
            }
        }

    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-transparent flex-col">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-slate-900 shadow-lg rounded-xl p-8 w-full max-w-md
                           border border-gray-200 dark:border-slate-700"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                    Додати країну
                </h2>

                {errors.General && (
                    <p className="text-red-600 mb-4 text-center font-medium">{errors.General[0]}</p>
                )}

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                        Назва
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 dark:bg-slate-800 dark:text-white transition"
                    />
                    {errors.Name && <p className="text-red-600 text-sm">{errors.Name[0]}</p>}
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                        Код
                    </label>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 dark:bg-slate-800 dark:text-white transition"
                    />
                    {errors.Code && <p className="text-red-600 text-sm">{errors.Code[0]}</p>}
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                        Slug
                    </label>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 dark:bg-slate-800 dark:text-white transition"
                    />
                    {errors.Slug && <p className="text-red-600 text-sm">{errors.Slug[0]}</p>}
                </div>

                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
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
                        className="w-full border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 dark:bg-slate-800 dark:text-white transition"
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