import DataURIParser from "datauri/parser.js";
import path from "path";

export const getDataUri = (file) => {
  const parser = new DataURIParser();

  // Check if file and file.originalname are defined
  if (file && file.originalname) {
    const extName = path.extname(file.originalname)?.toString();
    return parser.format(extName, file.buffer);
  } else {
    // Handle the case where file or file.originalname is undefined
    throw new Error("Invalid file object or missing originalname property.");
  }
};
