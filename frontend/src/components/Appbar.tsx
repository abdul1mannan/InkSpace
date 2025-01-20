import { Avatar } from "./BlogCard";
export const Appbar = () => {
  return (
    <div className="border-b w-full">
      <div className="flex  items-center justify-between p-4">
        <div className="text-xl font-bold">InkSpace</div>
        <div className="flex items-center">
          <Avatar authorName="Abdul Mannan" size={8} />
          <div>Abdul Mannan</div>
        </div>
      </div>
    </div>
  );
};
