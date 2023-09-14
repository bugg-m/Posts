import axios from "axios";
import { baseUrl } from "../../root.component";

export const logoutUser = async () => {
  const url = `${baseUrl}/users/me`;
  return await axios.get(url, { withCredentials: true }).then((response) => {
    console.log(response);

    return response.data;
  });
};
