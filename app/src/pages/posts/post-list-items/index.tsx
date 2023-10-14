import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary, CloudinaryImage } from "@cloudinary/url-gen";
import { Div, DivFlex } from "../../../common/constants/div";
import TextField from "../../../common/constants/text-header";
import { useEffect, useState } from "react";
import { userProfile } from "../../../common/apis/userServices";
import toast from "react-hot-toast";
import { FaCircleUser } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";
import OptionBar from "../option-menu";
import { useDispatch, useSelector } from "react-redux";
import { setShowOptionBar } from "../../../common/redux-utils/utils-slice/utilsSlice";

const PostListItems = ({ item }: any) => {
  const [userName, setUserName] = useState("");
  const [postId, setPostId] = useState(null);
  const [avatar, setAvatar] = useState<CloudinaryImage | undefined>();
  const cloudinary = new Cloudinary({ cloud: { cloudName: "dgskifwyj" } });
  const resImage = cloudinary.image(item.image.public_id);
  const showOptionBar = useSelector((state: any) => state.showOptionBar);
  const dispatch = useDispatch();
  useEffect(() => {
    getUsersDetails(item.user);
  }, []);

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

  return (
    <DivFlex
      onClick={(e) => e.stopPropagation()}
      justify="normal"
      className="flex-col gap-5 p-5 h-[400px] w-full bg-gray-50 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:border-gray-300 dark:bg-gray-100 dark:hover:bg-gray-200"
    >
      <DivFlex justify="between" className="w-full">
        <DivFlex justify="between" className="gap-2">
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
          <Div>{CapitalizeFirstLetter(userName)}</Div>
        </DivFlex>
        <Div
          onClick={() => {
            setPostId(item.id);
            dispatch(setShowOptionBar(true));
          }}
          className="cursor-pointer relative"
        >
          <SlOptionsVertical />
          {showOptionBar && postId === item.id && (
            <Div className="absolute -top-14 right-5">
              <OptionBar setPostId={setPostId} />
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
      <DivFlex justify="start" className="w-full">
        <DivFlex justify="between" className="flex-col leading-normal">
          <TextField className="mb-2 text-2xl font-bold tracking-tight text-gray-700">
            {CapitalizeFirstLetter(item.title)}
          </TextField>
          <TextField className="mb-3 font-normal text-gray-700">
            {CapitalizeFirstLetter(item.description)}
          </TextField>
        </DivFlex>
      </DivFlex>
    </DivFlex>
  );
};

export const CapitalizeFirstLetter = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export default PostListItems;
