import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { SignupSchema } from "@abdul1mannan/inkspace-common";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<SignupSchema>({
    email: "",
    password: "",
    name: "",
  });
  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/${type}`,
        postInputs
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      if (type === "signup") {
        alert("Signup successful");

        navigate("/");
      } else {
        alert("Signin successful");
        navigate("/blogs");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        alert(error.response.data.error);
      }
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col md:flex">
      <div className="text-3xl font-extrabold text-center ">
        {type === "signup" ? "Create an account" : "Sign in"}
      </div>
      <div className="text-lg font-semibold text-slate-400 py-1">
        {type === "signup"
          ? " Already have an account?"
          : "Don't have an account?"}{" "}
        <Link className="underline" to={type === "signup" ? "/" : "/signup"}>
          {type === "signup" ? "Sign in" : "Sign up"}
        </Link>
      </div>
      {type === "signup" ? (
        <>
          <LabelledInput
            label="Name"
            placeholder="Name"
            onChange={(e) =>
              setPostInputs({ ...postInputs, name: e.target.value })
            }
          />
        </>
      ) : null}

      <LabelledInput
        label="Email"
        placeholder="Email"
        onChange={(e) =>
          setPostInputs({ ...postInputs, email: e.target.value })
        }
      />
      <LabelledInput
        label="Password"
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setPostInputs({ ...postInputs, password: e.target.value })
        }
      />
      <button
        onClick={sendRequest}
        type="button"
        className="text-white mt-6 bg-gray-800 w-full hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        {type === "signup" ? "Sign up" : "Sign in"}
      </button>
    </div>
  );
};

interface LabelledInputProps {
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabelledInput({
  label,
  placeholder,
  type,
  onChange,
}: LabelledInputProps) {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        id={label}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
