import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../../../pages/home";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAuthenticated,
  setShowLoader,
  setShowSignUpPage,
} from "../../redux-utils/utils-slice/utilsSlice";
import { CgClose } from "react-icons/cg";
import Loader from "../loader";

const SignUp = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    message: "",
    flag: false,
  });
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const showLoader = useSelector((state: any) => state.showLoader);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(setShowLoader(false));
    try {
      const { data } = await axios.post(
        `${baseUrl}/users/sign_up`,
        { name, email, password, role },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      dispatch(setIsAuthenticated(true));
      dispatch(setShowSignUpPage(false));
      dispatch(setShowLoader(false));
    } catch (error: any) {
      toast.error(error.response.data.message);
      dispatch(setIsAuthenticated(false));
      dispatch(setShowSignUpPage(true));
      dispatch(setShowLoader(false));
    }
  };

  const handlePassword = (e: any) => {
    let new_pass = e.target.value;
    setPassword(new_pass);
    setError({ message: "Password is weak!", flag: true });
    const lowerCase = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    const specialChar = /[!@#$%^&*]/g;
    const numbers = /[0-9]/g;
    if (!new_pass.match(lowerCase)) {
      setError({
        message: "Password should contain atleast 1 lowercase character!",
        flag: true,
      });
    } else if (!new_pass.match(upperCase)) {
      setError({
        message: "Password should contain atleast 1 uppercase character!",
        flag: true,
      });
    } else if (!new_pass.match(specialChar)) {
      setError({
        message: "Password should contain atleast 1 special character!",
        flag: true,
      });
    } else if (!new_pass.match(numbers)) {
      setError({
        message: "Password should contain atleast 1 number character!",
        flag: true,
      });
    } else if (new_pass.length < 8) {
      setError({
        message: "Password is too short!",
        flag: true,
      });
    } else {
      setError({ message: "Strong Password!", flag: false });
    }
  };

  const resetForm = () => {
    setEmail("");
    setName("");
    setPassword("");
    setRole("");
    setError({ message: "", flag: false });
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="p-6 h-3/4 mb-20 max-w-xl dark:bg-gray-800 border rounded-md dark:border-gray-700 space-y-4 md:space-y-6 sm:p-8"
    >
      <div className="flex pt-5 justify-between">
        <div className="text-lg font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Create new Account
        </div>
        <div
          onClick={() => {
            resetForm();
            dispatch(setShowSignUpPage(false));
          }}
          className="text-xl text-white"
        >
          <CgClose />
        </div>
      </div>
      <form
        className="space-y-4 md:space-y-6"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center items-center gap-10">
          <div className="h-20">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your Name
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="name"
              minLength={3}
              maxLength={40}
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
          <div className="h-20">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="email"
              name="email"
              minLength={20}
              maxLength={60}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
        </div>
        <div className="flex justify-center items-center gap-10">
          <div className="h-32">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePassword}
              required
            />
            {error.message ? (
              <span
                className={`${
                  error.flag ? "text-red-600" : "text-green-600"
                } text-[10px]`}
              >
                {error.message}
              </span>
            ) : null}
          </div>
          <div className="h-32">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Role
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="text"
              name="role"
              placeholder="Enter your password"
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="text-gray-500 dark:text-gray-300">
                Remember me
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center w-full gap-5">
          <button
            type="submit"
            className="h-10 border border-gray-700 text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            {showLoader ? <Loader /> : "Register"}
          </button>
        </div>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <li className="font-medium text-primary-600 hover:underline dark:text-primary-500">
            Log-In Here
          </li>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
