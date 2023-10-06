import { CgMenu } from "react-icons/cg";
import { useEffect, useState } from "react";
import { getAllPost } from "../../common/apis/postServices";
import PostListItems from "./post-list-items";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setShowMenu } from "../../common/redux-utils/utils-slice/utilsSlice";

const PostMain = () => {
  const [postList, setPostList] = useState([]);
  const showSignInPage = useSelector((state: any) => state.showSignInPage);
  const showSignUpPage = useSelector((state: any) => state.showSignUpPage);
  const showCreatePost = useSelector((state: any) => state.showCreatePost);
  const refreshPostList = useSelector((state: any) => state.refreshPostList);
  const showMenu = useSelector((state: any) => state.showMenu);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllPosts();
  }, [refreshPostList]);

  const getAllPosts = () => {
    try {
      getAllPost()
        .then((res: any) => {
          const { success, postData } = res;
          if (success) {
            setPostList(postData);
          } else {
            toast.error(res.message);
          }
        })
        .catch((err: any) => {
          toast.error(err.message);
        });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div
      className={`w-full ${
        showSignInPage || showCreatePost || showSignUpPage ? "opacity-10" : ""
      } pt-20 min-h-screen bg-gray-700`}
    >
      <div className="flex p-5 justify-center items-center">
        <div
          className={` ${
            showMenu ? "pl-[25%] grid-cols-3" : "grid-cols-4"
          } grid px-16 gap-10 py-5 duration-300`}
        >
          <CgMenu
            className={`fixed ${
              showMenu ? "left-[15%] text-gray-200" : "left-5 text-white"
            } cursor-pointer text-4xl z-50 top-24 rounded-md duration-300`}
            onClick={() => {
              dispatch(setShowMenu(!showMenu));
            }}
          />
          {postList?.map((item, index) => {
            return (
              <div key={index}>
                <PostListItems item={item} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostMain;
