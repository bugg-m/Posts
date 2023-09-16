import axios from "axios";
import { baseUrl } from "../../pages/home";

export const getBlogs = () => {
  const url = `${baseUrl}/blogs/getAllBlog`;
  return axios.get(url).then((response) => {
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

// const handleAddTask = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   try {
//     const { data } = await axios.post(
//       `${nodeServer}/task/add`,
//       { title, description },
//       {
//         headers: { "Content-Type": "application/json" },
//         withCredentials: true,
//       }
//     );
//     toast.success(data.message);
//     setRefresh(!refresh);
//     setTitle("");
//     setDescription("");
//     setLoading(false);
//   } catch (err) {
//     toast.error(err.response.data.message);
//     setLoading(false);
//   }
// };
