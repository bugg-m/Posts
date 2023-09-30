import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { baseUrl } from "../../../pages/home";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAuthenticated,
  setShowCreateBlog,
  setShowLoader,
  setShowSignInPage,
  setShowSignUpPage,
} from "../../redux-utils/utils-slice/utilsSlice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const showLoader = useSelector((state: any) => state.showLoader);
  const showSignIpPage = useSelector((state: any) => state.showSignIpPage);
  const showCreateBlog = useSelector((state: any) => state.showCreateBlog);
  const dispatch = useDispatch();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(setShowLoader(true));
    try {
      const { data } = await axios.post(
        `${baseUrl}/users/sign_in`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      dispatch(setIsAuthenticated(true));
      dispatch(setShowSignInPage(false));
      dispatch(setShowLoader(false));
    } catch (err: any) {
      toast.error(err.response.data.message);
      dispatch(setIsAuthenticated(false));
      dispatch(setShowSignInPage(true));
      dispatch(setShowLoader(false));
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="p-6 w-96 dark:bg-gray-800 border rounded-md dark:border-gray-700 space-y-4 md:space-y-6 sm:p-8"
    >
      <div className="flex justify-between">
        <div className="text-lg font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          Sign In
        </div>
        <div
          onClick={() => dispatch(setShowSignInPage(false))}
          className="text-xl text-white"
        >
          <CgClose />
        </div>
      </div>
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
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
          <a
            href="#"
            className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Forgot password?
          </a>
        </div>
        <button
          disabled={showLoader}
          type="submit"
          className="w-full border border-gray-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Sign In
        </button>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet?{" "}
          <li
            onClick={() => {
              if (showCreateBlog || showSignIpPage) {
                dispatch(setShowCreateBlog(false));
                dispatch(setShowSignInPage(false));
              }
              dispatch(setShowSignUpPage(true));
            }}
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign-Up
          </li>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
