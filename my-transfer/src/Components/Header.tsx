import {Link, useNavigate} from "react-router-dom";
import {logout} from "../Features/auth/authSlice.ts";
import {useAppSelector} from "../app/store.ts";
import {useDispatch} from "react-redux";
import APP_ENV from "../env";
import {ThemeToggleButton} from "../admin/Components/common/ThemeToggleButton.tsx";
import RedirectBtn from "./RedirectBtn.tsx";
import {ShoppingCart} from "lucide-react";
import {useState} from "react";
import CartSideBar from "./CartSideBar.tsx";

function Header() {
    // const token = useSelector((state: RootState) => state.auth.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user =
        useAppSelector(redux => redux.auth.user);
    console.log(user)
    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    }
    const [isCartOpen, setIsCartOpen] = useState(false);
    return (
        <header className="bg-black text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6 py-6">
                <h1 className="text-xl font-bold">My Transfer</h1>
                <nav className="flex space-x-6">
                    {user!=null && user.roles == "Admin" && (
                        <RedirectBtn/>
                    )}
                    <Link
                        to="tickets"
                        className="hover:text-gray-200 transition flex items-center font-medium"
                    >
                        Квитки
                    </Link>
                    <Link
                        to="/"
                        className="hover:text-gray-200 transition flex items-center font-medium"
                    >
                        Країни
                    </Link>
                    <Link
                        to="/cities"
                        className="hover:text-gray-200 transition flex items-center font-medium"
                    >
                        Міста
                    </Link>
                    {user!=null ? (
                        <>
                            <Link to="/Profile"
                                  className="hover:text-gray-200 transition flex items-center font-medium">
                                <div className="flex items-center justify-end gap-1">
                                    <img src={`${APP_ENV.API_BASE_URL}/images/${user ? user.image : "default.png"}`} alt="logo"
                                         className={"rounded-full w-8 h-8"}/>
                                    <span className="hover:text-gray-200 transition flex items-center font-medium">
                                        {`${user?.firstName} ${user?.lastName}`}
                                    </span>
                                </div>
                            </Link>
                            <button onClick={() => setIsCartOpen(true)}
                                    className="hover:text-gray-200 transition flex items-center font-medium"
                            >
                                <ShoppingCart />
                            </button>
                            <button
                                onClick={handleLogout}
                                className="hover:text-gray-200 transition flex items-center font-medium"
                            >
                                Вихід
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="hover:text-gray-200 transition flex items-center font-medium"
                            >
                                Логін
                            </Link>
                            <Link
                                to="/register"
                                className="hover:text-gray-200 transition flex items-center font-medium"
                            >
                                Реєстрація
                            </Link>
                        </>
                    )}
                    <ThemeToggleButton/>
                </nav>
            </div>
            {isCartOpen && (
                <CartSideBar onClose={() => setIsCartOpen(false)} />
            )}
        </header>
    );
}

export default Header;
