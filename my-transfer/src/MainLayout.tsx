import { Outlet, useLocation } from "react-router-dom";
import Header from "./Components/Header.tsx";

export default function MainLayout() {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith("/admin-panel");


    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
            {isAdmin ? (
                <></>
            ) : (
                <Header />
            )}
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}
