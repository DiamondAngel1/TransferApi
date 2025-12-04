import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.ts";

function Header() {
    const {token,logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    }
    return (
        <header className="bg-black text-white shadow-md">
            <div className="container mx-auto flex justify-between items-center px-6 py-6">
                <h1 className="text-xl font-bold">My Transfer</h1>
                <nav className="flex space-x-6">
                    <Link
                        to="/"
                        className="hover:text-gray-200 transition font-medium"
                    >
                        Країни
                    </Link>
                    <Link
                        to="/cities"
                        className="hover:text-gray-200 transition font-medium"
                    >
                        Міста
                    </Link>
                    {token ? (
                        <>
                            <Link
                                to="/profile"
                                className="hover:text-gray-200 transition font-medium"
                            >
                                Профіль
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="hover:text-gray-200 transition font-medium"
                            >
                                Вихід
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="hover:text-gray-200 transition font-medium"
                            >
                                Логін
                            </Link>
                            <Link
                                to="/register"
                                className="hover:text-gray-200 transition font-medium"
                            >
                                Реєстрація
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
}

export default Header;
