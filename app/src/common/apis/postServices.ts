import axios from "axios";
import { baseUrl } from "../../env";

export const getAllPost = async () => {
  const url = `${baseUrl}/posts/get_all_posts`;
  return await axios.get(url, { withCredentials: true }).then((response) => {
    return response.data;
  });
};
export const addPost = async (payload: any) => {
  const url = `${baseUrl}/posts/create_post`;
  return await axios
    .post(url, payload, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    });
};
export const likePost = async (id: string) => {
  const url = `${baseUrl}/posts/like/${id}`;
  return await axios.get(url, { withCredentials: true }).then((response) => {
    return response.data;
  });
};
export const getLikes = async (id: string) => {
  const url = `${baseUrl}/posts/get_all_likes/${id}`;
  return await axios.get(url, { withCredentials: true }).then((response) => {
    return response.data;
  });
};
export const getComments = async (id: string) => {
  const url = `${baseUrl}/posts/get_all_comments/${id}`;
  return await axios.get(url, { withCredentials: true }).then((response) => {
    return response.data;
  });
};
export const addComments = async ({
  id,
  comment,
}: {
  id: string;
  comment: string;
}) => {
  const url = `${baseUrl}/posts/comment/${id}`;
  return await axios
    .post(url, comment, {
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
