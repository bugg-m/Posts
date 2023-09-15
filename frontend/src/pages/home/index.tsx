import BlogMain from "../blogs";
import { Toaster } from "react-hot-toast";
import { Suspense, createContext, useState } from "react";
// import axios from "axios";
import Loader from "../../common/components/loader";
export const TodoContext = createContext({});
export const baseUrl = "http://localhost:4000";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

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
    <TodoContext.Provider
      value={{
        isAuthenticated,
        loading,
        user,
        setUser,
        setLoading,
        setIsAuthenticated,
      }}
    >
      <div className={`${loading ? "opacity-60 bg-gray-600" : ""} relative`}>
        {loading && (
          <div className="absolute w-full h-screen left-0 top-16 flex items-center justify-center ">
            <Loader />
          </div>
        )}
        <Suspense fallback="">
          <BlogMain />
          <Toaster />
        </Suspense>
      </div>
    </TodoContext.Provider>
  );
};

export default Home;
