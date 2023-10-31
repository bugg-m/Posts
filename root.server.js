import server from "./root.component.js";
import { postDatabase } from "./src/database/postDB.js";
import cloudinary from "cloudinary";
const PORT = process.env.PORT || 4000;

postDatabase();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

server.listen(4000, () => {
  try {
    console.log(
      `Server listening on port http://localhost:${PORT} in ${process.env.NODE_ENV} mode`
    );
  } catch (error) {
    console.log(error);
  }
});
