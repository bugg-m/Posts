import React, { useEffect, useState } from "react";
import { socket } from "../../env";
import { Div } from "../../common/constants/div/Div";
import { setShowChatPage } from "../../common/redux-utils/utils-slice/utilsSlice";
import { useDispatch } from "react-redux";
import { IoArrowRedo } from "react-icons/io5";

type Chat = {
  name: string;
  message: string;
};

const ChatMain: React.FC = () => {
  const [chat, setChat] = useState<Chat[]>([]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();

  const sendChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("client_message", { name, message });
    setMessage("");
  };

  useEffect(() => {
    const handleConnect = () => {
      console.log(`connected: ${socket.id}`);
    };

    const handleChat = (payload: Chat) => {
      setChat((prevChat) => [...prevChat, payload]);
    };

    socket.on("connect", handleConnect);
    socket.on("server_message", handleChat);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("server_message", handleChat);
    };
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center gap-10 flex-col bg-slate-600">
      {login ? (
        <div className="w-full h-screen flex justify-center items-center gap-10 flex-col bg-slate-600">
          <Div
            onClick={() => {
              dispatch(setShowChatPage(false));
            }}
            className="text-2xl text-gray-700 cursor-pointer mb-2"
          >
            <IoArrowRedo />
          </Div>
          <div className="w-4/5 h-2/3 p-5">
            {chat?.map((chat, index) => (
              <div
                className="flex justify-start items-center gap-5 p-1 rounded bg-gray-200 border-2 border-gray-300 mb-3"
                key={index}
              >
                <p className="bg-slate-400 rounded-sm p-2">{chat?.name}:</p>
                <p className="rounded-sm p-2">{chat?.message}</p>
              </div>
            ))}
          </div>

          <form
            className="flex gap-3 justify-center items-center"
            onSubmit={sendChat}
          >
            <input
              className="w-4/5 h-10 p-3"
              type="text"
              name="chat"
              placeholder="send chat"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="bg-slate-400 rounded p-2" type="submit">
              Send
            </button>
          </form>
        </div>
      ) : (
        <div>
          <form
            className="flex gap-3 justify-center items-center"
            onSubmit={() => setLogin(true)}
          >
            <input
              className="w-4/5 h-10 p-3"
              type="text"
              name="name"
              placeholder="add name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="bg-slate-400 rounded p-2" type="submit">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatMain;
