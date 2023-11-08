import { IoArrowRedo } from "react-icons/io5";
import { Div, DivFlex } from "../../../common/constants/div";
import { setShowProfilePage } from "../../redux-utils/utils-slice/utilsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AdvancedImage } from "@cloudinary/react";
import { CapitalizeFirstLetter } from "../../../pages/posts/post-list-items";
import { cloudinary } from "../../../pages/home";
import Button from "../../constants/button";

const Profile = () => {
  const user = useSelector((state: any) => state.user);
  const avatar = cloudinary.image(user?.avatar?.public_id);
  const dispatch = useDispatch();

  return (
    <Div
      onClick={(e) => e.stopPropagation()}
      className="p-2 w-full relative min-h-screen"
    >
      <Div
        onClick={() => dispatch(setShowProfilePage(false))}
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
              {CapitalizeFirstLetter(user.name)}
            </DivFlex>
          </DivFlex>
        </DivFlex>
        <DivFlex justify="center" className="gap-7 w-3/5 text-lg">
          <DivFlex justify="center" className="flex-col w-1/2">
            <Div className="text-2xl">{user?.posts?.length}</Div>
            <Div className="">Posts</Div>
          </DivFlex>
          <DivFlex justify="center" className="flex-col w-1/2">
            <Div className="text-2xl">{user?.followers?.length}</Div>
            <Div className="">Followers</Div>
          </DivFlex>
          <DivFlex justify="center" className="flex-col w-1/2">
            <Div className="text-2xl">{user?.followings?.length}</Div>
            <Div className="">Following</Div>
          </DivFlex>
        </DivFlex>
      </DivFlex>
      <DivFlex justify="center" className="w-full gap-5">
        <Button className="bg-gray-700 w-1/2 rounded-xl">Edit Profile</Button>
        <Button className="bg-gray-700 w-1/2 rounded-xl">Verify Profile</Button>
      </DivFlex>
    </Div>
  );
};

export default Profile;
