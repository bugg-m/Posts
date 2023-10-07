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
import Li from "../../constants/menu-li";
import { Div, DivAbsolute, DivFlex, Ul } from "../../constants/div";

export const Navbar = () => {
  const showSignInPage: boolean = useSelector(
    (state: any) => state.showSignInPage
  );
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
    if (isAuthenticated) {
      dispatch(setShowCreatePost(true));
      dispatch(setShowSignInPage(false));
      dispatch(setShowSignUpPage(false));
    } else {
      toast.error("Sign in first");
    }
  };

  return (
    <>
      <DivAbsolute
        className={`${showMenu ? "left-0" : "left-[-300px]"}  ${
          showCreatePost || showSignUpPage || showSignInPage
            ? "border-gray-800"
            : "border-gray-800"
        } absolute duration-300 min-h-screen w-full border-r-4 dark:bg-gray-900 p-4 pt-20`}
      >
        <Ul className="">
          <Li
            handleEvent={() => {
              dispatch(setShowCreatePost(false));
              dispatch(setShowSignInPage(false));
            }}
            name="Home"
            className=""
            hidden={false}
          />

          <Li
            handleEvent={handleOpenCreatePost}
            hidden={false}
            className=""
            name="Post"
          />

          {isAuthenticated && (
            <Li
              hidden={false}
              className=""
              name="Profile"
              handleEvent={() => console.log("profile")}
            />
          )}
          {isAuthenticated ? (
            <Li
              hidden={showLoader}
              className=""
              handleEvent={handleLogout}
              name="SignOut"
            />
          ) : (
            <Li
              handleEvent={() => {
                if (showCreatePost || showSignUpPage) {
                  dispatch(setShowCreatePost(false));
                  dispatch(setShowSignUpPage(false));
                }
                dispatch(setShowSignInPage(true));
              }}
              className=""
              name="SignIn"
              hidden={false}
            />
          )}
        </Ul>
        <Div className="font-medium w-full p-4 mt-48 border border-gray-100 bg-gray-800 rounded-lg dark:border-gray-300">
          <Li
            handleEvent={() => {
              if (showCreatePost || showSignUpPage) {
                dispatch(setShowCreatePost(false));
                dispatch(setShowSignUpPage(false));
              }
              dispatch(setShowSignInPage(true));
            }}
            className=""
            name="Settings"
            hidden={false}
          />
        </Div>
      </DivAbsolute>
      <DivFlex
        justify="center"
        className={`${
          showCreatePost || showSignUpPage || showSignInPage
            ? "left-full"
            : "left-0"
        } absolute duration-300 h-screen -z-10`}
      >
        {showCreatePost && <CreatePost />}
        {showSignUpPage && <SignUp />}
        {showSignInPage && <SignIn />}
      </DivFlex>
    </>
  );
};
