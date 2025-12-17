import { useState } from "react";
import {Dropdown} from "../Components/Ui/dropdown/Dropdown.tsx";
import {DropdownItem} from "../Components/Ui/dropdown/DropdownItem.tsx";
import {useAppSelector} from "../../app/store.ts";
import APP_ENV from "../../env";
import {LogOut, User} from "lucide-react";
import {logout} from "../../Features/auth/authSlice.ts";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function UserDropdown() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    }
    const user =
        useAppSelector(redux => redux.auth.user);
    const [isOpen, setIsOpen] = useState(false);

    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    function closeDropdown() {
        setIsOpen(false);
    }
    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
            >
                <div className="flex items-center space-x-3 pl-3 border-l border-slate-200
                    dark:border-slate-700">
                    <img
                        src={`${APP_ENV.API_BASE_URL}/images/${user ? user.image : "default.png"}`}
                        alt="User"
                        className="w-8 h-8 rounded-full ring-2 ring-blue-500"
                    />
                    <div className="hidden md:block">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {Array.isArray(user?.roles) ? user.roles.join(", ") : user?.roles}
                        </p>
                    </div>
                </div>
                <svg
                    className={`stroke-gray-500 dark:stroke-red-500 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            <Dropdown
                isOpen={isOpen}
                onClose={closeDropdown}
                className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark z-50"
            >
                <div>
          <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400">
            {user?.firstName} {user?.lastName}
          </span>
                    <span className="mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400">
                    {user?.roles}
          </span>
                </div>

                <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                    <li>
                        <DropdownItem
                            onItemClick={closeDropdown}
                            tag="a"
                            to="/profile"
                            className="flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                            <User/>
                            Edit profile
                        </DropdownItem>
                    </li>
                </ul>
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                >
                    <LogOut/>
                    Logout
                </button>
            </Dropdown>
        </div>
    );
}