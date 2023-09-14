import { CgMenu, CgClose } from "react-icons/cg";
import { useContext, useState } from "react";
import { FaBlog } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { TodoContext, baseUrl } from "../../../pages/home";
import { useDispatch } from "react-redux";
import CreateBlog from "../../../pages/blogs/create-blog";
import { setShowCreateBlog } from "../../redux-utils/utils-slice/utilsSlice";

export const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const { isAuthenticated, setIsAuthenticated, loading, setLoading }: any =
    useContext(TodoContext);

  const dispatch = useDispatch();
  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.get(`${baseUrl}/users/logout`, { withCredentials: true });
      toast.success("Logged Out Successfully");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (err) {
      // toast.error(err?.response?.data.message);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };
  const handleClose = () => {};
  return (
    <>
      <nav
        onClick={handleClose}
        className="bg-white h-[70px] border-gray-200 dark:bg-gray-800"
      >
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center">
            <FaBlog className="h-8 mx-3 text-3xl text-white logo-icon" />
            <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-white">
              Blogs
            </span>
          </a>
          <div>
            <div className="hidden w-full md:block md:w-auto">
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700">
                <Link
                  to={"/"}
                  className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                >
                  Home
                </Link>
                <li
                  onClick={() => dispatch(setShowCreateBlog(true))}
                  className="block relative py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Create
                  {loading && (
                    <div className="absolute top-10">
                      <CreateBlog />
                    </div>
                  )}
                </li>
                {isAuthenticated && (
                  <Link
                    to={"/profile"}
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Profile
                  </Link>
                )}
                {isAuthenticated ? (
                  <button
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    disabled={loading}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to={"/login"}
                    className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Login
                  </Link>
                )}
              </ul>
            </div>
            <div>
              {openMenu ? (
                <CgClose
                  className="md:hidden block text-white text-[2.5rem] pr-4 z-50 duration-200"
                  onClick={() => {
                    setOpenMenu(!openMenu);
                  }}
                />
              ) : (
                <CgMenu
                  className="md:hidden block text-white text-[2.5rem] pr-4 z-50 duration-200"
                  onClick={() => {
                    setOpenMenu(!openMenu);
                  }}
                />
              )}

              <ul
                className={`md:hidden flex flex-col text-white mt-3 pt-[50px] dark:bg-gray-800 h-screen w-1/2 p-4 text-xl fixed ${
                  openMenu ? "left-[0]" : "left-[-100%]"
                } duration-500`}
              >
                <Link
                  to={"/"}
                  className="block my-2 py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                >
                  Home
                </Link>
                <Link
                  to={"/task"}
                  className="block my-2 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Tasks
                </Link>
                {isAuthenticated ? (
                  <Link
                    to={"/profile"}
                    className="block my-2 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Profile
                  </Link>
                ) : (
                  ""
                )}
                {isAuthenticated ? (
                  <button
                    className="block my-2 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    disabled={loading}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to={"/login"}
                    className="block my-2 py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Login
                  </Link>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
