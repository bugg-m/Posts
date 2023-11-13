import PostMain from "../posts/Posts";
import toast, { Toaster } from "react-hot-toast";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsAuthenticated,
  setShowLoader,
  setUser,
} from "../../common/redux-utils/utils-slice/utilsSlice";
import { authenticateUser } from "../../common/apis/userServices";
import { Div } from "../../common/constants/div/Div";
import { Cloudinary } from "@cloudinary/url-gen/index";
export const baseUrl = "http://localhost:4000";
export const cloudinary = new Cloudinary({ cloud: { cloudName: "dgskifwyj" } });

const Home = () => {
  const showLoader = useSelector((state: any) => state.showLoader);
  const dispatch = useDispatch();

  useEffect(() => {
    authenticateUsers();
  }, []);

  const authenticateUsers = () => {
    try {
      dispatch(setShowLoader(false));
      authenticateUser()
        .then((res) => {
          const { success, user, message } = res;
          if (success) {
            dispatch(setUser(user));
            dispatch(setIsAuthenticated(true));
            dispatch(setShowLoader(false));
            toast.success(message);
          } else {
            toast.error(message);
            dispatch(setIsAuthenticated(false));
            dispatch(setShowLoader(false));
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          dispatch(setUser([]));
          setIsAuthenticated(false);
          dispatch(setShowLoader(false));
        });
    } catch (err: any) {
      toast.error(err.response.data.message);
      setUser([]);
      setIsAuthenticated(false);
      dispatch(setShowLoader(false));
    }
  };

  return (
    <Div
      className={`${showLoader ? "opacity-95 blur-sm disabled " : ""} relative`}
    >
      <Suspense fallback="">
        <PostMain />
        <Toaster />
      </Suspense>
    </Div>
  );
};

export default Home;
