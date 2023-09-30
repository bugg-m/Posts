import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {
  setRefreshBlogList,
  setShowCreateBlog,
  setShowLoader,
} from "../../../common/redux-utils/utils-slice/utilsSlice";
import toast from "react-hot-toast";
import { addBlog } from "../../../common/apis/blogServices";
import Loader from "../../../common/components/loader";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const refreshBlogList = useSelector((state: any) => state.refreshBlogList);
  const showLoader = useSelector((state: any) => state.showLoader);

  const handleAddBlog = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", "newImage");
    const payload = { title, description, image };
    dispatch(setShowLoader(true));
    try {
      addBlog(payload)
        .then((res) => {
          const { success, message } = res;
          if (success) {
            toast.success(message);
            setTitle("");
            setDescription("");
            dispatch(setShowCreateBlog(false));
          } else {
            toast.error(message);
          }
          dispatch(setRefreshBlogList(!refreshBlogList));
          dispatch(setShowLoader(false));
        })
        .catch((err: string) => {
          toast.success(err);
          dispatch(setRefreshBlogList(!refreshBlogList));
          dispatch(setShowLoader(false));
        });
    } catch (err: any) {
      toast.error(err.response.data.message);
      dispatch(setRefreshBlogList(!refreshBlogList));
      dispatch(setShowLoader(false));
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="p-6 w-96 dark:bg-gray-800 border rounded-md dark:border-gray-700 space-y-4 md:space-y-6 sm:p-8"
    >
      <div className="flex justify-between">
        <div className="text-lg font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
          CREATE
        </div>
        <div
          onClick={() => dispatch(setShowCreateBlog(false))}
          className="text-xl text-white"
        >
          <CgClose />
        </div>
      </div>
      <form
        className="space-y-4 md:space-y-6"
        encType="multipart/form-data"
        method="POST"
        onSubmit={handleAddBlog}
      >
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Title
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text"
            name="title"
            placeholder="Add title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <textarea
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="description"
            placeholder="Add description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Add Image
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
              dispatch(setShowCreateBlog(false));
              setTitle("");
              setDescription("");
            }}
            className="h-10 border bg-white border-gray-700 text-grey-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-10 border border-gray-700 text-white bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            {showLoader ? <Loader /> : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
