import { Link } from "react-router-dom";

function Header() {
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
                    <Link
                        to="/login"
                        className="hover:text-gray-200 transition font-medium"
                    >
                        Логін
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
