import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddCountry() {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [slug, setSlug] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !code || !slug || !image) {
            setError("Усі поля обов'язкові!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("Name", name);
            formData.append("Code", code);
            formData.append("Slug", slug);
            formData.append("Image", image);

            await axios.post("http://localhost:5149/api/Countries", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            navigate("/");
        } catch {
            setError("Помилка при додаванні країни");
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

                {error && (
                    <p className="text-red-600 mb-4 text-center font-medium">{error}</p>
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
                                    setError("");
                                } else {
                                    setError("Можна обирати лише зображення");
                                    setImage(null);
                                    e.target.value = "";
                                }
                            }
                        }}
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
        </div>
    );
}

export default AddCountry;