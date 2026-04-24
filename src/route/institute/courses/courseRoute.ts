import express, { Router } from "express";
import { CourseController } from "../../../controller/course/course.controller";
import Middleware from "../../../middleware/middleware";
import asyncErrorHandle from "../../../services/asyncErrorHandle";

const router: Router = express.Router();

router
  .route("/")
  .post(Middleware.isloggedIn, asyncErrorHandle(CourseController.createCourse))
  .get(asyncErrorHandle(CourseController.getAllCourses));
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
