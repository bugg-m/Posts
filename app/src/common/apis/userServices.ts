import axios from "axios";
import { baseUrl } from "../../pages/home";

export const authenticateUser = async () => {
  const url = `${baseUrl}/users/profile`;
  return await axios.get(url, { withCredentials: true }).then((response) => {
    return response.data;
  });
};
