import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./common/components/navbar";
import BlogMain from "./pages/blogs";
import toast, { Toaster } from "react-hot-toast";
import Login from "./common/components/login/Login";
import Register from "./common/components/register-page/Register";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "./main";
export const TodoContext = createContext({});

const App = () => {
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
      <BrowserRouter>
        <div className="fixed w-full">
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<BlogMain />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route path="/task" element={<ToDoList />} /> */}
          <Route path="/register" element={<Register />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </TodoContext.Provider>
  );
};

export default App;
