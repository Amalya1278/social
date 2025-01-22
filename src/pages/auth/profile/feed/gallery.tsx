import { useState, useEffect } from "react";
import { IPost } from "../../../../helpers/types";
import { Http } from "../../../../helpers/api";

export const Gallery = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [deleted,setDeleted]=useState<number | null>(null)

  useEffect(() => {
    Http.get("/posts").then((response) => {
      setPosts(response.data.payload);
    });
  }, []);

  const handleLikeToggle = async (postId: number, didILike: boolean) => {
    try {
      
  
      const response = await Http.post(`/posts/react/${postId}`, { like: !didILike });
      if (response.data.status === "success") {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? { 
                  ...post, 
                  didILike: !didILike,
                  likesCount: post.likesCount + (!didILike ? 1 : -1) 
                }
              : post
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete=async()=>{
    try{
      const response= await Http.delete(`/posts/${deleted}`)
      if(response.data.status=="ok"){
        setPosts((post)=>post.filter(item=>item.id!=deleted))
        setDeleted(null)
      }
    }
    catch(error){
      console.log(error)
    }
  }
  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-gray-800 min-h-screen">
      {posts.map((post) => (
        <div key={post.id} className="bg-gray-800 p-4 rounded shadow-md">
          {post.picture && (
            <img
              src={`http://localhost:4002${post.picture}`}
              alt="User Post"
              className="w-full rounded mb-2"
              style={{ objectFit: "cover", height: "200px" }}
            />
          )}
          <p className="text-gray-400">{post.title}</p>

          <div className="flex items-center justify-between mt-2">
            <button
              onClick={() => handleLikeToggle(post.id, post.isLiked)}
              className="flex items-center gap-2 text-white transition-all duration-300"
            >
              <img
                src={`https://img.icons8.com/ios-filled/50/${post.isLiked ? "ff0000" : "ffffff"}/like.png`}
                alt="Like"
                className="w-5 h-5 transition-all duration-300"
              />
              <span>{post.likesCount}</span>
            </button>
            {(
              <button
                onClick={() => setDeleted(post.id)} 
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
      {deleted !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 p-6 rounded shadow-lg">
            <p className="text-white mb-4">doyou want you delete this post?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleted(null)}
                className="text-gray-300 hover:text-white"
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
