import express, { Request, Router } from "express";
import { CourseController } from "../../../controller/institute/course/course.controller";
import Middleware from "../../../middleware/middleware";
import asyncErrorHandle from "../../../services/asyncErrorHandle";
import upload from "../../../middleware/multerUpload";

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
