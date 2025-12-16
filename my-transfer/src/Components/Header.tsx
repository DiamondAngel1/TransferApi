import {Link, useNavigate} from "react-router-dom";
import {logout} from "../Features/auth/authSlice.ts";
import {useAppSelector} from "../app/store.ts";
import {useDispatch} from "react-redux";
import APP_ENV from "../env";

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
                    {user!=null ? (
                        <>
                            <Link to="/user/Profile"
                                  className="hover:underline flex items-center h-full">
                                <div className="flex items-center justify-end gap-4">
                                    <img src={`${APP_ENV.API_BASE_URL}/images/${user ? user.image : "default.png"}`} alt="logo"
                                         className={"rounded-full w-8 h-8"}/>
                                    <h1 className={"text-xl"}>{`${user?.firstName} ${user?.lastName}`}</h1>
                                </div>
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
