import { useState, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { IPost } from "../../../../helpers/types";
import { Http } from "../../../../helpers/api";

export const AddPost = () => {
  const [description, setDescription] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const photo = useRef<HTMLInputElement | null>(null);
  const { refetch } = useOutletContext<IPost>();

  

  const handleSubmit = async () => {
    if (!photo.current?.files?.[0]) {
      setErrorMessage("Please provide a photo.");
      return;
    }
    const formData = new FormData();
    formData.append("photo", photo.current?.files?.[0] || "");
    formData.append("content", description);

    await Http.post("/posts", formData);
    setDescription("");
    setPreview(null);
    if (photo.current) {
      photo.current.value = "";
    }
    setShowInput(false);
    refetch();
    setErrorMessage("");
  };
  const handlePreview = () => {
    const file = photo.current?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-300 dark:border-gray-700">
      {!showInput && (
        <button
          onClick={() => setShowInput(true)}
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300 w-full"
        >
          <img
            src="https://img.icons8.com/ios-filled/50/ffffff/plus.png"
            alt="Add Post"
            className="w-5 h-5 mr-2"
          />
          Add Post
        </button>
      )}

      {showInput && (
        <>
          <input
            type="file"
            ref={photo}
            className="hidden"
            onChange={handlePreview}
          />

         
          
            <button
              onClick={() => photo.current?.click()}
              className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded-lg shadow-md transition duration-300"
            >
              Choose Photo
            </button>
           
         <textarea
            className="w-full p-3 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-md border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            placeholder="Write a description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow-md transition duration-300"
            >
              Post
            </button>

          {preview && (
            <div className="mt-4 flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          {errorMessage && (
            <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
          )}
        </>
      )}
    </div>
  );
};
