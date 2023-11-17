import React from "react";
import ReactDOM from "react-dom/client";
import "./root.component.css";
// import Layout from "./root.layout.js";
import ChatMain from "./pages/Chat/ChatMain.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <Layout /> */}
    <ChatMain />
  </React.StrictMode>
);
