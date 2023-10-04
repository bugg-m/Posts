import { useEffect, useState } from "react";
import { getAllPosts } from "../../common/apis/postServices";
import PostListItems from "./post-list-items";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const PostMain = () => {
  const [postList, setPostList] = useState([]);
  const showSignInPage = useSelector((state: any) => state.showSignInPage);
  const showSignUpPage = useSelector((state: any) => state.showSignUpPage);
  const showCreatePost = useSelector((state: any) => state.showCreatePost);
  const refreshPostList = useSelector((state: any) => state.refreshPostList);
  const showMenu = useSelector((state: any) => state.showMenu);

  useEffect(() => {
    getAllPost();
  }, [refreshPostList]);

  const getAllPost = () => {
    try {
      getAllPosts()
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
      } pt-20 min-h-screen bg-gray-50`}
    >
      <div className="flex p-5 justify-center items-center">
        <div
          className={` ${
            showMenu ? "pl-[25%]" : ""
          } grid px-10 grid-cols-3 gap-20 py-5 duration-300`}
        >
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
