import Home from "./pages/home/Home";
import { Navbar } from "./common/components/navbar/Navbar";
import utilsStore from "./common/redux-utils/utils-store/utilsStore";
import { Provider } from "react-redux";
import Header from "./common/components/header/Header";
import { Div } from "./common/constants/div/Div";
import ChatMain from "./pages/Chat/chat";

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
            <ChatMain />
          </Div>
        </Div>
      </Div>
    </Provider>
  );
};

export default Layout;
