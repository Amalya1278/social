import { AddPost } from "./addpost";
import { Gallery } from "./gallery";
import { IPost, IResponse } from "../../../../helpers/types"; 
import { useHttpQuery } from "../../../../helpers/useHttp";
import { useState } from "react";
import { Http } from "../../../../helpers/api";

export const Feed = () => {
  const { data: posts, refetch } = useHttpQuery<IPost[]>("/posts");
  const [localPosts, setLocalPosts] = useState<IPost[]>(posts || []);
  const [showAddPost, setShowAddPost] = useState(false);  

  const handleNewPost = (newPost: IPost) => {
    setLocalPosts([newPost, ...localPosts]); 
    const formData = new FormData();
    formData.append("photo", newPost.photo);
    formData.append("content", newPost.content);

    Http.post<IResponse>("/posts", formData)
      .then(() => {
        refetch(); 
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
  };

  const toggleAddPostForm = () => {
    setShowAddPost(!showAddPost);  
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
        <button
    onClick={toggleAddPostForm}
    className="bg-blue-500 text-white py-2 px-4 rounded-md relative left-[-34%] hover:bg-blue-600 focus:outline-none"
  >
    {showAddPost ? "Cancel" : "Add Post"}
  </button>

      {showAddPost && <AddPost onNewPost={handleNewPost} />}

      <Gallery posts={localPosts} />
    </div>
  );
}; 