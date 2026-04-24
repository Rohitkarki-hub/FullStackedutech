import express, { Router } from "express";

import {
  createCourseTable,
  createStudentTable,
  createTeacherTable,
  InstituteController,
} from "../../controller/institute/institute.controller";
import Middleware from "../../middleware/middleware";
import asyncErrorHandle from "../../services/asyncErrorHandle";

const router: Router = express.Router();

router
  .route("/")
  .post(
    asyncErrorHandle(Middleware.isloggedIn),
    asyncErrorHandle(InstituteController.createInstitute),
    asyncErrorHandle(createTeacherTable),
    asyncErrorHandle(createStudentTable),
    asyncErrorHandle(createCourseTable),
  );

export default router;
