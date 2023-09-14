import mongoose from "mongoose";

const URI = process.env.MONGO_URI;

export const blogDatabase = () => {
  mongoose
    .connect(URI, {})
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
