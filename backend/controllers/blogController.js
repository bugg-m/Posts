import { blogModel } from "../models/blogModel.js";

export const getBlog = async (req, res) => {
	try {
		const { id } = req.params;
		// console.log(id);
		const blogData = await blogModel.findById(id);
		res.status(200).json({
			success: true,
			blogData,
		});
	} catch (error) {
		console.error(error);
	}
};
export const getAllBlog = async (req, res) => {
	try {
		const blogData = await blogModel.find();
		res.status(200).json({
			success: true,
			message: blogData,
		});
	} catch (error) {
		console.error(error);
	}
};
export const createBlog = async (req, res) => {
	try {
		const { title, description } = req.body;
		// const image = req.file.path;
		console.log(image);
		await blogModel.create({ title, description, image });
		res.status(200).json({
			success: true,
			message: "Blog Created",
		});
	} catch (error) {
		console.error(error);
	}
};
export const updateBlog = async (req, res) => {
	try {
		const { id } = req.params;
		// console.log(id);
		const { title, description } = req.body;
		const blogData = await blogModel.findByIdAndUpdate(id, {
			$set: { title, description },
		});
		res.status(200).json({
			success: true,
			message: "Blog updated",
		});
	} catch (error) {
		console.error(error);
	}
};
export const deleteBlog = async (req, res) => {
	try {
		const { id } = req.params;
		// console.log(id);
		const blogData = await blogModel.findByIdAndDelete(id);
		res.status(200).json({
			success: true,
			message: "Blog Deleted",
		});
	} catch (error) {
		console.error(error);
	}
};
