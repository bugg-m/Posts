import app from "./app.js";
import { blogDatabase } from "./src/database/blogDB.js";
import cloudinary from "cloudinary";
const PORT = process.env.PORT || 4000;

blogDatabase();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.listen(4000, () => {
  console.log(
    `Server listening on port http://localhost:${PORT} in ${process.env.NODE_ENV} mode`
  );
});
