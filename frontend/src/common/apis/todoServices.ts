import axios from "axios";
import { baseUrl } from "../../pages/home";

export const getBlogs = () => {
  const url = `${baseUrl}/task/getAll`;
  return axios.get(url).then((response) => {
    return response.data;
  });
};
