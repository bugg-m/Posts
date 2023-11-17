import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen";
import { Div, DivFlex } from "../../../common/constants/div/Div";
import TextField from "../../../common/constants/text-header/Text_Title";
import { useEffect, useState } from "react";
import { userProfile } from "../../../common/apis/userServices";
import toast from "react-hot-toast";
import { FaCircleUser } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";
import { GoHeart } from "react-icons/go";
import { FcLike } from "react-icons/fc";
import { FiSend } from "react-icons/fi";
import { PiChatCircle } from "react-icons/pi";
import OptionBar from "../option-menu/Option_Bar";
import { useDispatch, useSelector } from "react-redux";
import { getLikes, likePost } from "../../../common/apis/postServices";
import CommentsList from "../comment-lists/Comment_Box";
import {
  setPostUserProfile,
  setShowProfilePage,
  setUser,
  setUserFlag,
} from "../../../common/redux-utils/utils-slice/utilsSlice";

const PostListItems = ({ item }: any) => {
  const [userName, setUserName] = useState("");
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [showOptionBar, setShowOptionBar] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [postLikes, setPostLikes] = useState<string[]>([]);
  const [postComments, setPostComments] = useState<string[]>([]);
  const [avatar, setAvatar] = useState<CloudinaryImage | undefined>();
  const cloudinary = new Cloudinary({ cloud: { cloudName: "dgskifwyj" } });
  const resImage = cloudinary.image(item.image.public_id);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: any) => state.isAuthenticated);

  useEffect(() => {
    getUsersDetails(item.owner);
  }, []);

  useEffect(() => {
    setLikes(item._id);
  }, [isLiked]);

  const getUsersDetails = (id: string) => {
    try {
      userProfile(id)
        .then((res: any) => {
          const { success, userDetails } = res;
          if (success) {
            setUserName(userDetails.name);
            if (userDetails?.avatar?.public_id) {
              setAvatar(cloudinary.image(userDetails?.avatar?.public_id));
            }
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

  const likeThisPost = (id: string) => {
    try {
      likePost(id)
        .then((res: any) => {
          const { success, message, likes, isLiked } = res;
          if (success) {
            toast.success(message);
            setPostLikes(likes);
            setIsLiked(isLiked);
          } else {
            toast.error(message);
          }
        })
        .catch((err: any) => {
          toast.error(err?.response?.data?.message);
        });
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  const setLikes = (id: string) => {
    try {
      getLikes(id)
        .then((res: any) => {
          const { success, likes } = res;
          if (success) {
            setPostLikes(likes);
            if (likes?.includes(item?.owner)) setIsLiked(true);
            // else setIsLiked(false);
          } else {
            console.log(res.message);
          }
        })
        .catch((err: any) => {
          console.log(err?.response?.data?.message);
        });
    } catch (error: any) {
      console.log(error?.response?.data?.message);
    }
  };

  const openPostProfile = () => {
    try {
      userProfile(item.owner)
        .then((res: any) => {
          const { success, userDetails } = res;
          if (success) {
            dispatch(setPostUserProfile(userDetails));
            dispatch(setShowProfilePage(true));
            dispatch(setUserFlag(false));
          } else {
            toast.error(res.message);
            dispatch(setUser([]));
          }
        })
        .catch((err: any) => {
          toast.error(err.message);
        });
    } catch (error: any) {
      console.log(error?.response?.data?.message);
    }
  };

  return (
    <DivFlex
      onClick={(e) => e.stopPropagation()}
      justify="normal"
      className="flex-col relative gap-5 p-5 min-h-[500px] w-full bg-gray-50 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-300 dark:bg-gray-100 dark:hover:bg-gray-200"
    >
      <DivFlex justify="between" className="w-full">
        <DivFlex onClick={openPostProfile} justify="between" className="gap-2">
          {avatar ? (
            <AdvancedImage
              className="object-fill w-10 h-10 cursor-pointer rounded-full border border-gray-300"
              cldImg={avatar}
            />
          ) : (
            <Div className="w-10 h-10 text-5xl cursor-pointer relative flex justify-center items-center text-gray-700 rounded-full border border-gray-300">
              <FaCircleUser />
            </Div>
          )}
          <Div className="cursor-pointer">
            {CapitalizeFirstLetter(userName)}
          </Div>
        </DivFlex>
        <Div
          onClick={() => setShowOptionBar(!showOptionBar)}
          className="cursor-pointer relative"
        >
          <SlOptionsVertical />
          {showOptionBar && (
            <Div className="absolute -top-14 right-5">
              <OptionBar setShowOptionBar={setShowOptionBar} />
            </Div>
          )}
        </Div>
      </DivFlex>
      <DivFlex justify="center" className="bg-white w-full rounded">
        <AdvancedImage
          className="object-fill w-full h-48 rounded border border-gray-300"
          cldImg={resImage}
          alt="Image"
        />
      </DivFlex>
      <DivFlex justify="between" className="gap-10">
        <DivFlex
          justify="center"
          onClick={() => likeThisPost(item._id)}
          className="text-2xl flex-col"
        >
          {isLiked && isAuthenticated ? (
            <Div>
              <FcLike />
            </Div>
          ) : (
            <Div className="hover:text-red-500 text-gray-700  font-normal">
              <GoHeart />
            </Div>
          )}
          <Div className="text-xs">{formatLength(postLikes?.length)}</Div>
        </DivFlex>

        <DivFlex justify="center" className="text-2xl flex-col">
          <Div
            onClick={() => setShowCommentBox(true)}
            className="hover:text-red-500 text-gray-700 -rotate-90"
          >
            <PiChatCircle />
          </Div>
          <Div className="text-xs">{formatLength(postComments?.length)}</Div>
        </DivFlex>
        <DivFlex justify="center" className="text-xl flex-col">
          <Div className="hover:text-red-500 text-gray-700">
            <FiSend />
          </Div>
          <Div className="text-xs">0</Div>
        </DivFlex>
      </DivFlex>
      <DivFlex justify="center" className="w-full">
        <DivFlex justify="between" className="flex-col leading-normal">
          <TextField className="mb-2 text-2xl font-bold tracking-tight text-gray-700">
            {CapitalizeFirstLetter(item.title)}
          </TextField>
          <TextField className="mb-3 font-normal text-gray-700">
            {CapitalizeFirstLetter(item.description)}
          </TextField>
        </DivFlex>
      </DivFlex>
      <DivFlex
        justify="normal"
        className={`w-full py-2 z-40 absolute duration-700 text-gray-50 rounded-lg flex-col ${
          showCommentBox ? "bottom-0 bg-slate-600 h-2/3" : "-bottom-0 h-0"
        }`}
      >
        {showCommentBox && (
          <>
            <DivFlex justify="between" className="flex-col h-8 w-full">
              <DivFlex
                justify="center"
                onClick={() => setShowCommentBox(false)}
                className="w-1/2 h-5 cursor-pointer"
              >
                <Div className="w-14 border-gray-300 border-t-4 rounded-lg " />
              </DivFlex>
              <Div className="w-4/5 border-gray-400 border-t-2 rounded-sm" />
            </DivFlex>
            <CommentsList
              setPostComments={setPostComments}
              item={item}
              postComments={postComments}
            />
          </>
        )}
      </DivFlex>
    </DivFlex>
  );
};

export const CapitalizeFirstLetter = (value: string) => {
  return value?.charAt(0)?.toUpperCase() + value?.slice(1);
};
export const formatLength = (value: number) => {
  return value ? value : "0";
};
export const formatString = (value: string) => {
  return value ? value : "";
};

export default PostListItems;
