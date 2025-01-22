import { useState, useEffect } from 'react';
import { Http } from '../../../helpers/api';
import { IUser } from '../../../helpers/types';
import { BASE_URL } from '../../../helpers/constants';


export const Followings = () => {
    const [followings, setFollowings] = useState<IUser[]>([]);

    useEffect(() => {
        Http.get<{ status: string, payload: IUser[] }>('/following')
            .then(response => {
                console.log(response)
                if (response.data.status === "ok") {
                    setFollowings(response.data.payload);  
                } else {
                    console.error("something went wrong with fetching");
                }
            })
            .catch(error => {
                console.error("something went wrong", error);
            });
    }, []);  

    return (
        <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-blue-400 mb-4">Followings</h2>
            {followings.length === 0 ? (
                <p className="text-gray-400">No followings yet</p>
            ) : (
                <ul>
                    {followings.map((following) => (
                                            <li key={following.id} className="flex items-center gap-4 text-gray-300 mb-3">
                                                <img 
                                                    src={following.picture ? BASE_URL + following.picture : "https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_User-Avatar-Profile-Photo-01-512.png"} 
                                                    alt={`${following.name} ${following.surname}`} 
                                                    className="w-20 h-20 rounded-full object-cover"
                                                />
                                                <span>{following.name} {following.surname}</span>
                                            </li>
                                        ))}
                </ul>
            )}
        </div>
    );
};
