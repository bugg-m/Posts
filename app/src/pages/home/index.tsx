import BlogMain from "../blogs";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
// import axios from "axios";
import Loader from "../../common/components/loader";
import { useSelector } from "react-redux";
export const baseUrl = "http://localhost:4000";

const Home = () => {
  const showLoader = useSelector((state: any) => state.showLoader);

  // useEffect(() => {
  //   setLoading(true);

  //   axios
  //     .get(`${baseUrl}/users/me`, { withCredentials: true })
  //     .then((res) => {
  //       setUser(res.data.user);
  //       //  console.log(res.data.user);
  //       setIsAuthenticated(true);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error(err?.response?.data?.message);
  //       setUser([]);
  //       setIsAuthenticated(false);
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <div className={`${showLoader ? "opacity-60 bg-gray-600" : ""} relative`}>
      {showLoader && (
        <div className="absolute w-full h-screen left-0 top-16 flex items-center justify-center ">
          <Loader />
        </div>
      )}
      <Suspense fallback="">
        <BlogMain />
        <Toaster />
      </Suspense>
    </div>
  );
};

export default Home;
