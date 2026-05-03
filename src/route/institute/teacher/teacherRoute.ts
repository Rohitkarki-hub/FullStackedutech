import express, { Router } from "express";
import Middleware from "../../../middleware/middleware";
import asyncErrorHandle from "../../../services/asyncErrorHandle";
import teacherController from "../../../controller/institute/teacher/teacher.controller";
import upload from "../../../middleware/multerUpload";

const router: Router = express.Router();

router
  .route("/")
  .post(
    Middleware.isloggedIn,
    upload.single("teacherImage"),
    asyncErrorHandle(teacherController.createTeacher),
  )
  .get(Middleware.isloggedIn, asyncErrorHandle(teacherController.getTeacher));

router
  .route("/:id")
  .delete(
    Middleware.isloggedIn,
    asyncErrorHandle(teacherController.deleteTeacher),
  );

export default router;
