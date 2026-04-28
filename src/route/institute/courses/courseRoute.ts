import express, { Router } from "express";
import { CourseController } from "../../../controller/institute/course/course.controller";
import Middleware from "../../../middleware/middleware";
import asyncErrorHandle from "../../../services/asyncErrorHandle";
import multer from "multer";

// import { multer, storage } from "../../../middleware/multerMiddleWare";

// const upload = multer({ storage: storage });
import { cloudinary, storage } from "../../../services/cloudinaryConfig";
const upload = multer({ storage: storage });
const router: Router = express.Router();

router
  .route("/")
  .post(
    Middleware.isloggedIn,
    upload.single("courseImage"),
    asyncErrorHandle(CourseController.createCourse),
  );

// .get(asyncErrorHandle(CourseController.getAllCourses));
router
  .route("/:id")
  .get(
    Middleware.isloggedIn,
    // asyncErrorHandle(CourseController.getSingleCourse),
  )
  .delete(
    Middleware.isloggedIn,
    // asyncErrorHandle(CourseController.deleteCourse),
  );

export default router;
