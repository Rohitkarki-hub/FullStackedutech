import multer from "multer";

// import { multer, storage } from "../../../middleware/multerMiddleWare";

// const upload = multer({ storage: storage });
import { cloudinary, storage } from "../services/cloudinaryConfig";
import { Request } from "express";
const upload = multer({
  storage: storage,
  fileFilter: (req: Request, file: Express.Multer.File, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."));
    }
  },
  limits: { fileSize: 4 * 1024 * 1024 },
});

export default upload;
