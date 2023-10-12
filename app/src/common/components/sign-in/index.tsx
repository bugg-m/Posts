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
import { CheckBox, Input } from "../../constants/input-bar";
import Label from "../../constants/label";
import { Div, DivFlex } from "../../constants/div";
import TextField from "../../constants/text-header";
import Button, { TextButton } from "../../constants/button";

const SignIn = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
          toast.error(err?.response?.data?.message);
          dispatch(setIsAuthenticated(false));
          dispatch(setShowSignInPage(true));
          dispatch(setUser([]));
          dispatch(setShowLoader(false));
        });
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
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
    <Div
      onClick={(e) => e.stopPropagation()}
      className="p-10 min-w-[500px] relative pt-36 min-h-screen bg-gray-300 border-r-4 border-gray-400"
    >
      <Div
        onClick={() => dispatch(setShowSignInPage(false))}
        className="text-2xl text-gray-700 cursor-pointer pt-2 absolute top-20 right-2"
      >
        <TiArrowBackOutline />
      </Div>

      <Div className="text-lg h-16 font-semibold leading-tight tracking-tight text-gray-700">
        Sign in to your account
      </Div>

      <form
        encType="multipart/form-data"
        method="POST"
        onSubmit={handleSign_In}
        className="space-y-4 md:space-y-6 mb-5"
      >
        <Div>
          <Label title="Email" className="" />
          <Input
            className=""
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Div>
        <Div>
          <Label title="Password" className="" />
          <Input
            className=""
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Div>
        <DivFlex justify="between">
          <Div className="flex items-start">
            <Div className="flex items-center h-5">
              <CheckBox
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              />
            </Div>
            <Div className="ml-3 text-sm">
              <Label title="Remember me" className="text-gray-700" />
            </Div>
          </Div>
          <TextField className="text-sm font-medium text-gray-700 hover:underline dark:text-primary-500">
            Forgot password?
          </TextField>
        </DivFlex>
        <DivFlex justify="center" className="w-full">
          <Button disabled={showLoader} type="submit">
            Sign In
          </Button>
        </DivFlex>
      </form>
      <TextField className="text-sm font-light text-gray-700">
        Don’t have an account yet?
        <TextButton
          onClick={() => {
            dispatch(setShowSignInPage(false));
            dispatch(setShowSignUpPage(true));
            dispatch(setShowCreatePost(false));
          }}
          value="signup"
        >
          Sign-Up
        </TextButton>
      </TextField>
    </Div>
  );
};

export default SignIn;
