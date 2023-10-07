import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAuthenticated,
  setShowLoader,
  setShowSignInPage,
  setShowCreatePost,
  setShowSignUpPage,
  setUser,
} from "../../redux-utils/utils-slice/utilsSlice";
import { sign_in } from "../../apis/userServices";
import { TiArrowBackOutline } from "react-icons/ti";
import { Input } from "../../constants/input-bar";
import Label from "../../constants/label";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const showLoader = useSelector((state: any) => state.showLoader);
  const dispatch = useDispatch();

  const handleSign_In = (e: any) => {
    const payload = { email, password };
    e.preventDefault();
    dispatch(setShowLoader(true));
    try {
      sign_in(payload)
        .then((res) => {
          const { success, user, message } = res;
          if (success) {
            toast.success(message);
            dispatch(setIsAuthenticated(true));
            dispatch(setShowSignInPage(false));
            dispatch(setUser(user));
            resetForm();
          } else {
            toast.error(message);
            dispatch(setIsAuthenticated(false));
            dispatch(setUser([]));
            dispatch(setShowSignInPage(true));
          }
          dispatch(setShowLoader(false));
        })
        .catch((err) => {
          toast.error(err);
          dispatch(setIsAuthenticated(false));
          dispatch(setShowSignInPage(true));
          dispatch(setUser([]));
          dispatch(setShowLoader(false));
        });
    } catch (err: any) {
      toast.error(err.response.data.message);
      dispatch(setIsAuthenticated(false));
      dispatch(setShowSignInPage(true));
      dispatch(setUser([]));
      dispatch(setShowLoader(false));
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="p-10 min-w-[500px] relative pt-36 min-h-screen bg-gray-300 border-r-4 border-gray-400"
    >
      <div
        onClick={() => dispatch(setShowSignInPage(false))}
        className="text-2xl text-gray-700 cursor-pointer pt-2 absolute top-20 right-2"
      >
        <TiArrowBackOutline />
      </div>

      <div className="text-lg h-20 font-semibold leading-tight tracking-tight text-gray-700">
        Sign in to your account
      </div>

      <form
        encType="multipart/form-data"
        method="POST"
        onSubmit={handleSign_In}
        className="space-y-4 md:space-y-6"
      >
        <div>
          <Label title="Email" className="" />
          <Input
            className=""
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            handleEvent={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <Label title="Password" className="" />
          <Input
            className=""
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            handleEvent={(e) => setPassword(e.target.value)}
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
        <div className="flex justify-center items-center w-full gap-5">
          <button
            disabled={showLoader}
            type="submit"
            className="h-10 border border-gray-700 text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Sign In
          </button>
        </div>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet?
          <button
            onClick={() => {
              dispatch(setShowSignInPage(false));
              dispatch(setShowSignUpPage(true));
              dispatch(setShowCreatePost(false));
            }}
            value="signup"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Sign-Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
