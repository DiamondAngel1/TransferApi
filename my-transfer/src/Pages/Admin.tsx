import Sidebar from "../Components/Layout/Sidebar.tsx";
import HeaderAdmin from "../Components/Layout/HeaderAdmin.tsx";
import {useState} from "react";
import Dashboard from "../Components/Dashboard/Dashboard.tsx";
import CitiesPage from "./CitiesPage.tsx";
import AddCountry from "./AddCountry.tsx";
import AddCities from "./AddCities.tsx";
import HomePage from "./HomePage.tsx";
import {useAppSelector} from "../app/store.ts";
import {Navigate} from "react-router-dom";

function Admin() {
    const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
    const [currentPage, setCurrentPage] = useState("dashboard");
    const user =
        useAppSelector(redux => redux.auth.user);
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!user.roles?.includes("Admin")) {
        return <Navigate to="/" replace />;
    }
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50
            dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
                <div className="flex h-screen overflow-hidden">
                    <Sidebar
                        collapsed={sideBarCollapsed}
                        onToggle={()=>setSideBarCollapsed(!sideBarCollapsed)}
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                    />
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <HeaderAdmin
                            sidebarCollapsed={sideBarCollapsed}
                            onToggleSidebar={()=>setSideBarCollapsed(!sideBarCollapsed)}
                        />
                        <main className="flex-1 overflow-y-auto bg-transparent">
                            <div className="p-6 space-y-6">
                                {currentPage === "dashboard" && <Dashboard/>}
                                {currentPage === "cities" && <CitiesPage/>}
                                {currentPage === "countries" && <HomePage/>}
                                {currentPage === "add-city" && <AddCities/>}
                                {currentPage === "add-country" && <AddCountry/>}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Admin;