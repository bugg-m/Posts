import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { socket } from "../../env";

const userName = uuidv4();

const ChatMain = () => {
  const [chat, setChat] = useState<any[]>([]);
  const [message, setMessage] = useState("");

  const sendChat = (e: any) => {
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setMessage("");
  };

  useEffect(() => {
    const handleChat = (payload: any) => {
      setChat((prevChat) => [...prevChat, payload]);
    };

    socket.on("chat", handleChat);

    return () => {
      socket.off("chat", handleChat);
    };
  }, [chat]);

  return (
    <div className="w-full h-screen flex justify-center items-center gap-10 flex-col bg-slate-600">
      <div className="w-4/5 h-2/3 p-5">
        {chat?.map((payload, index) => (
          <div
            className="flex justify-start items-center gap-5 p-1 rounded bg-gray-200 border-2 border-gray-300 mb-3"
            key={payload?.userName + index}
          >
            <p className="bg-slate-400 rounded-sm p-2">{payload?.userName}:</p>
            <p className="rounded-sm p-2">{payload?.message}</p>
          </div>
        ))}
      </div>

      <form
        action=""
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
  );
};

export default ChatMain;
