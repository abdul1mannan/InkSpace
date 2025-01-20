import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";
import { useUser } from "../hooks/useUser";

export const Appbar = () => {
  const { user, userLoading } = useUser();
  if (userLoading) {
    return null; 
  }

  return (
    <div className="border-b w-full">
      <div className="flex items-center justify-between px-10 py-4">
        <Link to="/blogs">
          <div className="text-xl font-bold cursor-pointer">InkSpace</div>
        </Link>
        <div className="flex items-center gap-2">
          <Link to="/publish">
            <button
              type="button"
              className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-xs px-2 py-1.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              New
            </button>
          </Link>
          <Avatar authorName={user?.name || ""} size={6} />
          <div>{user?.name}</div>
        </div>
      </div>
    </div>
  );
};
