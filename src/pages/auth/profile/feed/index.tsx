
import { AddPost } from "./addpost";
import { Gallery } from "./gallery";

export const Feed = () => {
  return (
    <div className="bg-gray-900 text-white p-6 min-h-screen">
      <AddPost />
      <Gallery />
    </div>
  );
};