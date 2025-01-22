import { useOutletContext } from "react-router-dom";
import { IContext, IPost } from "../../../../helpers/types";
import { useEffect, useRef, useState } from "react";
import { Http } from "../../../../helpers/api";
import { BASE_URL } from "../../../../helpers/constants";

export const ProfileHeader = () => {
  const { user, refetch } = useOutletContext<IContext>(); 
  const photo = useRef<null | HTMLInputElement>(null);
  const [preview, setPreview] = useState("");
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    if (user?.id) {
      Http.get<IPost[]>(`/posts?userId=${user.id}`).then((response) => {
        setPosts(response.data);
      });
    }
  }, [user]);

  const handleChange = () => {
    const upload = photo.current?.files?.[0];
    if (!upload) return;

    const reader = new FileReader();
    reader.readAsDataURL(upload);
    reader.onload = () => setPreview(reader.result as string);
  };

  const handleUpload = () => {
    const form = new FormData();
    const file = photo.current?.files?.[0];
    if (!file) return;

    form.append("picture", file);
    Http.patch("/profile/upload", form).then(() => {
      refetch(); 
      setPreview("");
    });
  };

  return (
    user && (
      <div className="bg-gray-900 text-white flex flex-col items-start p-6">
        <div className="flex items-center gap-6 mb-6">
          <img
            onClick={() => photo.current?.click()}
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-600 shadow-md"
            src={
              user.picture
                ? BASE_URL + user.picture
                : "https://cdn0.iconfinder.com/data/icons/seo-web-4-1/128/Vigor_User-Avatar-Profile-Photo-01-512.png"
            }
            alt="User avatar"
          />
          <div>
            <h1 className="text-2xl font-bold">
              {user.name} {user.surname}
            </h1>
            <p className="text-gray-400 text-sm mt-2 flex items-center gap-2">
              <img
                src={
                  user.isPrivate
                    ? "https://cdn4.iconfinder.com/data/icons/remixicon-system/24/lock-password-line-64.png"
                    : "https://cdn0.iconfinder.com/data/icons/typicons-2/24/lock-open-outline-64.png"
                }
                alt="Privacy status"
                className="w-5 h-5"
              />
              {user.isPrivate ? "Private" : "Public"}
            </p>
          </div>
        </div>
        <input type="file" ref={photo} style={{ display: "none" }} onChange={handleChange} />

        {preview && (
          <div className="flex flex-col items-center bg-gray-800 text-white p-4 rounded-lg shadow-lg w-full max-w-sm mx-auto">
            <p className="text-gray-400 text-sm mb-3">Preview...</p>
            <div className="w-24 h-24 bg-gray-700 flex items-center justify-center rounded-full overflow-hidden mb-3">
              <img className="object-cover w-full h-full" src={preview} alt="Image preview" />
            </div>
            <div className="flex justify-end gap-3 w-full">
              <button
                onClick={handleUpload}
                className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1.5 rounded-md shadow transition text-sm"
              >
                Upload
              </button>
              <button
                onClick={() => setPreview("")}
                className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1.5 rounded-md shadow transition text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    )
  );
};
