import axios from "axios";
import { baseUrl } from "../../main";

export const getBlogs = () => {
  const url = `${baseUrl}/task/getAll`;
  return axios.get(url).then((response) => {
    return response.data;
  });
};
