import { IPost } from "../../../../helpers/types";

export const Gallery = ({ posts }: { posts: IPost[] | null }) => {
  if (!Array.isArray(posts)) {
    return <div className="text-center text-gray-500">No posts available.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ml-[-34%]"> 
      {posts.length === 0 ? (
        <div className="col-span-full text-gray-500">No posts available.</div>
      ) : (
        posts.map((post, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <img 
              src={URL.createObjectURL(post.photo)} 
              alt="Post" 
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="text-gray-700 mt-2">{post.content}</p>
          </div>
        ))
      )}
    </div>
  );
};