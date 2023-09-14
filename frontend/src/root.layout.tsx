import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./common/components/login";
import Home from "./pages/home";
import { Navbar } from "./common/components/navbar";
import utilsStore from "./common/redux-utils/utils-store/utilsStore";
import { Provider } from "react-redux";

const Layout = () => {
  return (
    <Provider store={utilsStore}>
      <BrowserRouter>
        <div className="fixed w-full z-50">
          <Navbar />
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default Layout;
