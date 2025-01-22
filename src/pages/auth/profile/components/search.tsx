import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHttpQuery } from "../../../../helpers/useHttp";
import { IResponse, IUser } from "../../../../helpers/types";
import { BASE_URL } from "../../../../helpers/constants";
import { useDebounce } from "../../../../helpers/useDebounce";
export const Search = () => {
    const [text, setText] = useState("");
    const query=useDebounce<string>(text,500)//ushacac textna darnum
    const { data, loading, setData,error, refetch } = useHttpQuery<IResponse>("/search/" + text, false);
    const users: IUser[] | null = data ? (data.payload as IUser[]) : null;
    useEffect(() => {
        if(!query) return setData({status:'',message:'',payload:[]}as IResponse)//jnjeluc heto maqrvi voch te mna
        
            refetch();
        
    }, [query]);
    return (
        <div className="max-w-md mx-auto p-4 bg-gray-800 rounded-lg shadow-md">
            <input
                placeholder="Search for a friend..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-3 mb-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div>
                {loading && <p className="text-gray-400">Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}
                <p className="mb-2 text-lg font-semibold text-gray-300">Results</p>
                <div className="space-y-4">
                    {users?.map((user) => (
                        <Link
                            to={`/profile/${user.id}`}
                            key={user.id}
                            className="flex items-center p-3 bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <img
                                src={
                                    user.picture
                                        ? BASE_URL + user.picture
                                        : "https://cdn0.iconfinder.com/data/icons/business-and-management-flat-8/24/PROFILE_profile_picture_profile_icon_user_profile-512.png"
                                }
                                alt={user.name}
                                className="w-12 h-12 rounded-full object-cover border border-gray-500"
                            />
                            <p className="ml-4 text-gray-200">
                                {user.name} {user.surname}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};