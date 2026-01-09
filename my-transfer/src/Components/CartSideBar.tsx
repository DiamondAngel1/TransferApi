import {useEffect, useState} from "react";
import axios from "axios";
import APP_ENV from "../env";
import type {ICartItem} from "../Interfaces/Cart/ICartItem.ts";
import type {CartSidebarProps} from "../Interfaces/props/CartSidebarProps.ts";
import type {ICartAddUpdate} from "../Interfaces/Cart/ICartAddUpdate.ts";
import {Minus, Plus} from "lucide-react";

function CartSideBar({onClose}: CartSidebarProps) {
    const [pages, setPages] = useState<ICartItem[]>([]);
    const token = localStorage.getItem("token");

    const fetchCartItems = async () => {
        try {
            const response = await axios.get<ICartItem[]>(`${APP_ENV.API_BASE_URL}/api/Cart/getCart`, {
                headers: {Authorization: `Bearer ${token}`},
            });
            setPages(response.data);
        } catch (error) {
            console.error("Помилка при отриманні квитків:", error);
        }
    };

    useEffect(() => {
        const loadCart = async () => {
            await fetchCartItems();
        };
        loadCart().catch(console.error);
    }, []);

    const updateQuantity = async (transportationId: number, newQuantity: number) => {
        if (newQuantity < 1) return; // не дозволяємо менше 1
        try {
            const model: ICartAddUpdate = { transportationId, quantity: newQuantity };
            await axios.post(`${APP_ENV.API_BASE_URL}/api/Cart`, model, {
                headers: { Authorization: `Bearer ${token}` },
            });
            await fetchCartItems();
        } catch (err) {
            console.error("Помилка при оновленні кількості:", err);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            <button className="absolute inset-0 bg-black/50" onClick={onClose}/>
            <div className="relative h-full w-120 bg-white dark:bg-slate-900 shadow-xl p-6 translate-x-0 animate-[slideIn_.2s_ease-out]">
                <button onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200">
                    ✕
                </button>
                <h2 className="text-lg font-bold mb-4">Мій кошик</h2>
                <ul className="space-y-3 overflow-auto max-h-[70vh] pr-1">
                    {pages.map((item) => (
                        <li key={item.id} className="flex flex-col gap-2 border-b pb-4 text-sm text-gray-700 dark:text-slate-300">
                            <div className="flex justify-between items-center">
                                <p className="font-semibold text-base">
                                    {item.fromCityName} ({item.fromCountryName}) → {item.toCityName} ({item.toCountryName})
                                </p>
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    item.statusName === "Запланований" ? "bg-green-100 text-green-700" :
                                        item.statusName === "Затримується" ? "bg-orange-100 text-orange-700" :
                                            ["Скасований","Виконаний","Немає місць"].includes(item.statusName) ?
                                                "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}>
                                    {item.statusName}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="font-semibold">Відправлення:</p>
                                    <p>{item.departureTime}</p>
                                </div>
                                <div>
                                    <p className="font-semibold">Прибуття:</p>
                                    <p>{item.arrivalTime}</p>
                                </div>
                            </div>

                            <p>
                                Місць всього: <span className="font-semibold">{item.seatsTotal}</span> | Доступно:{" "}
                                <span className="font-semibold">{item.seatsAvailable}</span>
                            </p>

                            {/* Кількість з кнопками */}
                            <div className="flex items-center gap-2">
                                <p>Кількість:</p>
                                <button
                                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                    <Minus/>
                                </button>
                                <span className="font-semibold">{item.quantity}</span>
                                <button
                                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                    <Plus/>
                                </button>
                            </div>

                            <div className="flex justify-between items-center mt-2">
                                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                    {item.price} ₴
                                </p>
                            </div>
                        </li>
                    ))}
                    {pages.length === 0 && (
                        <li className="text-sm text-gray-600 dark:text-slate-400">Кошик порожній</li>
                    )}
                </ul>

                <button
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg disabled:bg-gray-400 disabled:text-gray-200"
                    disabled={pages.length === 0}>
                    Оформити замовлення
                </button>
            </div>
            <style>{`@keyframes slideIn { from { transform: translateX(100%); opacity: 0.6; } to { transform: translateX(0%); opacity: 1; } }`}</style>
        </div>
    );
}

export default CartSideBar;
