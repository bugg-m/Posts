import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import CreatePost from "../../../pages/posts/create-post";
import {
  setIsAuthenticated,
  setShowCreatePost,
  setShowLoader,
  setShowProfilePage,
  setShowSignInPage,
  setShowSignUpPage,
} from "../../redux-utils/utils-slice/utilsSlice";
import SignIn from "../sign-in";
import SignUp from "../register-page";
import Li from "../../constants/menu-li";
import { Div, DivAbsolute, DivFlex, Ul } from "../../constants/div";
import { sign_out } from "../../apis/userServices";

export const Navbar = () => {
  const showSignInPage: boolean = useSelector(
    (state: any) => state.showSignInPage
  );
  const showSignUpPage: boolean = useSelector(
    (state: any) => state.showSignUpPage
  );
  const showCreatePost: boolean = useSelector(
    (state: any) => state.showCreatePost
  );
  const showProfilePage: boolean = useSelector(
    (state: any) => state.showProfilePage
  );
  const showLoader: boolean = useSelector((state: any) => state.showLoader);
  const showMenu: boolean = useSelector((state: any) => state.showMenu);
  const isAuthenticated: boolean = useSelector(
    (state: any) => state.isAuthenticated
  );
  const dispatch = useDispatch();

  const handleLogout = async () => {
    dispatch(setShowLoader(true));
    try {
      sign_out()
        .then((res) => {
          const { success, message } = res;
          if (success) {
            toast.success(message);
            dispatch(setIsAuthenticated(false));
            dispatch(setShowCreatePost(false));
            dispatch(setShowSignInPage(false));
            dispatch(setShowSignUpPage(false));
          } else {
            toast.success(message);
            dispatch(setIsAuthenticated(true));
          }
          dispatch(setShowLoader(false));
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
          dispatch(setIsAuthenticated(true));
          dispatch(setShowLoader(false));
        });
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
      dispatch(setIsAuthenticated(true));
      dispatch(setShowLoader(false));
    }
  };

  const handleOpenCreatePost = () => {
    if (isAuthenticated) {
      dispatch(setShowCreatePost(true));
      dispatch(setShowSignInPage(false));
      dispatch(setShowSignUpPage(false));
      dispatch(setShowProfilePage(false));
    } else {
      toast.error("Sign in first");
    }
  };

  return (
    <>
      <DivAbsolute
        className={`${
          showMenu ? "left-0" : "left-[-300px]"
        } absolute duration-300 w-full border-gray-800 border-r-4 dark:bg-gray-900 p-4 pt-20`}
      >
        <DivFlex justify="between" className="flex-col text-xl min-h-[85vh]">
          <Ul>
            <Li
              handleEvent={() => {
                dispatch(setShowCreatePost(false));
                dispatch(setShowProfilePage(false));
                dispatch(setShowSignInPage(false));
              }}
              name="Home"
              hidden={false}
            />

            <Li handleEvent={handleOpenCreatePost} hidden={false} name="Post" />

            {isAuthenticated ? (
              <Li
                hidden={showLoader}
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
                name="SignIn"
                hidden={false}
              />
            )}
          </Ul>
          <Div
            aria-disabled
            className="font-medium w-full p-4 border border-gray-100 bg-gray-800 rounded-lg dark:border-gray-300"
          >
            <Li
              handleEvent={() => {
                if (
                  showCreatePost ||
                  showSignUpPage ||
                  showProfilePage ||
                  showSignInPage
                ) {
                  dispatch(setShowCreatePost(false));
                  dispatch(setShowSignUpPage(false));
                  dispatch(setShowSignInPage(false));
                  dispatch(setShowProfilePage(false));
                }
                window.alert("Settings page is under development");
              }}
              name="Settings"
            />
          </Div>
        </DivFlex>
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
