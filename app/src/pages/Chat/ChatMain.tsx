import { Div } from "../../common/constants/div/Div";
import { setShowChatPage } from "../../common/redux-utils/utils-slice/utilsSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowRedo } from "react-icons/io5";

const ChatMain = () => {
  const chatList = useSelector((state: any) => state.chatList);
  const dispatch = useDispatch();

  return (
    <Div>
      <Div
        onClick={() => {
          dispatch(setShowChatPage(false));
        }}
        className="text-2xl text-gray-700 cursor-pointer mb-2"
      >
        <IoArrowRedo />
      </Div>
      <Div>{chatList?.map((chat, index) => console.log(chat))}</Div>
    </Div>
  );
};

export default ChatMain;
