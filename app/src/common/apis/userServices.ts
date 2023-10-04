import axios from "axios";
import { baseUrl } from "../../pages/home";

export const authenticateUser = async () => {
  const url = `${baseUrl}/users/profile`;
  return await axios.get(url, { withCredentials: true }).then((response) => {
    return response.data;
  });
};

export const sign_in = async (payload: signInProps) => {
  const url = `${baseUrl}/users/sign_in`;
  return await axios
    .post(url, payload, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    });
};
