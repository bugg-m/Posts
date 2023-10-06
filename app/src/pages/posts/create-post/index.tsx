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

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
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
        .catch((err: string) => {
          toast.success(err);
          dispatch(setRefreshPostList(!refreshPostList));
          dispatch(setShowLoader(false));
        });
    } catch (err: any) {
      toast.error(err.response.data.message);
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
    <div
      onClick={(e) => e.stopPropagation()}
      className="p-10 min-w-[500px] relative pt-36 min-h-screen bg-gray-300 border-r-4 border-gray-400"
    >
      <div
        onClick={() => dispatch(setShowCreatePost(false))}
        className="text-2xl text-gray-700 cursor-pointer pt-2 absolute top-20 right-2"
      >
        <TiArrowBackOutline />
      </div>
      <div className="text-lg h-20 font-semibold leading-tight tracking-tight text-gray-700">
        Create your post
      </div>
      <form
        className="space-y-4 md:space-y-6"
        encType="multipart/form-data"
        method="POST"
        onSubmit={handleAddPost}
      >
        <div>
          <label className="block mb-2 text-sm font-mediumtext-gray-700">
            Title
          </label>
          <input
            className="bg-gray-100 border border-gray-300 text-gray-700 rounded-lg block w-full p-2.5 placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="title"
            minLength={4}
            placeholder="Add title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="bg-gray-100 border border-gray-300 text-gray-700 rounded-lg block w-full p-2.5 placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="description"
            placeholder="Add description"
            value={description}
            minLength={30}
            onChange={(e) => handleDescription(e.target.value)}
            required
          />
          {error.message ? (
            <span
              className={`${
                error.flag ? "text-red-600" : "text-green-600"
              } text-[10px]`}
            >
              {error.message}
            </span>
          ) : null}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Add Image
          </label>
          <input
            className="bg-gray-100 border text-gray-700 border-gray-300 rounded-lg block w-full p-2.5 placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="image"
            type="file"
            placeholder="Add image"
            onChange={(e: any) => setImage(e.target.files[0])}
            required
          />
        </div>

        <div className="flex justify-end items-center w-full gap-5">
          <button
            onClick={() => {
              dispatch(setShowCreatePost(false));
              resetForm();
            }}
            className="h-10 w-24 border bg-white border-gray-700 text-grey-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Cancel
          </button>
          <button
            disabled={showLoader || error.flag}
            type="submit"
            className="h-10 w-24 border border-gray-700 text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
