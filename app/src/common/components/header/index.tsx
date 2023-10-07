import { BiSolidRightArrow } from "react-icons/bi";
import { FaBlog } from "react-icons/fa";
import { useSelector } from "react-redux";
import InputBar from "../input-bar";
import AvatarProfile from "../avatar-profile";
import { DivFlex, Div } from "../../constants/div";
import { Logo } from "../../constants/label";
import { CustomBorder } from "../../constants/custom-border";
import TextField from "../../constants/text-header";

const Header = () => {
  const showMenu = useSelector((state: any) => state.showMenu);
  const showSignInPage = useSelector((state: any) => state.showSignInPage);
  const showSignUpPage = useSelector((state: any) => state.showSignUpPage);
  const showCreatePost = useSelector((state: any) => state.showCreatePost);

  return (
    <DivFlex
      justify="start"
      className="h-16 w-full border-b-2 border-gray-800 dark:bg-gray-900"
    >
      <DivFlex justify="center" className="bg-gray-900 z-10">
        <DivFlex justify="start" className="w-[300px] pl-10">
          <FaBlog className="h-8 mx-3 text-3xl animate-bounce text-gray-300 logo-icon cursor-pointer" />
          <Logo title="Posts" className="" />
        </DivFlex>
        <CustomBorder
          className="h-16"
          width="4"
          color="gray"
          intensity={800}
          side="r"
        />
      </DivFlex>
      <DivFlex justify="between" className="w-full px-5">
        <DivFlex justify="center" className="text-gray-300 text-2xl justi">
          <DivFlex
            justify="center"
            className={`${showMenu ? "left-[20%]" : "left-0"} duration-300`}
          >
            <BiSolidRightArrow />
            <TextField className="">Menu</TextField>
          </DivFlex>
          <DivFlex
            justify="center"
            className={`${
              showSignInPage || showCreatePost || showSignUpPage
                ? "left-[27%]"
                : "left-0"
            } text-gray-300 text-xl duration-500`}
          >
            <BiSolidRightArrow />
            <TextField className="text-gray-200">
              {showCreatePost && "Create Post"}
              {showSignInPage && "Sign In"}
              {showSignUpPage && "Sign Up"}
            </TextField>
          </DivFlex>
        </DivFlex>
        <DivFlex justify="between" className="mr-5 gap-5">
          <Div className="">
            <InputBar />
          </Div>
          <Div className="">
            <AvatarProfile />
          </Div>
        </DivFlex>
      </DivFlex>
    </DivFlex>
  );
};

export default Header;
