import { Outlet } from "react-router";
import HeaderAdmin from "./HeaderAdmin.tsx";
import {useState} from "react";
import {useAppSelector} from "../../app/store.ts";
import {Navigate} from "react-router-dom";
import Sidebar from "./Sidebar.tsx";

function AppLayout()  {
    const [sideBarCollapsed, setSideBarCollapsed] = useState(false);
    const user =
        useAppSelector(redux => redux.auth.user);
    if (!user) {
        return <Navigate to="/login" replace/>;
    }

    if (!user.roles?.includes("Admin")) {
        return <Navigate to="/" replace/>;
    }
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50
            dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">
                <div className="flex h-screen overflow-hidden">
                    <Sidebar
                        collapsed={sideBarCollapsed}
                    />
                    <div className="flex-1 flex flex-col overflow-hidden">
                        <HeaderAdmin
                            sidebarCollapsed={sideBarCollapsed}
                            onToggleSidebar={() => setSideBarCollapsed(!sideBarCollapsed)}
                        />
                        <main className="flex-1 overflow-y-auto bg-transparent">
                            <div className="p-6 space-y-6">
                                <Outlet/>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
};


export default AppLayout;