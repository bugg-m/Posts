import { IoArrowRedo } from "react-icons/io5";
import { Div, DivFlex } from "../../constants/div/Div";
import {
  setPostUserProfile,
  setShowProfilePage,
} from "../../redux-utils/utils-slice/utilsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AdvancedImage } from "@cloudinary/react";
import { CapitalizeFirstLetter } from "../../../pages/posts/post-list-items/Post_List";
import Button from "../../constants/button/Button";
import { useState } from "react";
import { follow_user } from "../../apis/userServices";
import toast from "react-hot-toast";
import { cloudinary } from "../../../env";

const Profile = () => {
  const [following, setFollowing] = useState<boolean>(false);
  const [followings, setFollowings] = useState<string[]>([]);
  const postUserProfile = useSelector((state: any) => state.postUserProfile);
  const userFlag = useSelector((state: any) => state.userFlag);
  const avatar = cloudinary.image(postUserProfile?.avatar?.public_id);
  const dispatch = useDispatch();

  const followUser = (id: string) => {
    try {
      follow_user(id)
        .then((res) => {
          const { success, message, followings, isFollowing } = res;
          if (success) {
            toast.success(message);
            setFollowing(isFollowing);
            setFollowings(followings);
          } else {
            toast.error(message);
          }
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message);
        });
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <Div
      onClick={(e) => e.stopPropagation()}
      className="p-2 w-full relative min-h-screen"
    >
      <Div
        onClick={() => {
          dispatch(setShowProfilePage(false));
          dispatch(setPostUserProfile({}));
        }}
        className="text-2xl text-gray-700 cursor-pointer mb-2"
      >
        <IoArrowRedo />
      </Div>
      <DivFlex justify="between" className="w-11/12 px-4 mb-5">
        <DivFlex justify="center" className="font-semibold text-gray-700 mt-10">
          <DivFlex justify="center" className="flex-col">
            <AdvancedImage
              className="w-24 h-24 cursor-pointer rounded-full border-2 border-green-700"
              cldImg={avatar}
            />
            <DivFlex justify="center" className="text-xl mt-3">
              {CapitalizeFirstLetter(postUserProfile?.name)}
            </DivFlex>
          </DivFlex>
        </DivFlex>
        <DivFlex justify="center" className="gap-7 w-3/5 text-lg">
          <DivFlex justify="center" className="flex-col w-1/2">
            <Div className="text-2xl">{postUserProfile?.posts?.length}</Div>
            <Div className="">Posts</Div>
          </DivFlex>
          <DivFlex justify="center" className="flex-col w-1/2">
            <Div className="text-2xl">{followings?.length}</Div>
            <Div className="">Followers</Div>
          </DivFlex>
          <DivFlex justify="center" className="flex-col w-1/2">
            <Div className="text-2xl">
              {postUserProfile?.followings?.length}
            </Div>
            <Div className="">Following</Div>
          </DivFlex>
        </DivFlex>
      </DivFlex>
      <DivFlex justify="center" className="w-full gap-5">
        {userFlag ? (
          <>
            <Button className="bg-gray-700 w-1/2 rounded-xl">
              Edit Profile
            </Button>
            <Button className="bg-gray-700 w-1/2 rounded-xl">
              Verify Profile
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => followUser(postUserProfile._id)}
              className="bg-gray-700 w-1/2 rounded-xl"
            >
              {following ? " Following" : "Follow"}
            </Button>
            <Button className="bg-gray-700 w-1/2 rounded-xl">Message</Button>
          </>
        )}
      </DivFlex>
    </Div>
  );
};

export default Profile;
