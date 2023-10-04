import Home from "./pages/home";
import { Navbar } from "./common/components/navbar";
import utilsStore from "./common/redux-utils/utils-store/utilsStore";
import { Provider } from "react-redux";
import Header from "./common/components/header";

const Layout = () => {
  return (
    <Provider store={utilsStore}>
      <div className="min-w-full flex relative">
        <div className="fixed w-1/5 z-50">
          <Navbar />
        </div>
        <div className=" w-full">
          <div className="fixed top-0 z-50 w-full">
            <Header />
          </div>
          <div>
            <Home />
          </div>
        </div>
      </div>
    </Provider>
  );
};

export default Layout;
