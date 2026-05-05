import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req: any, file: any) => {
    return {
      folder: "fullstacksaas", // Fixed typo "fllstacksaas" and added return
      allowed_formats: ["jpg", "png", "jpeg"], // Good practice to restrict formats
    };
  },
});

export { cloudinary, storage };
