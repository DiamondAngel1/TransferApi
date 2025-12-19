import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import APP_ENV from "../env";

function EditCountry() {
    const { id } = useParams<{ id: string }>();
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [slug, setSlug] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCountry = async () => {
            try {
                const response = await axios.get(`${APP_ENV.API_BASE_URL}/api/Countries/${id}`);
                const country = response.data;
                setName(country.name);
                setCode(country.code);
                setSlug(country.slug);
                setImage(country.image);
            } catch {
                setErrors({ General: ["Помилка при завантаженні країни"] });
            }
        };
        fetchCountry();
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("Id", id!);
            formData.append("Name", name);
            formData.append("Code", code);
            formData.append("Slug", slug);
            if (image) {
                formData.append("Image", image);
            }

            await axios.put(`${APP_ENV.API_BASE_URL}/api/Countries/edit`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            navigate(-1);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({ General: ["Помилка при редагуванні країни"] });
            }
        }

    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-transparent flex-col">
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold shadow hover:bg-green-700 transition"
                >
                    Повернутись назад
                </button>
            </div>

            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-slate-900 shadow-lg rounded-xl p-8 w-full max-w-md
                border border-gray-200 dark:border-slate-700"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                    Редагувати країну
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
                <div className="mb-5 relative">
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                        Поточне зображення
                    </label>
                    <div className={"w-full h-48 border border-gray-300 dark:border-slate-600 rounded-lg overflow-hidden"}>
                        <img
                            src={`${APP_ENV.API_BASE_URL}/Images/${image}`}
                            alt={`${image}`}
                            className={"w-full h-full object-cover"}
                        />
                    </div>
                </div>
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                        Зображення (нове, необов'язково)
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
                </div>

                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold shadow"
                >
                    Зберегти зміни
                </button>
            </form>
        </div>
    );
}

export default EditCountry;
