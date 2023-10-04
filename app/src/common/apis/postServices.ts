import axios from "axios";
import { baseUrl } from "../../pages/home";

export const getAllPosts = async () => {
  const url = `${baseUrl}/posts/getAllPost`;
  return await axios.get(url, { withCredentials: true }).then((response) => {
    return response.data;
  });
};
export const addPost = async (payload: any) => {
  const url = `${baseUrl}/posts/createPost`;
  return await axios
    .post(url, payload, {
      headers: { "Content-Type": "multipart/form-data" },
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
