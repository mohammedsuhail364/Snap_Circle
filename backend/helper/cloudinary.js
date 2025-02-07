const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadMediaToCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
    });
    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new Error("Error uploading to Cloudinary");
  }
};
module.exports={
  uploadMediaToCloudinary
}