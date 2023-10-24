import { IoArrowRedo } from "react-icons/io5";
import { Div, DivFlex } from "../../../common/constants/div";
import { setShowProfilePage } from "../../redux-utils/utils-slice/utilsSlice";
import { useDispatch, useSelector } from "react-redux";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { FaCircleUser } from "react-icons/fa6";
import { CapitalizeFirstLetter } from "../../../pages/posts/post-list-items";

const Profile = () => {
  const user = useSelector((state: any) => state.user);
  const cloudinary = new Cloudinary({ cloud: { cloudName: "dgskifwyj" } });
  const avatar = cloudinary.image(user?.avatar?.public_id);
  const dispatch = useDispatch();

  return (
    <Div
      onClick={(e) => e.stopPropagation()}
      className="p-10 min-w-[510px] relative min-h-screen bg-gray-300 border-l-4 border-gray-400"
    >
      <Div
        onClick={() => dispatch(setShowProfilePage(false))}
        className="text-2xl text-gray-700 cursor-pointer absolute pt-2 top-0 left-2"
      >
        <IoArrowRedo />
      </Div>
      <DivFlex justify="normal" className="flex-col gap-5">
        <DivFlex
          justify="center"
          className=" rounded-full border-2 border-green-700 font-semibold leading-tight tracking-tight text-gray-700"
        >
          <Div>
            {user?.avatar?.public_id ? (
              <AdvancedImage
                className="w-40 h-40 cursor-pointer rounded-full"
                cldImg={avatar}
              />
            ) : (
              <Div className="text-[155px]">
                <FaCircleUser />
              </Div>
            )}
          </Div>
        </DivFlex>
        <DivFlex justify="center">{CapitalizeFirstLetter(user.name)}</DivFlex>
      </DivFlex>
      <DivFlex justify="between" className="mt-10 text-lg">
        <Div>Total Posts</Div>
        <Div>Total Likes</Div>
        <Div>Total Shares</Div>
      </DivFlex>
    </Div>
  );
};

export default Profile;
