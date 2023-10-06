import { BiSolidRightArrow } from "react-icons/bi";
import { FaBlog } from "react-icons/fa";
import { useSelector } from "react-redux";
import InputBar from "../input-bar";
import AvatarProfile from "../avatar-profile";
import DivSpaceBetween from "../../constants/div-justify-between";
import DivFullStart, { DivCustomStart } from "../../constants/div-full-start";
import DivFlex from "../../constants/div-flex";
import { Logo } from "../../constants/label";
import { CustomBorder } from "../../constants/custom-border";

const Header = () => {
  const showMenu = useSelector((state: any) => state.showMenu);
  const showSignInPage = useSelector((state: any) => state.showSignInPage);
  const showSignUpPage = useSelector((state: any) => state.showSignUpPage);
  const showCreatePost = useSelector((state: any) => state.showCreatePost);

  return (
    <DivFullStart className="h-16 border-b-2 border-gray-800 dark:bg-gray-900">
      <DivFlex className="bg-gray-900 z-10">
        <DivCustomStart className="w-[300px] pl-10">
          <FaBlog className="h-8 mx-3 text-3xl animate-bounce text-gray-300 logo-icon cursor-pointer" />
          <Logo title="Posts" className="" />
        </DivCustomStart>
        <CustomBorder
          className="h-16"
          width="4"
          color="gray"
          intensity={800}
          side="r"
        />
      </DivFlex>
      <DivSpaceBetween className="w-full px-5">
        <DivFlex className="text-gray-300 text-2xl">
          <div
            className={`${
              showMenu ? "left-[20%]" : "left-0"
            } absolute duration-300 flex gap-2 justify-center items-center`}
          >
            <BiSolidRightArrow />
            <span className="text-gray-200">Menu</span>
          </div>
          <div
            className={`${
              showSignInPage || showCreatePost || showSignUpPage
                ? "left-[27%]"
                : "left-0"
            } duration-500 absolute text-gray-300 flex gap-2 text-xl justify-center items-center`}
          >
            <BiSolidRightArrow />
            <span className="text-gray-200">
              {showCreatePost && "Create Post"}
              {showSignInPage && "Sign In"}
              {showSignUpPage && "Sign Up"}
            </span>
          </div>
        </DivFlex>
        <DivSpaceBetween className="mr-5 gap-5">
          <div>
            <InputBar />
          </div>
          <div>
            <AvatarProfile />
          </div>
        </DivSpaceBetween>
      </DivSpaceBetween>
    </DivFullStart>
  );
};

export default Header;
