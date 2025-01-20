import { Auth } from "../components/Auth";
import { Qoute } from "../components/Qoute";
export const SignIn = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex justify-center items-center text-xl font-bold">
        <Auth type="signin" />
      </div>
      <div className="invisible md:visible">
        <Qoute />
      </div>
    </div>
  );
};
