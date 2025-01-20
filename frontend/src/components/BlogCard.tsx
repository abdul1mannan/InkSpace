import { Link } from "react-router-dom";

interface BlogCardProps {
  id: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}
export const BlogCard = ({
  id,
  title,
  content,
  authorName,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b-2 border-slate-200 pb-4 p-4 w-screen max-w-2xl ">
        <div className="flex items-center gap-2">
          <div className="flex justify-center items-center">
          <Avatar authorName={authorName} />
        </div>
        <div className="text-sm">{authorName}</div>
        <div className="text-xs text-slate-500">&#9679;</div>
        <div className="text-sm text-slate-500">{publishedDate}</div>
      </div>
      <div className="text-xl font-bold ">{title}</div>
      <div className="text-md font-thin">{content.slice(0, 100) + "..."}</div>
      <div className="text-sm text-slate-500 font-thin">{`${Math.ceil(
        content.length / 100
      )} minutes(s) read`}</div>
    </div>
    </Link>
  );
};

export function Avatar({
  authorName,
  size = 6,
}: {
  authorName: string;
  size?: number;
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500 `}
    >
      <span className="text-xs text-gray-600 dark:text-gray-300">
        {authorName.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}
