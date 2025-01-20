import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";
export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className="grid grid-cols-12 pt-10 w-full max-w-screen-2xl">
      <div className="col-span-1"></div>
      <div className="col-span-7 pr-8 text-justify">
        <div className="text-3xl font-extrabold pb-1">{blog?.title}</div>
        <div className="text-sm text-slate-500 pb-2">Posted on 2nd January, 2025</div>
        <div className="text-sm font-thin">{blog?.content}</div>
      </div>

      <div className="col-span-4">
        <div className="flex items-center pb-1 text-slate-500">Author</div>
        <div className="flex">
            <div className="pt-4  ">
            <Avatar authorName={blog?.author.name||""}  />
            </div>
           <div className="px-2">
           <div className="font-bold text-lg">{blog?.author.name}</div>
            <div className="text-sm text-slate-500">
              {blog?.author.name} is a software engineer at Google.
            </div>
       
           </div>
           
        </div>

      
        </div>
      </div>

  );
};
