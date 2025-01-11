import { useForm } from "react-hook-form";
import { IPost, IResponse } from "../../../../helpers/types";
import { useRef, useState } from "react";
import { Http } from "../../../../helpers/api";

export const AddPost = ({ onNewPost }: { onNewPost: (newPost: IPost) => void }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IPost>();
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const form = new FormData();
    form.append("photo", file);

    Http.patch<IResponse>("/posts/upload", form)
      .then(() => console.log("Image uploaded successfully"))
      .catch((error) => console.error("Upload failed:", error));
  };

  const onSubmit = (data: IPost) => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    const newPost: IPost = { ...data, photo: file };

    onNewPost(newPost);
    reset();
    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form 
  className="bg-white dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg space-y-6 max-w-2xl ml-20 relative left-[-45%] border border-gray-200 dark:border-gray-700"
  onSubmit={handleSubmit(onSubmit)}
>
  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 text-center">Add a New Post</h3>
  <div className="space-y-3">
    <label className="block text-gray-600 dark:text-gray-300 font-medium">Upload Image</label>
    <label className="block w-full text-center bg-blue-500 dark:bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 transition cursor-pointer">
      Choose File
      <input
        id="photo"
        type="file"
        className="hidden"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageChange}
      />
    </label>
    {errors.photo && <p className="text-red-500 text-sm">{errors.photo.message}</p>}
    {preview && (
      <div className="mt-2 flex justify-center">
        <img src={preview} alt="Preview" className="w-48 h-48 object-cover rounded-lg shadow-md" />
      </div>
    )}
  </div>
  <div>
    <label className="block text-gray-600 dark:text-gray-300 font-medium mb-2">Description</label>
    <textarea
      {...register("content", { required: "Please fill this field" })}
      placeholder="Write your post here"
      className="w-full h-28 border border-gray-300 dark:border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-200 dark:placeholder-gray-400"
    />
    {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
  </div>
  <button
    type="submit"
    className="w-full bg-green-500 dark:bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-600 dark:hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-700 transition duration-300"
  >
    Post
  </button>
</form>

  );
}; 