import Home from "./pages/home";
import { Navbar } from "./common/components/navbar";
import utilsStore from "./common/redux-utils/utils-store/utilsStore";
import { Provider } from "react-redux";

const Layout = () => {
  return (
    <Provider store={utilsStore}>
      <div className="fixed w-full z-50">
        <Navbar />
      </div>
      <Home />
    </Provider>
  );
};

export default Layout;
