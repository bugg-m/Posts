import multer from "multer";

const imageStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "./backend/uploads");
	},
	filename: (req, file, cb) => {
		const name = `${Date.now()}-${file.originalname}`;
		cb(null, name);
	},
});

export const imageUpload = multer({
	storage: imageStorage,
});
