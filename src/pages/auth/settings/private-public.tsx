import { useState, useEffect } from "react";
import { Http } from "../../../helpers/api";
import { useOutletContext } from "react-router-dom";
import { IContext } from "../../../helpers/types";

export const PrivatePublic = () => {
  const {refetch} = useOutletContext<IContext>();
  const [isPrivate, setIsPrivate] = useState<boolean>(false);

  useEffect(() => {
    const storedStatus = localStorage.getItem("privacyStatus");
    setIsPrivate(storedStatus === "private");
  }, []);

  const handlePrivate = async () => {
    try {
      const response = await Http.patch("/account/set");
      if (response.data.status === "ok") {
        const newStatus = !isPrivate;
        setIsPrivate(newStatus);
        localStorage.setItem("privacyStatus", newStatus ? "private" : "public");
        await refetch()
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <button
        onClick={handlePrivate}
        className="flex items-center gap-2 p-2 bg-gray-700 rounded"
      >
        <img
          src={
            isPrivate
              ? "https://cdn4.iconfinder.com/data/icons/remixicon-system/24/lock-password-line-64.png"
              : "https://cdn0.iconfinder.com/data/icons/typicons-2/24/lock-open-outline-64.png"
          }
          alt="Lock"
          className="w-6 h-6"
        />
        <span className="text-white">{isPrivate ? "Private" : "Public"}</span>
      </button>
    </div>
  );
};
