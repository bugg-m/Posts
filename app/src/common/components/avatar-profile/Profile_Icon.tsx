import { AdvancedImage } from "@cloudinary/react";
import { useDispatch, useSelector } from "react-redux";
import { FaCircleUser } from "react-icons/fa6";
import { useState } from "react";
import { DiveMouseEvent, DivHoverText } from "../../constants/div/Div";
import { CapitalizeFirstLetter } from "../../../pages/posts/post-list-items/Post_List";
import {
  setPostUserProfile,
  setShowCreatePost,
  setShowProfilePage,
} from "../../redux-utils/utils-slice/utilsSlice";
import toast from "react-hot-toast";
import { cloudinary } from "../../../pages/home/Home";

const AvatarProfile = () => {
  const [showName, setShowName] = useState<boolean>(false);
  const user = useSelector((state: any) => state.user);
  const showCreatePost = useSelector((state: any) => state.showCreatePost);
  const isAuthenticated = useSelector((state: any) => state.isAuthenticated);
  const avatar = cloudinary.image(user?.avatar?.public_id);
  const dispatch = useDispatch();

  const handleProfileMenu = () => {
    if (showCreatePost) {
      dispatch(setShowCreatePost(false));
    }
    dispatch(setShowProfilePage(true));
    dispatch(setPostUserProfile(user));
  };

  if (isAuthenticated && user?.avatar?.public_id) {
    return (
      <DiveMouseEvent
        onClick={handleProfileMenu}
        onMouseOver={() => setShowName(true)}
        onMouseOut={() => setShowName(false)}
      >
        {showName && (
          <DivHoverText className="-bottom-7">
            {CapitalizeFirstLetter(user?.name)}
          </DivHoverText>
        )}
        <AdvancedImage
          className="object-fill w-10 h-10 cursor-pointer rounded-full border border-green-700"
          cldImg={avatar}
        />
      </DiveMouseEvent>
    );
  }

  return (
    <DiveMouseEvent
      onClick={() =>
        !isAuthenticated ? toast.error("Sign in first") : handleProfileMenu()
      }
      onMouseOver={() => setShowName(true)}
      onMouseOut={() => setShowName(false)}
      className="text-5xl"
    >
      {showName ? (
        <DivHoverText className="-bottom-7">
          {isAuthenticated ? CapitalizeFirstLetter(user?.name) : "Profile"}
        </DivHoverText>
      ) : null}
      <FaCircleUser />
    </DiveMouseEvent>
  );
};

export default AvatarProfile;
