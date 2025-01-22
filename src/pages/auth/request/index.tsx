import { useState, useEffect } from "react";
import { Http } from "../../../helpers/api";
import { IUser } from "../../../helpers/types";

export const Requests = () => {
    const [requests, setRequests] = useState<IUser[]>([]);

    useEffect(() => {
        Http.get("/requests")
            .then((response) => {
                console.log(response.data.payload);
                if (response.data.status === "ok") {
                    setRequests(response.data.payload);
                }
            })
            .catch((error) => console.error(error));
    }, []);

    const handleAccept = async (id: number) => {
        try {
            const response = await Http.patch(`/requests/accept/${id}`);
            if (response.data.status === "ok") {
                setRequests((prevRequests) =>
                    prevRequests.filter((request) => request.id !== id)
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDecline = async (id: number) => {
        try {
            const response = await Http.patch(`/requests/decline/${id}`);
            if (response.data.status === "ok") {
                setRequests((prevRequests) =>
                    prevRequests.filter((request) => request.id !== id)
                );
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="requests-page">
            <h2 className="text-2xl font-bold mb-4">Requests</h2>
            {requests.length === 0 ? (
                <p>No requests</p>
            ) : (
                <div>
                    {requests.map((request) => (
                        <div key={request.id} className="flex justify-between items-center mb-4 p-4 bg-gray-800 rounded-md">
                            <div className="flex items-center">
                                <span className="text-white">
                                    {request.user?.name} {request.user?.surname}
                                </span>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleAccept(request.id)}
                                    className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleDecline(request.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                                >
                                    Decline
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
