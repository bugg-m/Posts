import { CgMenu } from "react-icons/cg";
import { BiSolidRightArrow } from "react-icons/bi";
import { FaBlog } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setShowMenu } from "../../redux-utils/utils-slice/utilsSlice";
import InputBar from "../input-bar";

const Header = () => {
  const showMenu = useSelector((state: any) => state.showMenu);
  // const showSignInPage = useSelector((state: any) => state.showSignInPage);
  // const showSignUpPage = useSelector((state: any) => state.showSignUpPage);
  // const showCreatePost = useSelector((state: any) => state.showCreatePost);
  const dispatch = useDispatch();

  return (
    <div className="h-20 w-full flex justify-start items-center border-b-2 border-gray-300 dark:bg-gray-200">
      <div className="flex items-center justify-center">
        <div className="w-[300px]">
          <a href="/" className="flex items-center pl-10">
            <FaBlog className="h-8 mx-3 text-3xl text-gray-700 logo-icon" />
            <span className="self-center text-3xl font-bold whitespace-nowrap dark:text-gray-700">
              Posts
            </span>
          </a>
        </div>
        <div className="border-r-4 border-gray-300 h-20"></div>
      </div>
      <div className="flex items-center justify-between w-full px-5">
        <div className="flex items-center justify-between">
          <CgMenu
            className={`${
              showMenu ? "left-10" : "left-0"
            }absolute cursor-pointer text-5xl p-2 bg-gray-300 rounded-md text-gray-700 duration-200`}
            onClick={() => {
              dispatch(setShowMenu(!showMenu));
            }}
          />
          <div className="text-gray-500 text-2xl">
            {showMenu && (
              <div className="flex gap-2 justify-center items-center">
                <BiSolidRightArrow />
                <span className="text-gray-700">Menu</span>
              </div>
            )}
            {/* {showSignInPage ||
              showCreatePost ||
              (showSignUpPage && (
                <div className="flex gap-2 justify-center items-center">
                  <BiSolidRightArrow />
                  <span className="text-gray-700">
                    {showCreatePost && "Create Post"}
                    {showSignInPage && "Sign In"}
                    {showSignUpPage && "Sign Up"}
                  </span>
                </div>
              ))} */}
          </div>
        </div>
        <div>
          <InputBar />
        </div>
      </div>
    </div>
  );
};

export default Header;
