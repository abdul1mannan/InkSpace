import { Appbar } from "../components/Appbar";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";

export const BlogPost = () => {
  const { id } = useParams();
  const { blog, loading } = useBlog({ id: id! });
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="w-screen max-w-2xl">
          <div className="text-2xl font-bold">{blog?.title}</div>
          <div className="text-sm text-slate-500">{blog?.author.name}</div>
          <div className="text-md font-thin">{blog?.content}</div>
        </div>
      </div>
    </div>
  );
};
