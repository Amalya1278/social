import { createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/login";
import { Signup } from "../pages/signup";
import { Layout } from "../pages/auth/layout";
import { Profile } from "../pages/auth/profile";
import { Settings } from "../pages/auth/settings";
import { UpdatePassword } from "../pages/auth/settings/updateP";
import { UpdateLogin } from "../pages/auth/settings/updateL";



export const routes = createBrowserRouter([
    { path: '', element: <Login /> },
    { path: 'signup', element: <Signup /> },
    {
        path: 'profile',
        element: <Layout />,
        children: [
            { path: '', element: <Profile /> },
            {
                path: 'settings',
                element: <Settings />,
                children: [
                    { path: 'password', element: <UpdatePassword /> },
                    { path: 'login', element: <UpdateLogin /> },
                ]
            }
        ]
    }
]);
