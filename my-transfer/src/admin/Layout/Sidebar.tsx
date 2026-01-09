import {
    Zap,
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    ChevronDown,
    Package,
    Building2Icon,
    BuildingIcon,
    Tickets
} from "lucide-react";
import {useAppSelector} from "../../app/store.ts";
import APP_ENV from "../../env";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import type {SidebarProps} from "../../Interfaces/props/SidebarProps.ts";
const menuItems = [
    {
        id: "dashboard",
        icon: LayoutDashboard,
        label: "Dashboard",
        active: true,
        badge: "New",
    },
    {
        id:"country",
        icon: Building2Icon,
        label: "Country",
        submenu:[
            {id: "countries", label: "Countries"},
            {id: "add-country", label: "Add Country"},
        ],
    },
    {
        id:"city",
        icon: BuildingIcon,
        label: "City",
        submenu:[
            {id: "cities", label: "Cities"},
            {id: "add-city", label: "Add City"},
        ],
    },
    {
        id:"ticket",
        icon: Tickets,
        label: "Ticket",
        submenu: [
            {id: "tickets", label: "Tickets"},
            {id: "add-tickets", label: "Add Tickets"},
        ]
    },
    {
        id: "inventory",
        icon: Package,
        label: "Inventory",
        count: "847",
    },
    {
        id: "users",
        icon: Users,
        label: "Users",
        count: "2.4k",
        submenu: [
            {id: "all-users", label: "All Users"},
            {id: "roles", label: "Roles & Permissions"},
            {id: "activity", label: "User Activity"},
        ],
    },
    {
        id: "reports",
        icon: FileText,
        label: "Reports",
    },
    {
        id: "settings",
        icon: Settings,
        label: "Settings",
    }
]

function Sidebar({collapsed}:SidebarProps) {
    const user =
        useAppSelector(redux => redux.auth.user);
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
    const location = useLocation();
    const navigate = useNavigate();
    const toggleExpended = (itemId: string)=>{
        const newExpanded = new Set(expandedItems);
        if(newExpanded.has(itemId)){
            newExpanded.delete(itemId);
        }
        else{
            newExpanded.add(itemId);
        }
        setExpandedItems(newExpanded);
    };
    const isActive = (id: string) =>
        location.pathname.includes(id);

    return (
        <div className={`${
                collapsed ? "w-20" : "w-72"
            } transition-all duration-300 ease-in-out bg-white/80 dark:bg-slate-900/80
        backdrop-blur-xl border-r border-slate-200/50 dark:border-slate-700/50 flex flex-col relative z-10`}
        >
            <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-center space-x-3">
                    <div
                        className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Zap className="w-6 h-6 text-white"/>
                    </div>
                    {!collapsed && (
                        <div>
                            <h1 className="text-xl font-bold text-slate-800 dark:text-white">
                                Transfer
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Admin panel
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => (
                    <div key={item.id}>
                        <button
                            className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                                isActive(item.id)
                                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                                    : "text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                            }`}
                            onClick={() => {
                                if (item.submenu) {
                                    toggleExpended(item.id);
                                } else {
                                    navigate(`/admin-panel/${item.id}`);
                                }
                            }}
                        >
                            <div className="flex items-center space-x-3">
                                <item.icon
                                    className={`w-5 h-5 ${
                                        isActive(item.id)
                                            ? "text-white"
                                            : "text-slate-500 dark:text-white"
                                    }`}
                                />
                                {!collapsed && (
                                    <>
                                        <span className={`font-medium ml-2 ${
                                                isActive(item.id) ? "text-white" : "text-slate-500 dark:text-white"
                                            }`}
                                        >
                                            {item.label}
                                        </span>
                                        {item.badge && (
                                            <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                        {item.count && (
                                            <span
                                                className="px-2 py-1 text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full"
                                            >
                                                {item.count}
                                            </span>
                                        )}
                                    </>
                                )}
                            </div>
                            {!collapsed && item.submenu && (
                                <ChevronDown className="w-4 h-4 transition-transform"/>
                            )}
                        </button>

                        {!collapsed && item.submenu && expandedItems.has(item.id) && (
                            <div className="ml-8 mt-2 space-y-1 transition-all duration-200">
                                {item.submenu.map((subItem) => (
                                    <button
                                        key={subItem.id}
                                        className={`w-full text-left p-2 text-sm rounded-lg transition-all ${
                                            isActive(subItem.id)
                                                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                                                : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                                        }`}
                                        onClick={() => navigate(`/admin-panel/${subItem.id}`)}
                                    >
                                        {subItem.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </nav>

            {!collapsed && (
                <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                        <img
                            src={`${APP_ENV.API_BASE_URL}/images/${user ? user.image : "default.png"}`}
                            alt="user"
                            className="w-10 h-10 rounded-full ring-2 ring-blue-500"
                        />
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-800 dark:text-white truncate">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                {user?.roles}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Sidebar;