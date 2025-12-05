import { useEffect, useState } from "react";
import axios from "axios";
import type {ICity} from "../Interfaces/City/ICity.ts";
import { useNavigate } from "react-router-dom";
import APP_ENV from "../env";

function CitiesPage() {
    const [pages, setPages] = useState<ICity[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get<ICity[]>(`${APP_ENV.API_BASE_URL}/api/Cities`);
                setPages(response.data);
            } catch (error) {
                console.error("Помилка при отриманні міст:", error);
            }
        };
        fetchCities();
    }, []);

    const deleteCity = async (id: number) => {
        try {
            await axios.delete(`${APP_ENV.API_BASE_URL}/api/Cities/${id}`);
            setPages(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error("Помилка при видаленні міста:", error);
        }
    };

    return (
        <div className="p-10 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
            <div className="flex justify-center mb-6">
                <button
                    onClick={() => navigate("/add-cities")}
                    className="px-6 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition"
                >
                    Додати місто
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {pages.map(city => (
                    <div
                        key={city.id}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
                    >
                        <div className="relative h-48 w-full overflow-hidden">
                            <img
                                src={`${APP_ENV.API_BASE_URL}/images/${city.image ?? "default.png"}`}
                                alt={city.name}
                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            <h2 className="absolute bottom-3 left-4 text-xl font-bold text-white drop-shadow-lg">
                                {city.name}
                            </h2>
                        </div>

                        <div className="p-6 text-center">
                            <p className="text-sm text-gray-600 mb-1">Країна: <span className="font-semibold">{city.country}</span></p>
                            <p className="text-sm text-gray-600 mb-4">Slug: <span className="font-semibold">{city.slug}</span></p>
                            <button
                                type="button"
                                onClick={() => deleteCity(city.id)}
                                className="mt-2 px-5 py-2 text-sm font-semibold rounded-lg bg-red-600 hover:bg-red-700 cursor-pointer text-white  transition-colors shadow-md"
                            >
                                Delete
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate(`/cities/${city.slug}`,{ state: { id: city.id } })}
                                className="mt-2 ml-2 px-5 py-2 text-sm font-semibold rounded-lg bg-amber-300 hover:bg-amber-400 cursor-pointer text-black transition-colors shadow-md"
                            >
                                Description
                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CitiesPage;