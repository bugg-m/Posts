import { BiSolidRightArrow } from "react-icons/bi";
import { FaBlog } from "react-icons/fa";
import { useSelector } from "react-redux";
import InputBar from "../input-bar/Input_Box";
import AvatarProfile from "../avatar-profile/Profile_Icon";
import { DivFlex, Div } from "../../constants/div/Div";
import { Logo } from "../../constants/label/Label";
import { CustomBorder } from "../../constants/custom-border/Border";
import Profile from "../profile/Profile";
import TextField from "../../constants/text-header/Text_Title";

const Header = () => {
  const showMenu = useSelector((state: any) => state.showMenu);
  const showSignInPage = useSelector((state: any) => state.showSignInPage);
  const showSignUpPage = useSelector((state: any) => state.showSignUpPage);
  const showProfilePage = useSelector((state: any) => state.showProfilePage);
  const showCreatePost = useSelector((state: any) => state.showCreatePost);

  return (
    <>
      <Div className="h-16 flex justify-between items-center w-full border-b-2 border-gray-800 dark:bg-gray-900">
        <DivFlex justify="center" className="bg-gray-900 z-10">
          <DivFlex justify="start" className="w-[300px] pl-10">
            <FaBlog className="h-8 mx-3 text-3xl animate-bounce text-gray-300 logo-icon cursor-pointer" />
            <Logo title="Posts" />
          </DivFlex>
          <CustomBorder
            className="h-16"
            width={4}
            color="gray"
            intensity={800}
            side="r"
          />
        </DivFlex>
        <DivFlex justify="between" className="w-full px-5">
          <DivFlex justify="center" className="text-gray-300 gap-1 text-2xl">
            <DivFlex
              justify="center"
              className={`${
                showMenu ? "left-[20%]" : "left-0"
              } absolute gap-2 duration-300`}
            >
              <BiSolidRightArrow />
              <TextField>Menu</TextField>
            </DivFlex>
            <DivFlex
              justify="center"
              className={`${
                showSignInPage || showCreatePost || showSignUpPage
                  ? "left-[27%]"
                  : "left-0"
              } absolute gap-2 text-gray-300 text-xl duration-500`}
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
            <Div>
              <InputBar />
            </Div>
            <Div>
              <AvatarProfile />
            </Div>
          </DivFlex>
        </DivFlex>
      </Div>
      <DivFlex
        justify="center"
        className={`${
          showProfilePage ? "w-[30%]" : "w-0"
        } absolute right-0 bg-gray-300 border-l-4 border-gray-400 h-screen duration-700 -z-10`}
      >
        {showProfilePage && <Profile />}
      </DivFlex>
    </>
  );
};

export default Header;
