import io from "socket.io-client";
import { Cloudinary } from "@cloudinary/url-gen/index";

export const baseUrl = "http://localhost:4000";
export const socket = io(baseUrl);
export const cloudinary = new Cloudinary({ cloud: { cloudName: "dgskifwyj" } });
