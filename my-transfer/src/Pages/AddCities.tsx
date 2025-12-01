import {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import APP_ENV from "../env";
import {Editor} from "@tinymce/tinymce-react";
import type {ICityCreate} from "../Interfaces/ICityCreate.ts";

function AddCities() {

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState<string>("");
    const [countries, setCountries] = useState<{ id: number; name: string }[]>([]);
    const [countryId, setCountryId] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const [showEditor, setShowEditor] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get(`${APP_ENV.API_BASE_URL}/api/Countries`);
                setCountries(response.data);
            } catch (error) {
                console.error("Помилка при отриманні країн:", error);
            }
        };
        fetchCountries();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // const formData = new FormData();
            // formData.append("Name", name);
            // formData.append("Slug", slug);
            // formData.append("Description", description);
            // formData.append("CountryId", countryId);
            // if (image) formData.append("Image", image);
            const model : ICityCreate = {
                name,
                slug,
                description,
                countryId,
                image
            };

            await axios.post(`${APP_ENV.API_BASE_URL}/api/Cities`, model, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            navigate("/cities");
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({ General: ["Помилка при додаванні міста"] });
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 flex-col p-6">
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
                className="bg-white shadow-lg rounded-xl p-8 w-full max-w-xl border border-gray-200"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Додати місто
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
                        Слаг
                    </label>
                    <input
                        type="text"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                    />
                    {errors.Slug && <p className="text-red-600 text-sm">{errors.Slug[0]}</p>}
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Опис
                    </label>
                    <div
                        onClick={() => setShowEditor(true)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 cursor-pointer"
                    >
                        {description ? (
                            <div dangerouslySetInnerHTML={{ __html: description }} />
                        ) : (
                            <span className="text-gray-400">Натисніть, щоб додати опис...</span>
                        )}
                    </div>
                    {errors.Description && (
                        <p className="text-red-600 text-sm">{errors.Description[0]}</p>
                    )}
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Країна
                    </label>
                    <select
                        value={countryId}
                        onChange={(e) => setCountryId(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                    >
                        <option value="">-- Оберіть країну --</option>
                        {countries.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.name}
                            </option>
                        ))}
                    </select>
                    {errors.CountryId && <p className="text-red-600 text-sm">{errors.CountryId[0]}</p>}
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
            {showEditor && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6">
                        <Editor
                            apiKey='0xky1zwyw6l6500xb89qg355iwjolt8lpsq5kx8it0rl3c71'
                            value={description}
                            onEditorChange={(content) => setDescription(content)}
                            init={{
                                height: 400,
                                menubar: true,
                                plugins: [
                                    "advlist autolink lists link image charmap print preview anchor",
                                    "searchreplace visualblocks code fullscreen",
                                    "insertdatetime media table paste code",
                                ],
                                toolbar:
                                    "undo redo | formatselect | bold italic backcolor |\
                                    alignleft aligncenter alignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | image",
                            }}
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setShowEditor(false)}
                                className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                            >
                                Зберегти опис
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddCities;