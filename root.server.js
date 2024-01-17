import server from "./root.component.js";
import { postDatabase } from "./src/database/postDB.js";
import cloudinary from "cloudinary";

const PORT = process.env.PORT || 4000;

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

postDatabase()
  .then(() => {
    server.listen(PORT, () => {
      try {
        console.log(
          `Server listening on port http://localhost:${PORT} in ${process.env.NODE_ENV} mode`
        );
      } catch (error) {
        console.log(error);
      }
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
