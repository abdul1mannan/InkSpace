import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { useBlogs } from "../hooks";
import { useUser } from "../hooks/useUser";

export const Blog = () => {
  const { blogs, loading: blogsLoading } = useBlogs();
  const { userLoading } = useUser();
  
  // Wait for both user and blogs to finish loading
  const isLoading = userLoading || blogsLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-center">
        <Appbar />
      </div>
      <div className="flex justify-center">
        <div>
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author.name}
              title={blog.title}
              content={blog.content}
              publishedDate="2024-01-01"
            />
          ))}
        </div>
      </div>
    </div>
  );
};
