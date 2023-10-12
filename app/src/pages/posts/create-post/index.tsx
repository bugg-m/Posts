import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setRefreshPostList,
  setShowCreatePost,
  setShowLoader,
} from "../../../common/redux-utils/utils-slice/utilsSlice";
import toast from "react-hot-toast";
import { addPost } from "../../../common/apis/postServices";
import { TiArrowBackOutline } from "react-icons/ti";
import { Div, DivFlex } from "../../../common/constants/div";
import TextField from "../../../common/constants/text-header";
import Label from "../../../common/constants/label";
import {
  Input,
  InputFile,
  TextArea,
} from "../../../common/constants/input-bar";
import Button from "../../../common/constants/button";

const CreatePost = () => {
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [error, setError] = useState({
    message: "",
    flag: false,
  });
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const refreshPostList = useSelector((state: any) => state.refreshPostList);
  const showLoader = useSelector((state: any) => state.showLoader);

  const handleAddPost = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", "image");
    const payload = { title, description, image };
    dispatch(setShowLoader(true));
    try {
      addPost(payload)
        .then((res) => {
          const { success, message } = res;
          if (success) {
            toast.success(message);
            dispatch(setShowCreatePost(false));
            resetForm();
          } else {
            toast.error(message);
          }
          dispatch(setRefreshPostList(!refreshPostList));
          dispatch(setShowLoader(false));
        })
        .catch((err) => {
          toast.success(err?.response?.data?.message);
          dispatch(setRefreshPostList(!refreshPostList));
          dispatch(setShowLoader(false));
        });
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
      dispatch(setRefreshPostList(!refreshPostList));
      dispatch(setShowLoader(false));
    }
  };

  const resetForm = () => {
    setTitle("");
    setImage("");
    setDescription("");
  };

  const handleDescription = (value: string) => {
    let new_pass = value;
    setDescription(new_pass);
    setError({ message: "Password is weak!", flag: true });

    if (new_pass.length < 10) {
      setError({
        message: "Please describe your post in about 10 characters!",
        flag: true,
      });
    } else {
      setError({ message: "", flag: false });
    }
  };

  return (
    <Div
      onClick={(e) => e.stopPropagation()}
      className="p-10 min-w-[500px] relative pt-36 min-h-screen bg-gray-300 border-r-4 border-gray-400"
    >
      <Div
        onClick={() => dispatch(setShowCreatePost(false))}
        className="text-2xl text-gray-700 cursor-pointer pt-2 absolute top-20 right-2"
      >
        <TiArrowBackOutline />
      </Div>
      <Div className="text-lg h-16 font-semibold leading-tight tracking-tight text-gray-700">
        Create your post
      </Div>
      <form
        className="space-y-4 md:space-y-6"
        encType="multipart/form-data"
        method="POST"
        onSubmit={handleAddPost}
      >
        <Div>
          <Label
            className="block mb-2 text-sm font-mediumtext-gray-700"
            title="Title"
          />

          <Input
            className="bg-gray-100 border border-gray-300 text-gray-700 rounded-lg block w-full p-2.5 placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="title"
            minLength={4}
            placeholder="Add title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            required
          />
        </Div>
        <Div>
          <Label
            className="block mb-2 text-sm font-medium text-gray-700"
            title="Description"
          />

          <TextArea
            className="bg-gray-100 border border-gray-300 text-gray-700 rounded-lg block w-full p-2.5 placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="description"
            placeholder="Add description"
            value={description}
            minLength={30}
            onChange={(e) => handleDescription(e.target.value)}
            required
          />
          {error.message ? (
            <TextField
              className={`${
                error.flag ? "text-red-600" : "text-green-600"
              } text-[10px]`}
            >
              {error.message}
            </TextField>
          ) : null}
        </Div>
        <Div>
          <Label
            className="block mb-2 text-sm font-medium text-gray-700"
            title="Add Image"
          />

          <InputFile
            className="bg-gray-100 border text-gray-700 border-gray-300 rounded-lg block w-full p-2.5 placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="image"
            type="file"
            placeholder="Add image"
            onChange={(e: any) => setImage(e.target.files[0])}
            required
          />
        </Div>

        <DivFlex justify="end" className="w-full gap-5">
          <Button
            className="bg-gray-700 text-gray-50"
            onClick={() => {
              dispatch(setShowCreatePost(false));
              resetForm();
            }}
          >
            Cancel
          </Button>
          <Button disabled={showLoader || error.flag} type="submit">
            Post
          </Button>
        </DivFlex>
      </form>
    </Div>
  );
};

export default CreatePost;
