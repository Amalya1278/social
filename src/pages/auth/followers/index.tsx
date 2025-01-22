import { useState, useEffect } from 'react';
import { Http } from '../../../helpers/api';
import { IUser } from '../../../helpers/types';
import { BASE_URL } from '../../../helpers/constants';

export const Followers = () => {
    const [followers, setFollowers] = useState<IUser[]>([]);

    useEffect(() => {
        Http.get<{ status: string, payload: IUser[] }>('/followers')
            .then(response => {
                if (response.data.status === "ok") {
                    setFollowers(response.data.payload);  
                } else {
                    console.error(" something went wrong with fetching");
                }
            })
            .catch(error => {
                console.error("something went wrong", error);
            });
    }, []); 

    return (
        <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-blue-400 mb-4">Followers</h2>
            {followers.length === 0 ? (
                <p className="text-gray-400">No followers yet</p>
            ) : (
                <ul>
                    {followers.map((follower) => (
                        <li key={follower.id} className="flex items-center gap-4 text-gray-300 mb-3">
                            <img 
                                src={follower.picture ? BASE_URL + follower.picture : "https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_User-Avatar-Profile-Photo-01-512.png"} 
                                alt={`${follower.name} ${follower.surname}`} 
                                className="w-20 h-20 rounded-full object-cover"
                            />
                            <span>{follower.name} {follower.surname}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
