import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAuthenticated,
  setShowCreatePost,
  setShowLoader,
  setShowSignInPage,
  setShowSignUpPage,
  setUser,
} from "../../redux-utils/utils-slice/utilsSlice";
import { MdDoubleArrow } from "react-icons/md";
import Label from "../../constants/label";
import { Input, InputFile } from "../../constants/input-bar";
import { sign_up } from "../../apis/userServices";

const SignUp = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    message: "",
    flag: false,
  });
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();
  const showLoader = useSelector((state: any) => state.showLoader);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    dispatch(setShowLoader(false));
    const formData = new FormData();
    formData.append("avatar", "avatar");
    const payload = { name, email, password, role, avatar };
    try {
      sign_up(payload)
        .then((res) => {
          const { success, user, message } = res;
          if (success) {
            toast.success(message);
            dispatch(setUser(user));
            dispatch(setIsAuthenticated(true));
            dispatch(setShowSignUpPage(true));
          } else {
            toast.error(message);
            dispatch(setShowSignUpPage(false));
            dispatch(setUser([]));
            dispatch(setIsAuthenticated(false));
          }
          dispatch(setShowLoader(false));
        })
        .catch((err: string) => {
          toast.success(err);
          dispatch(setShowLoader(false));
          dispatch(setShowSignUpPage(false));
          dispatch(setIsAuthenticated(false));
          dispatch(setUser([]));
        });
    } catch (error: any) {
      toast.error(error.response.data.message);
      dispatch(setIsAuthenticated(false));
      dispatch(setShowSignUpPage(true));
      dispatch(setUser([]));
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
      className="p-10 min-w-[500px] relative pt-36 min-h-screen bg-gray-300 border-r-4 border-gray-400"
    >
      <div
        onClick={() => {
          resetForm();
          dispatch(setShowSignUpPage(false));
        }}
        className="text-2xl text-gray-700 cursor-pointer pt-2 absolute top-20 right-2"
      >
        <MdDoubleArrow />
      </div>
      <div className="text-lg h-16 font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Create new Account
      </div>
      <form
        encType="multipart/form-data"
        className="space-y-4 md:space-y-6"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center items-center gap-10">
          <div className="h-20">
            <Label title="Your Name" className="" />
            <Input
              className=""
              type="text"
              name="name"
              placeholder="Enter your name"
              value={name}
              handleEvent={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="h-20">
            <Label className="" title="Your email" />
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
        </div>
        <div className="flex justify-center items-center gap-10">
          <div className="h-32">
            <Label className="" title="Password" />
            <Input
              className=""
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              handleEvent={handlePassword}
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
            <Label className="" title="Role" />
            <Input
              className=""
              type="text"
              name="role"
              placeholder="Enter your password"
              value={role}
              handleEvent={(e) => setRole(e.target.value)}
              required={false}
            />
          </div>
        </div>
        <div>
          <div className="h-32">
            <Label className="" title="Profile" />
            <InputFile
              className=""
              type="file"
              name="avatar"
              placeholder="Enter your password"
              value={avatar}
              handleEvent={(e: any) => setAvatar(e.target.files[0])}
              required={false}
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
            disabled={showLoader}
            type="submit"
            className="h-10 border border-gray-700 text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Register
          </button>
        </div>
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <button
            onClick={() => {
              dispatch(setShowSignInPage(true));
              dispatch(setShowSignUpPage(false));
              dispatch(setShowCreatePost(false));
            }}
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Log-In Here
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
