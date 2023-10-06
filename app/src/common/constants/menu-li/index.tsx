import { GoHomeFill } from "react-icons/go";
import { GiFlowerEmblem } from "react-icons/gi";
import { liProps } from "../../types/types";
import { BiImageAdd } from "react-icons/bi";
import { FaRegUserCircle } from "react-icons/fa";
import { PiSignOutBold, PiSignInBold } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";

const Li = ({ className, handleEvent, name, hidden }: liProps) => {
  const Icons = (icon: string) => {
    switch (icon.toLowerCase()) {
      case "home":
        return <GoHomeFill />;
      case "post":
        return <BiImageAdd />;
      case "profile":
        return <FaRegUserCircle />;
      case "signout":
        return <PiSignOutBold />;
      case "signin":
        return <PiSignInBold />;
      case "settings":
        return <IoMdSettings />;
      default:
        return <GiFlowerEmblem />;
    }
  };

  return (
    <li
      hidden={hidden}
      onClick={handleEvent}
      className={`${className} cursor-pointer text-xl flex justify-start items-center gap-3 py-2 pl-3 pr-4 text-gray-300 rounded hover:bg-gray-600`}
    >
      {Icons(name)}
      <span>{name}</span>
    </li>
  );
};

export default Li;
