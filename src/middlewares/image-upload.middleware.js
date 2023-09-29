import multer from "multer";

const imageStorage = multer.memoryStorage();

export const imageUpload = multer({
  storage: imageStorage,
});
