import { NavLink, Outlet } from "react-router-dom";

export const Settings = () => {
    return (
        <div className="settings-page p-6 bg-gray-900 min-h-screen text-white">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <div className="flex space-x-4 mb-6">
                <NavLink 
                    to="password" 
                    className={({ isActive }) => 
                        `px-4 py-2 rounded ${isActive ? "bg-blue-500" : "bg-gray-700"}`
                    }
                >
                    Change Password
                </NavLink>

                <NavLink 
                    to="login" 
                    className={({ isActive }) => 
                        `px-4 py-2 rounded ${isActive ? "bg-blue-500" : "bg-gray-700"}`
                    }
                >
                    Change Login
                </NavLink>
            </div>
            <Outlet />
        </div>
    );
};
