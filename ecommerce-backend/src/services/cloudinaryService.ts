const cloudinary = require("cloudinary").v2;
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = (
  filePath: string,
  folderName?: string,
  option?: any
) => {
  try {
    return cloudinary.uploader.upload(filePath, {
      folder: `/packing/${folderName ? folderName : "products"}`,
      transformation: [
        { width: 500, height: 500, crop: "fill", ...option },
        { quality: "auto" },
      ],
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const deleteImage = (publicId: string) => {
  try {
    return cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};
