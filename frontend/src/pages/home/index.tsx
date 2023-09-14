import { Route, Routes } from "react-router-dom";
import BlogMain from "../blogs";
import toast, { Toaster } from "react-hot-toast";
import Register from "../../common/components/register-page";
import { Suspense, createContext, useEffect, useState } from "react";
import axios from "axios";
import Profile from "../../common/components/profile";
import Loader from "../../common/components/loader";
export const TodoContext = createContext({});
export const baseUrl = "http://localhost:4000";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${baseUrl}/users/me`, { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        //  console.log(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.message);
        setUser([]);
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);

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
      <div className={`${loading ? "opacity-60" : ""} relative`}>
        {loading && (
          <div className="absolute">
            <Loader />
          </div>
        )}

        <Suspense fallback="">
          <Routes>
            <Route path="/" element={<BlogMain />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create_blog" element={<Profile />} />
          </Routes>
          <Toaster />
        </Suspense>
      </div>
    </TodoContext.Provider>
  );
};

export default Home;
