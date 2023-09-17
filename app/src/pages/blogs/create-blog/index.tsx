import { useState } from "react";
import { CgClose } from "react-icons/cg";
import { useDispatch } from "react-redux";
import { setShowCreateBlog } from "../../../common/redux-utils/utils-slice/utilsSlice";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (e: any) => {
    e.stopPropagation();
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
      <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
            onChange={(e) => {
              setTitle(e.target.value);
            }}
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
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full border border-gray-700 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
