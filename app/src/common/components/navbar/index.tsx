import axios from "axios";
import { toast } from "react-hot-toast";
import { baseUrl } from "../../../pages/home";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../../../pages/posts/create-post";
import {
  setIsAuthenticated,
  setShowCreatePost,
  setShowLoader,
  setShowSignInPage,
  setShowSignUpPage,
} from "../../redux-utils/utils-slice/utilsSlice";
import SignIn from "../sign-in";
import SignUp from "../register-page";
import Loader from "../loader";

export const Navbar = () => {
  const showSignInPage = useSelector((state: any) => state.showSignInPage);
  const showSignUpPage = useSelector((state: any) => state.showSignUpPage);
  const showCreatePost = useSelector((state: any) => state.showCreatePost);
  const showLoader = useSelector((state: any) => state.showLoader);
  const showMenu = useSelector((state: any) => state.showMenu);
  const isAuthenticated = useSelector((state: any) => state.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(setShowLoader(true));
    try {
      await axios.get(`${baseUrl}/users/sign_out`, { withCredentials: true });
      toast.success("Logged Out Successfully");
      dispatch(setIsAuthenticated(false));
      dispatch(setShowLoader(false));
    } catch (err: any) {
      toast.error(err?.response.data.message);
      dispatch(setIsAuthenticated(true));
      dispatch(setShowLoader(false));
    }
  };

  const handleOpenCreatePost = () => {
    if (showSignInPage || showSignUpPage) {
      dispatch(setShowSignUpPage(false));
      dispatch(setShowSignInPage(false));
    }
    if (isAuthenticated) {
      dispatch(setShowCreatePost(true));
    } else {
      toast.error("Sign in first");
    }
  };

  return (
    <>
      <nav
        className={`${
          showMenu ? "left-0" : "left-[-300px]"
        } absolute min-h-screen w-full border-r-4 border-gray-300 dark:bg-gray-200 p-4 duration-300 pt-20`}
      >
        <ul className="font-medium w-full gap-10 p-4 mt-4 border border-gray-100 rounded-lg dark:border-gray-300">
          <li
            onClick={() => {
              dispatch(setShowCreatePost(false));
              dispatch(setShowSignInPage(false));
            }}
            className="block cursor-pointer py-2 pl-3 pr-4 text-gray-700 rounded "
          >
            Home
          </li>
          <li
            onClick={handleOpenCreatePost}
            className="block cursor-pointer py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-300"
          >
            Create
          </li>
          {isAuthenticated && (
            <li className="block cursor-pointer py-2 pl-3 pr-4 text-gray-400 rounded hover:bg-gray-300">
              Profile
            </li>
          )}
          {isAuthenticated ? (
            <li
              className="block cursor-pointer py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-300 "
              onClick={handleLogout}
            >
              {showLoader ? <Loader /> : "SignOut"}
            </li>
          ) : (
            <li
              onClick={() => {
                if (showCreatePost || showSignUpPage) {
                  dispatch(setShowCreatePost(false));
                  dispatch(setShowSignUpPage(false));
                }
                dispatch(setShowSignInPage(!showSignInPage));
              }}
              className="block cursor-pointer py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-300 "
            >
              SignIn
            </li>
          )}
        </ul>
      </nav>
      <div
        className={`${
          showCreatePost || showSignUpPage || showSignInPage
            ? "left-[600px]"
            : "left-0"
        } absolute duration-300 h-screen flex items-center justify-center`}
      >
        {showCreatePost && <CreatePost />}
        {showSignUpPage && <SignUp />}
        {showSignInPage && <SignIn />}
      </div>
    </>
  );
};
