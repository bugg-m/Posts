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
import { IoArrowUndo } from "react-icons/io5";
import Label from "../../constants/label";
import { CheckBox, Input } from "../../constants/input-bar";
import { sign_up } from "../../apis/userServices";
import { Div, DivFlex, DivSwipe } from "../../constants/div";
import TextField from "../../constants/text-header";
import Button from "../../constants/button";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<string>("user");
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
    formData.append("avatar", "file");
    const payload = { name, email, password, role, avatar };
    try {
      sign_up(payload)
        .then((res) => {
          const { success, user, message } = res;
          if (success) {
            toast.success(message);
            dispatch(setUser(user));
            dispatch(setIsAuthenticated(true));
            dispatch(setShowSignUpPage(false));
          } else {
            toast.error(message);
            dispatch(setShowSignUpPage(true));
            dispatch(setUser([]));
            dispatch(setIsAuthenticated(false));
          }
          dispatch(setShowLoader(false));
        })
        .catch((err) => {
          toast.success(err?.response?.data?.message);
          dispatch(setShowLoader(false));
          dispatch(setShowSignUpPage(true));
          dispatch(setIsAuthenticated(false));
          dispatch(setUser([]));
        });
    } catch (error: any) {
      // toast.error(error);
      console.log("error: " + error);

      dispatch(setIsAuthenticated(false));
      dispatch(setShowSignUpPage(true));
      dispatch(setUser([]));
      dispatch(setShowLoader(false));
    }
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <DivSwipe
      handleEvent={(e) => e.stopPropagation()}
      className="p-10 min-w-[500px] relative pt-36 min-h-screen bg-gray-300 border-r-4 border-gray-400"
    >
      <Div
        onClick={() => {
          resetForm();
          dispatch(setShowSignUpPage(false));
        }}
        className="text-2xl text-gray-700 cursor-pointer pt-2 absolute top-20 right-2"
      >
        <IoArrowUndo />
      </Div>
      <TextField className="text-lg h-16 font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Create new Account
      </TextField>
      <form
        encType="multipart/form-data"
        className="space-y-4 md:space-y-6"
        method="POST"
        onSubmit={handleSubmit}
      >
        <DivFlex justify="center" className="gap-10">
          <Div className="h-20">
            <Label title="Your Name" />
            <Input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              required
            />
          </Div>
          <Div className="h-20">
            <Label title="Your email" />
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />
          </Div>
        </DivFlex>
        <DivFlex justify="center" className="gap-10">
          <Div className="h-32">
            <Label title="Password" />
            <Input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePassword}
              required
            />
            {error.message ? (
              <TextField
                className={`${
                  error.flag ? "text-red-600" : "text-green-600"
                } text-[10px]`}
              >
                {error.message}
              </TextField>
            ) : null}
          </Div>
          <Div className="h-32">
            <Label title="Role" />
            <Input
              type="text"
              name="role"
              placeholder="Enter your password"
              value={role}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRole(e.target.value)
              }
            />
          </Div>
        </DivFlex>
        <Div>
          <Div className="h-32">
            <Label title="Profile" />
            <Input
              type="file"
              name="avatar"
              placeholder="Enter your password"
              onChange={(e: any) => setAvatar(e.target.files[0])}
            />
          </Div>
        </Div>
        <DivFlex justify="center" className="gap-10">
          <Div className="flex items-start">
            <Div className="flex items-center h-5">
              <CheckBox
                name="rememberMe"
                id="remember"
                aria-describedby="remember"
                type="checkbox"
              />
            </Div>
            <Div className="ml-3 text-sm">
              <Label
                title=" Remember me"
                className="text-gray-500 dark:text-gray-300"
              />
            </Div>
          </Div>
        </DivFlex>

        <DivFlex justify="center" className=" w-full gap-5">
          <Button disabled={showLoader} type="submit">
            Register
          </Button>
        </DivFlex>
        <TextField className="text-sm font-light text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Button
            type="button"
            onClick={() => {
              dispatch(setShowSignInPage(true));
              dispatch(setShowSignUpPage(false));
              dispatch(setShowCreatePost(false));
            }}
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Log-In Here
          </Button>
        </TextField>
      </form>
    </DivSwipe>
  );
};

export default SignUp;
