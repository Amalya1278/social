import { useContext, useState } from "react";
import { AccountContext } from "../context";
import { Http } from "../../../../helpers/api";
import { BASE_URL } from "../../../../helpers/constants";
import { ActionButton } from "./action-button";

export const AccountHeader = () => {
  const context = useContext(AccountContext);
  if (!context) throw new Error("Out of provider...");

  const { account } = context;
  const [posts, setPosts] = useState(account?.posts || []);

  const handleLike = async (postId: number, isLiked: boolean) => {
    try {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                isLiked: !isLiked,
                likesCount: isLiked
                  ? post.likesCount > 0
                    ? post.likesCount - 1
                    : 0
                  : (post.likesCount || 0) + 1,
              }
            : post
        )
      );

      const response = await Http.post(`/posts/react/${postId}`, { like: !isLiked });
      if (response.data.status === "success") {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  isLiked: !isLiked,
                  likesCount: isLiked
                    ? post.likesCount > 0
                      ? post.likesCount - 1
                      : 0
                    : (post.likesCount || 0) + 1,
                }
              : post
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center gap-6 mb-6">
        {account.picture && (
          <img
            className="w-44 h-44 rounded-full object-cover border-indigo-500 border-solid border-4"
            src={BASE_URL + account.picture}
            alt="User Profile"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">
            {account.name} {account.surname}
          </h1>
          <p className="text-gray-400 text-sm mt-2 flex items-center gap-2">
            <img
              src={
                account.isPrivate
                  ? "https://cdn4.iconfinder.com/data/icons/remixicon-system/24/lock-password-line-64.png"
                  : "https://cdn0.iconfinder.com/data/icons/typicons-2/24/lock-open-outline-64.png"
              }
              alt="Privacy status"
              className="w-5 h-5"
            />
            {account.isPrivate ? "Private" : "Public"}
          </p>
        </div>
      </div>

      <div className="flex gap-8">
        <div className="flex flex-col">
          <p className="text-sm font-bold text-blue-400">{account.followers?.length || 0}</p>
          <p className="text-gray-400 text-sm">Followers</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold text-blue-400">{account.following?.length || 0}</p>
          <p className="text-gray-400 text-sm">Following</p>
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-bold text-blue-400">{posts.length || 0}</p>
          <p className="text-gray-400 text-sm">Posts</p>
        </div>
      </div>

      <ActionButton />

     
      {account.isPrivate && !account.following ? (
        <div className="p-6 bg-gray-800 min-h-screen">
          <p className="text-gray-400 text-center">This account is private. Follow to view posts.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 bg-gray-800 min-h-screen">
          {posts.length > 0 ? (
            posts.map((post) => {
              return (
                <div key={post.id} className="bg-gray-800 p-4 rounded shadow-md">
                  {post.picture && (
                    <img
                      src={BASE_URL + post.picture}
                      alt="User Post"
                      className="w-full rounded mb-2"
                      style={{ objectFit: "cover", height: "200px" }}
                    />
                  )}
                  <p className="text-gray-400">{post.title}</p>
                  <div className="flex items-center justify-between mt-2">
                    <button
                      onClick={() => handleLike(post.id, post.isLiked)}
                      className="flex items-center gap-2 text-white"
                    >
                      <img
                        src={`https://img.icons8.com/ios-filled/50/${
                          post.isLiked ? "ff0000" : "ffffff"
                        }/like.png`}
                        alt="Like"
                        className="w-5 h-5"
                      />
                      <span>{post.likesCount}</span>
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-400">No posts available</p>
          )}
        </div>
      )}
    </>
  );
};
