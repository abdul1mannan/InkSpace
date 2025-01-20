import { Qoute } from "../components/Qoute";
import { Auth } from "../components/Auth";
export const SignUp = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex justify-center items-center text-xl font-bold">
        <Auth type="signup" />
      </div>
      <div className="hidden lg:block">
        <Qoute />
      </div>
    </div>
  );
};
 