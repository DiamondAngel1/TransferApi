import { useEffect, useState } from "react";
import axios from "axios";
import type {ICity} from "../Interfaces/Country/ICountry.ts";
import { useNavigate } from "react-router-dom";
import APP_ENV from "../env";
import RedirectBtn from "../Components/RedirectBtn.tsx";
import {useAppSelector} from "../app/store.ts";

function HomePage() {
    const [countries, setCountries] = useState<ICity[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get<ICity[]>(`${APP_ENV.API_BASE_URL}/api/Countries`);
                setCountries(response.data);
            } catch (error) {
                console.error("Помилка при отриманні країн:", error);
            }
        };
        fetchCountries();
    }, []);

    const deleteCountry = async (id: number) => {
        try {
            await axios.delete(`${APP_ENV.API_BASE_URL}/api/Countries/${id}`);
            setCountries(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error("Помилка при видаленні країни:", error);
        }
    };
    const user =
        useAppSelector(redux => redux.auth.user);
    return (
        <div className="p-10 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
            {user!=null && user.roles == "Admin" ? (
                <>
                    <RedirectBtn/>
                </>
            ):(
                <></>
            )}


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {countries.map(country => (
                <div
                    key={country.id}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-2xl"
                >
                    <div className="relative h-48 w-full overflow-hidden">
                        <img
                            src={`${APP_ENV.API_BASE_URL}/images/${country.image ?? "default.png"}`}
                            alt={country.name}
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <h2 className="absolute bottom-3 left-4 text-xl font-bold text-white drop-shadow-lg">
                            {country.name}
                        </h2>
                    </div>

                    <div className="p-6 text-center">
                        <p className="text-sm text-gray-600 mb-1">Код: <span className="font-semibold">{country.code}</span></p>
                        <p className="text-sm text-gray-600 mb-4">Slug: <span className="font-semibold">{country.slug}</span></p>
                        {user!=null && user.roles == "Admin" ? (
                            <>
                                <button
                                    type="button"
                                    onClick={() => deleteCountry(country.id)}
                                    className="mt-2 px-5 py-2 text-sm font-semibold rounded-lg bg-red-600 hover:bg-red-700 cursor-pointer text-white  transition-colors shadow-md"
                                >
                                    Delete
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate(`/edit-country/${country.id}`)}
                                    className="mt-2 ml-2 px-5 py-2 text-sm font-semibold rounded-lg bg-amber-300 hover:bg-amber-400 cursor-pointer text-black transition-colors shadow-md"
                                >
                                    Edit
                                </button>
                            </>
                        ):(
                            <></>
                        )}

                    </div>
                </div>
            ))}
        </div>
        </div>
    );
}

export default HomePage;