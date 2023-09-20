import { CgMenu, CgClose } from "react-icons/cg";
import { useState } from "react";
import { FaBlog } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import { baseUrl } from "../../../pages/home";
import { useDispatch, useSelector } from "react-redux";
import CreateBlog from "../../../pages/blogs/create-blog";
import {
  setIsAuthenticated,
  setShowCreateBlog,
  setShowLoader,
  setShowSignInPage,
  setShowSignUpPage,
} from "../../redux-utils/utils-slice/utilsSlice";
import SignIn from "../sign-in";
import SignUp from "../register-page";

export const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const showSignInPage = useSelector((state: any) => state.showSignInPage);
  const showSignUpPage = useSelector((state: any) => state.showSignUpPage);
  const showCreateBlog = useSelector((state: any) => state.showCreateBlog);
  const showLoader = useSelector((state: any) => state.showLoader);
  const isAuthenticated = useSelector((state: any) => state.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(setShowLoader(true));
    try {
      await axios.get(`${baseUrl}/users/sign-out`, { withCredentials: true });
      toast.success("Logged Out Successfully");
      dispatch(setIsAuthenticated(false));
      dispatch(setShowLoader(false));
    } catch (err: any) {
      toast.error(err?.response.data.message);
      dispatch(setIsAuthenticated(true));
      dispatch(setShowLoader(false));
    }
  };

  const handleOpenCreateBlog = () => {
    if (showSignInPage || showSignUpPage) {
      dispatch(setShowSignUpPage(false));
      dispatch(setShowSignInPage(false));
    }
    if (isAuthenticated) {
      dispatch(setShowCreateBlog(true));
    } else {
      toast.error("Sign in first");
    }
  };

  return (
    <>
      <nav className="h-16 border-gray-300 dark:bg-gray-200">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center">
            <FaBlog className="h-8 mx-3 text-3xl text-gray-700 logo-icon" />
            <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-gray-700">
              Blogs
            </span>
          </a>
          <div>
            <div className="hidden w-full md:block cursor-pointer md:w-auto">
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-gray-50 dark:bg-gray-300 md:dark:bg-gray-200 dark:border-gray-300">
                <li
                  onClick={() => {
                    dispatch(setShowCreateBlog(false));
                    dispatch(setShowSignInPage(false));
                  }}
                  className="block cursor-pointer dark:hover:text-gray-800 py-2 pl-3 pr-4 text-gray-700  rounded md:bg-transparent md:p-0 dark:text-gray-700"
                >
                  Home
                </li>
                <li
                  onClick={handleOpenCreateBlog}
                  className="block cursor-pointer py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-gray-700 dark:hover:bg-gray-400 dark:hover:text-gray-800 md:dark:hover:bg-transparent"
                >
                  Create
                  {showCreateBlog && (
                    <div className="absolute w-full h-screen left-0 top-16 flex items-center justify-center">
                      <CreateBlog />
                    </div>
                  )}
                </li>
                {isAuthenticated && (
                  <li className="block cursor-pointer py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-gray-700 dark:hover:bg-gray-400 dark:hover:text-gray-800 md:dark:hover:bg-transparent">
                    Profile
                  </li>
                )}
                {isAuthenticated ? (
                  <button
                    className="block cursor-pointer py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-gray-700 dark:hover:bg-gray-400 dark:hover:text-gray-800 md:dark:hover:bg-transparent"
                    disabled={showLoader}
                    onClick={handleLogout}
                  >
                    SignOut
                  </button>
                ) : (
                  <li
                    onClick={() => {
                      if (showCreateBlog || showSignUpPage) {
                        dispatch(setShowCreateBlog(false));
                        dispatch(setShowSignUpPage(false));
                      }
                      dispatch(setShowSignInPage(true));
                    }}
                    className="block cursor-pointer py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-gray-700 dark:hover:bg-gray-400 dark:hover:text-gray-800 md:dark:hover:bg-transparent"
                  >
                    SignIn
                    {showSignInPage && (
                      <div className="absolute w-full h-screen left-0 top-16 flex items-center justify-center">
                        <SignIn />
                      </div>
                    )}
                    {showSignUpPage && (
                      <div className="absolute w-full h-screen left-0 top-16 flex items-center justify-center">
                        <SignUp />
                      </div>
                    )}
                  </li>
                )}
              </ul>
            </div>
            <div>
              {openMenu ? (
                <CgClose
                  className="md:hidden block cursor-pointer text-gray-700 text-4xl pr-4 z-50 duration-200"
                  onClick={() => {
                    setOpenMenu(!openMenu);
                  }}
                />
              ) : (
                <CgMenu
                  className="md:hidden block cursor-pointer text-gray-700 text-4xl pr-4 z-50 duration-200"
                  onClick={() => {
                    setOpenMenu(!openMenu);
                  }}
                />
              )}

              <ul
                className={`md:hidden flex flex-col text-gray-700 mt-3 pt-[50px] dark:bg-gray-800 h-screen w-1/2 p-4 text-xl fixed ${
                  openMenu ? "left-[0]" : "left-[-100%]"
                } duration-500`}
              >
                <li className="block cursor-pointer my-2 py-2 pl-3 pr-4 text-gray-700 rounded md:bg-transparent md:p-0 dark:text-gray-700 ">
                  Home
                </li>
                <li className="block cursor-pointer my-2 py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-gray-700 dark:hover:text-gray-800 md:dark:hover:bg-transparent">
                  Tasks
                </li>
                {isAuthenticated ? (
                  <li className="block cursor-pointer my-2 py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-gray-700 dark:hover:text-gray-800 md:dark:hover:bg-transparent">
                    Profile
                  </li>
                ) : (
                  ""
                )}
                {isAuthenticated ? (
                  <button
                    className="block cursor-pointer my-2 py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-gray-700 dark:hover:text-gray-800 md:dark:hover:bg-transparent"
                    disabled={showLoader}
                    onClick={handleLogout}
                  >
                    SignOut
                  </button>
                ) : (
                  <li
                    onClick={() => {
                      if (showCreateBlog) {
                        dispatch(setShowCreateBlog(false));
                      }
                      dispatch(setShowSignInPage(true));
                    }}
                    className="block cursor-pointer my-2 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-gray-700 dark:hover:text-gray-800 md:dark:hover:bg-transparent"
                  >
                    SignIn
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
