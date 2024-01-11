import axios from "axios";
import { signInProps, signUpProps } from "../types/types";
import { baseUrl } from "../../env";

export const authenticateUser = async () => {
  const url = `${baseUrl}/users/profile`;
  return await axios.get(url, { withCredentials: true }).then((response) => {
    return response.data;
  });
};
export const userProfile = async (id: string) => {
  const url = `${baseUrl}/users/user_details/${id}`;
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
export const sign_up = async (payload: signUpProps) => {
  const url = `${baseUrl}/users/sign_up`;
  return await axios
    .post(url, payload, {
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    });
};
export const sign_out = async () => {
  const url = `${baseUrl}/users/sign_out`;
  return await axios.get(url, { withCredentials: true }).then((response) => {
    return response.data;
  });
};
export const follow_user = async (id: string) => {
  const url = `${baseUrl}/users/follow_user/${id}`;
  return await axios.get(url, { withCredentials: true }).then((response) => {
    return response.data;
  });
};
export const get_chat_list = async () => {
  const url = `${baseUrl}/users/get_chats`;
  return await axios.get(url, { withCredentials: true }).then((response) => {
    return response.data;
  });
};
export const add_chat = async (id: string) => {
  const url = `${baseUrl}/users/add_chat/${id}`;
  return await axios.get(url, { withCredentials: true }).then((response) => {
    return response.data;
  });
};
