import express, { Request, Router } from "express";
import { CourseController } from "../../../controller/institute/course/course.controller";
import Middleware from "../../../middleware/middleware";
import asyncErrorHandle from "../../../services/asyncErrorHandle";
import multer from "multer";

// import { multer, storage } from "../../../middleware/multerMiddleWare";

// const upload = multer({ storage: storage });
import { cloudinary, storage } from "../../../services/cloudinaryConfig";
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
const router: Router = express.Router();

router
  .route("/")
  .post(
    Middleware.isloggedIn,
    upload.single("courseImage"),
    asyncErrorHandle(CourseController.createCourse),
  )
  .get(Middleware.isloggedIn, asyncErrorHandle(CourseController.getAllCourses));
router
  .route("/:id")
  .get(
    Middleware.isloggedIn,
    asyncErrorHandle(CourseController.getSingleCourse),
  )
  .delete(
    Middleware.isloggedIn,
    asyncErrorHandle(CourseController.deleteCourse),
  );

export default router;
