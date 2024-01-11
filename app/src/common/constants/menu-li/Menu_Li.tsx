import { GoHomeFill } from "react-icons/go";
import { liProps } from "../../types/types";
import { BiImageAdd } from "react-icons/bi";
import { PiSignOutBold, PiSignInBold } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { IoChatbubblesOutline } from "react-icons/io5";
import { CapitalizeFirstLetter } from "../../../pages/posts/post-list-items/Post_List";

const Li = ({ className, handleEvent, name, hidden }: liProps) => {
  const Icons = (icon: string) => {
    switch (icon.toLowerCase()) {
      case "home":
        return <GoHomeFill />;
      case "post":
        return <BiImageAdd />;
      case "signout":
        return <PiSignOutBold />;
      case "signin":
        return <PiSignInBold />;
      case "settings":
        return <IoMdSettings />;
      case "chat":
        return <IoChatbubblesOutline />;
      default:
        return null;
    }
  };

  return (
    <li
      hidden={hidden}
      onClick={handleEvent}
      className={`${className} cursor-pointer flex justify-start items-center gap-3 py-2 pl-3 pr-4 text-lg text-gray-300 rounded hover:bg-gray-600`}
    >
      {Icons(name)}
      <span>{CapitalizeFirstLetter(name)}</span>
    </li>
  );
};

export default Li;
