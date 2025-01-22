import { Link, Outlet, useNavigate } from 'react-router-dom';
import { METHODS, useHttpMutation, useHttpQuery } from '../../helpers/useHttp';
import { IAccount, IAccountContext, IResponse } from '../../helpers/types';

import { useEffect, useState } from 'react';
import { AccountContext } from './account/context';

export const Layout = () => {
    const links = [
        { name: 'Home', href: '/profile' },
        { name: 'Settings', href: '/profile/settings' },
        { name: 'Followers', href: '/profile/followers' },
        { name: 'Followings', href: '/profile/following' },
        { name: 'Messages', href: '/profile/messages' },
        { name: 'Requests', href: '/profile/requests' },

    ];
    
    const navigate = useNavigate();
    const { data, loading, refetch } = useHttpQuery<IResponse>("/verify");
    const [logout] = useHttpMutation<IResponse>(() => navigate('/'));

    // Add state for account data
    const [account, setAccount] = useState<IAccount | null>(null);

    useEffect(() => {
        if (data?.user) {
            setAccount(data.user as IAccount);
        }
    }, [data]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <AccountContext.Provider value={{ account, refetch } as IAccountContext}> {/* ✅ Provide AccountContext */}
            <div className="min-h-screen bg-gray-900 text-gray-200">
                <nav className="bg-gray-800 shadow-md">
                    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-blue-400">AraratGram</h1>
                        <ul className="flex space-x-6">
                            {links.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.href}
                                        className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <button onClick={() => logout('/logout', METHODS.POST)}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </nav>

                <main className="container mx-auto px-4 py-6">
                    <Outlet context={{ user: account, refetch }} />
                </main>
            </div>
        </AccountContext.Provider>
    );
};
