import axios from "axios";
import { baseUrl } from "../../pages/home";

export const getAllBlogs = async () => {
  const url = `${baseUrl}/blogs/getAllBlog`;
  return await axios.get(url, { withCredentials: true }).then((response) => {
    return response.data;
  });
};
export const addBlog = async ({ payload }: any) => {
  const url = `${baseUrl}/blogs/createblog`;
  return await axios
    .post(url, payload, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    });
};

// useEffect(() => {
//   axios
//     .get(`${nodeServer}/task/get`, {
//       withCredentials: true,
//     })
//     .then((res) => {
//       setTasks(res.data.tasks);
//       // console.log(res.data.tasks);
//     })
//     .catch((err) => {
//       toast.error(err.response.data.message);
//     });
// }, [refresh]);

// const updateHandler = async (id) => {
//   try {
//     const { data } = await axios.put(
//       `${nodeServer}/task/${id}`,
//       {},
//       { withCredentials: true }
//     );
//     setRefresh(!refresh);
//     toast.success(data.message);
//   } catch (error) {
//     toast.error(error.response.data.message);
//   }
// };
// const deleteHandler = async (id) => {
//   try {
//     const { data } = await axios.delete(
//       `${nodeServer}/task/${id}`,

//       { withCredentials: true }
//     );
//     setRefresh(!refresh);
//     toast.success(data.message);
//   } catch (error) {
//     toast.error(error.response.data.message);
//   }
// };
