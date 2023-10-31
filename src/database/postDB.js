import mongoose from "mongoose";

const URI =
  process.env.NODE_ENV === "Development"
    ? process.env.MONGO_URI
    : process.env.MONGO_URI_ATLAS;

export const postDatabase = async () => {
  try {
    console.log("Connecting to Database...");
    await mongoose
      .connect(URI, {})
      .then(() => {
        console.log(
          `Database Connected to ${
            process.env.NODE_ENV === "Development"
              ? "mongodb compass"
              : "mongodb atlas"
          }`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
};
