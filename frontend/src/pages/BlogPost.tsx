import { Appbar } from "../components/Appbar";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { useUser } from "../hooks/useUser";


export const BlogPost = () => {
  const { id } = useParams();
  const { blog, loading } = useBlog({ id: id! });
  const { userLoading } = useUser();
  if (loading || userLoading) return <div>Loading...</div>;
  return (
    <div>
      <Appbar  />
      <div>
        <FullBlog blog={blog!} />
      </div>
    </div>
  );
};
