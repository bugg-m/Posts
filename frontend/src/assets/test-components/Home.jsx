import React, { useContext, useEffect, useState } from "react";
import { LinearProgress } from "@mui/material";
import axios from "axios";
import { nodeServer } from "../../main";
import { toast } from "react-hot-toast";
import TaskItems from "../common/TaskItems";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";

export const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    axios
      .get(`${nodeServer}/task/get`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
        // console.log(res.data.tasks);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [refresh]);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${nodeServer}/task/${id}`,
        {},
        { withCredentials: true }
      );
      setRefresh(!refresh);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${nodeServer}/task/${id}`,

        { withCredentials: true }
      );
      setRefresh(!refresh);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${nodeServer}/task/add`,
        { title, description },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setRefresh(!refresh);
      setTitle("");
      setDescription("");
      setLoading(false);
    } catch (err) {
      toast.error(err.response.data.message);
      setLoading(false);
    }
  };

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <>
      <div className="bg-gray-50 flex flex-col lg:grid lg:grid-cols-2 py-[100px] min-h-screen dark:bg-gray-900">
        {loading ? (
          <LinearProgress />
        ) : (
          <div className="flex w-3/4 flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
            <div className="w-full col-span-1 gap-2 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Add tour tasks
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleAddTask}
                >
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Title
                    </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      name="title"
                      placeholder="Title"
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
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text"
                      name="description"
                      placeholder="Description"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      required
                    />
                  </div>

                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
        <div className="col-span-1n flex w-full flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {tasks.map((data) => (
            <TaskItems
              id={data._id}
              key={data._id}
              title={data.title}
              description={data.description}
              isCompleted={data.isCompleted}
              updateHandler={updateHandler}
              deleteHandler={deleteHandler}
            />
          ))}
        </div>
      </div>
    </>
  );
};
