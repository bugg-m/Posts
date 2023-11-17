import { CloudinaryImage } from "@cloudinary/url-gen/index";
import { Div, DivFlex } from "../../../common/constants/div/Div";
import { AdvancedImage } from "@cloudinary/react";
import { useEffect, useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import {
  CapitalizeFirstLetter,
  formatString,
} from "../post-list-items/Post_List";
import { userProfile } from "../../../common/apis/userServices";
import { addComments, getComments } from "../../../common/apis/postServices";
import { CommenBox } from "../../../common/constants/input-bar/Input_Box_Type";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../common/constants/button/Button";
import { setShowSignInPage } from "../../../common/redux-utils/utils-slice/utilsSlice";
import { cloudinary } from "../../../env";

const CommentsList = ({ postComments, setPostComments, item }: any) => {
  const [avatar, setAvatar] = useState<CloudinaryImage | undefined>();
  const [userName, setUserName] = useState("");
  const [commentValue, setCommentValue] = useState("");
  const isAuthenticated = useSelector((state: any) => state.isAuthenticated);
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const profileImage = cloudinary.image(user?.avatar?.public_id);
  useEffect(() => {
    getUserComments(item._id);
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
            comments?.user?.forEach((id: string) => getUsersDetails(id));
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

  const addComment = (e: any) => {
    e.preventDefault();
    try {
      addComments({ id: item._id, comment: commentValue })
        .then((res: any) => {
          const { success, comments } = res;
          if (success) {
            setPostComments(comments.comment);
            comments?.user?.forEach((id: string) => getUsersDetails(id));
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

  return (
    <Div className="w-full h-full overflow-y-hidden mt-5 px-3 flex flex-col justify-between items-start">
      <Div>
        {postComments ? (
          postComments?.map((comment: string, index: number) => (
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
          ))
        ) : (
          <Div className="pl-3">Add Comments...</Div>
        )}
      </Div>

      {isAuthenticated ? (
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
              <button type="submit" className="bg-blue-700">
                Submit
              </button>
            </form>
          </Div>
        </DivFlex>
      ) : (
        <DivFlex justify="center" className="w-full">
          <Button
            onClick={() => dispatch(setShowSignInPage(true))}
            className="bg-blue-700"
          >
            Log in to comment
          </Button>
        </DivFlex>
      )}
    </Div>
  );
};

export default CommentsList;
