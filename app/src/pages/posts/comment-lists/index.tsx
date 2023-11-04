import { CloudinaryImage } from "@cloudinary/url-gen/index";
import { Div, DivFlex } from "../../../common/constants/div";
import { AdvancedImage } from "@cloudinary/react";
import { useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { CapitalizeFirstLetter, formatString } from "../post-list-items";
import { userProfile } from "../../../common/apis/userServices";
import { cloudinary } from "../../home";
import { getComments } from "../../../common/apis/postServices";
import { CommenBox } from "../../../common/constants/input-bar";

const CommentsList = ({
  postComments,
  setPostComments,
  item,
  profileImage,
}: any) => {
  const [avatar, setAvatar] = useState<CloudinaryImage | undefined>();
  const [userName, setUserName] = useState("");
  const [commentValue, setCommentValue] = useState("");

  useEffect(() => {
    getUserComments(item._id);
  }, []);
  const getUsersDetails = (id: string) => {
    try {
      userProfile(id)
        .then(async (res: any) => {
          const { success, userDetails } = res;
          if (success) {
            await setUserName(userDetails.name);
            if (userDetails?.avatar?.public_id) {
              await setAvatar(cloudinary.image(userDetails?.avatar?.public_id));
            }
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

  const getUserComments = (id: string) => {
    try {
      getComments(id)
        .then((res: any) => {
          const { success, comments } = res;
          if (success) {
            setPostComments(comments.comment);
            comments?.user?.forEach(async (id: string) => getUsersDetails(id));
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

  const addComment = () => {};

  return (
    <Div className="w-full h-full overflow-y-hidden mt-5 p-3 flex flex-col justify-between items-start">
      <Div>
        {postComments?.map((comment: string, index: number) => (
          <DivFlex key={index} justify="start" className="gap-2">
            <DivFlex justify="between" className="gap-2">
              {avatar ? (
                <AdvancedImage
                  className="object-fill w-7 h-7 cursor-pointer rounded-full border border-gray-300"
                  cldImg={avatar}
                />
              ) : (
                <Div className="w-7 h-7 text-5xl cursor-pointer relative flex justify-center items-center text-gray-700 rounded-full border border-gray-300">
                  <FaCircleUser />
                </Div>
              )}
            </DivFlex>
            <Div>
              <Div className="text-xs">
                {CapitalizeFirstLetter(userName ? userName : "User")}
              </Div>
              <Div className="text-xs">{formatString(comment)}</Div>
            </Div>
          </DivFlex>
        ))}
      </Div>

      <DivFlex justify="center" className="gap-3">
        <Div>
          {profileImage ? (
            <AdvancedImage
              className="object-fill w-7 h-7 cursor-pointer rounded-full border border-gray-300"
              cldImg={profileImage}
            />
          ) : (
            <Div className="w-7 h-7 text-5xl cursor-pointer relative flex justify-center items-center text-gray-700 rounded-full border border-gray-300">
              <FaCircleUser />
            </Div>
          )}
        </Div>
        <Div>
          <form action="POST" onSubmit={addComment}>
            <CommenBox
              value={commentValue}
              onChange={(e) => setCommentValue(e?.target?.value)}
              placeholder={`Add a comment for ${CapitalizeFirstLetter(
                userName ? userName : "User"
              )}...`}
            />
          </form>
        </Div>
      </DivFlex>
    </Div>
  );
};

export default CommentsList;
