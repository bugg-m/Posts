import mongoose from "mongoose";

export const blogDatabase = () => {
	mongoose
		.connect("mongodb://127.0.0.1:27017/cnBlogs", {})
		.then(() => {
			console.log("Database Connected");
		})
		.catch((err) => {
			console.error(err);
		});
};
