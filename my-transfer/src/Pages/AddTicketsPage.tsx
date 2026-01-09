import { useState, useEffect } from "react";
import axios from "axios";
import APP_ENV from "../env";
import type { ITicketsAdd } from "../Interfaces/Transportation/ITicketsAdd.ts";
import type {ICity} from "../Interfaces/City/ICity.ts";
import type {IStatuses} from "../Interfaces/Transportation/IStatuses.ts";

function CreateTransportationPage() {
    const initialForm: ITicketsAdd = {
        code: "PS0101",
        fromCityId: 0,
        toCityId: 0,
        departureTime: "2025-01-01 00:00",
        arrivalTime: "2025-01-01 00:00",
        seatsTotal: 0,
        seatsAvailable: 0,
        statusId: 0,
        price: 0,
    };

    const [form, setForm] = useState<ITicketsAdd>(initialForm);
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const [cities, setCities] = useState<ICity[]>([]);
    const [statuses, setStatuses] = useState<IStatuses[]>([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await axios.get<ICity[]>(`${APP_ENV.API_BASE_URL}/api/Cities`);
                setCities(response.data);
            } catch (error) {
                console.error("Помилка при отриманні міст:", error);
            }
        };

        const fetchStatuses = async () => {
            try {
                const response = await axios.get<IStatuses[]>(`${APP_ENV.API_BASE_URL}/api/Transportations/GetListStatuses`);
                setStatuses(response.data);
            } catch (err) {
                console.error("Помилка при отриманні статусів:", err);
            }
        };
        fetchCities();
        fetchStatuses();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: ["fromCityId","toCityId","seatsTotal","seatsAvailable","statusId","price"].includes(name)
                ? Number(value)
                : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const departure = new Date(form.departureTime);
            const arrival = new Date(form.arrivalTime);
            const payload: ITicketsAdd ={
                ...form,
                departureTime: departure.toISOString(),
                arrivalTime: arrival.toISOString(),
            }
            await axios.post(`${APP_ENV.API_BASE_URL}/api/Transportations/CreateTransportation`, payload);
            alert("Перевезення успішно додано ✅");
            setForm(initialForm); // скидаємо форму
        }
        catch (err) {
            if (axios.isAxiosError(err) && err.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors({ General: ["Помилка при додаванні міста"] });
            }
        }


    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-transparent flex-col p-6">
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-slate-900 shadow-lg rounded-xl p-8 w-full max-w-xl border border-gray-200 dark:border-slate-700"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
                    Додати перевезення
                </h2>

                {errors.General && (
                    <p className="text-red-600 mb-4 text-center font-medium">{errors.General[0]}</p>
                )}

                {/* Код рейсу */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Код рейсу</label>
                    <input
                        type="text"
                        name="code"
                        value={form.code}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 dark:bg-slate-800 dark:text-white"
                    />
                    {errors.Code && <p className="text-red-600 text-sm">{errors.Code[0]}</p>}
                </div>

                {/* Місто відправлення */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Місто відправлення</label>
                    <select
                        name="fromCityId"
                        value={form.fromCityId}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 dark:bg-slate-800 dark:text-white"
                    >
                        <option value={0}>-- Оберіть місто --</option>
                        {cities.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    {errors.FromCityId && <p className="text-red-600 text-sm">{errors.FromCityId[0]}</p>}
                </div>

                {/* Місто прибуття */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Місто прибуття</label>
                    <select
                        name="toCityId"
                        value={form.toCityId}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 dark:bg-slate-800 dark:text-white"
                    >
                        <option value={0}>-- Оберіть місто --</option>
                        {cities.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    {errors.ToCityId && <p className="text-red-600 text-sm">{errors.ToCityId[0]}</p>}
                </div>

                {/* Час відправлення */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Час відправлення</label>
                    <input
                        type="datetime-local"
                        name="departureTime"
                        value={form.departureTime}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 dark:bg-slate-800 dark:text-white"
                    />
                </div>

                {/* Час прибуття */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Час прибуття</label>
                    <input
                        type="datetime-local"
                        name="arrivalTime"
                        value={form.arrivalTime}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 dark:bg-slate-800 dark:text-white"
                    />
                    {errors.ArrivalTime && <p className="text-red-600 text-sm">{errors.ArrivalTime[0]}</p>}
                </div>

                {/* Seats */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Всього місць</label>
                    <input
                        type="number"
                        name="seatsTotal"
                        value={form.seatsTotal}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 dark:bg-slate-800 dark:text-white"
                    />
                    {errors.SeatsTotal && <p className="text-red-600 text-sm">{errors.SeatsTotal[0]}</p>}
                </div>

                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Доступні місця</label>
                    <input
                        type="number"
                        name="seatsAvailable"
                        value={form.seatsAvailable}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 dark:bg-slate-800 dark:text-white"
                    />
                    {errors.SeatsAvailable && <p className="text-red-600 text-sm">{errors.SeatsAvailable[0]}</p>}
                </div>

                {/* Статус */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Статус перевезення</label>
                    <select
                        name="statusId"
                        value={form.statusId}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 dark:bg-slate-800 dark:text-white"
                    >
                        <option value={0}>-- Оберіть статус --</option>
                        {statuses.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                    {errors.StatusId && <p className="text-red-600 text-sm">{errors.StatusId[0]}</p>}
                </div>

                {/* Ціна */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ціна</label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-2 dark:bg-slate-800 dark:text-white"
                    />
                    {errors.Price && <p className="text-red-600 text-sm">{errors.Price[0]}</p>}
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

export default CreateTransportationPage;
