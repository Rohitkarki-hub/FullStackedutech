import express, { Router } from "express";

import {
  createCourseTable,
  createStudentTable,
  createTeacherTable,
  createCategoryTable,
  InstituteController,
} from "../../controller/institute/institute.controller";
import Middleware from "../../middleware/middleware";
import asyncErrorHandle from "../../services/asyncErrorHandle";

const router: Router = express.Router();

router
  .route("/")
  .post(
    Middleware.isloggedIn,
    InstituteController.createInstitute,
    createTeacherTable,
    createStudentTable,
    asyncErrorHandle(createCourseTable),
    createCategoryTable,
  );

export default router;
