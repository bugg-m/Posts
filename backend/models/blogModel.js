import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
	title: {
		type: String,
	},
	description: {
		type: String,
	},
	image: {
		type: String,
	},
});

export const blogModel = mongoose.model("BlogData", blogSchema);
