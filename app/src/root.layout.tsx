import Home from "./pages/home";
import { Navbar } from "./common/components/navbar";
import utilsStore from "./common/redux-utils/utils-store/utilsStore";
import { Provider } from "react-redux";
import Header from "./common/components/header";
import { Div } from "./common/constants/div";

const Layout = () => {
  return (
    <Provider store={utilsStore}>
      <Div className="min-w-full flex relative">
        <Div className="fixed w-1/5 z-50">
          <Navbar />
        </Div>
        <Div className="w-full">
          <Div className="fixed top-0 z-50 w-full">
            <Header />
          </Div>
          <Div>
            <Home />
          </Div>
        </Div>
      </Div>
    </Provider>
  );
};

export default Layout;
