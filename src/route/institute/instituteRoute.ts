import express, { Router } from "express";

import {
  createCourseTable,
  createStudentTable,
  createTeacherTable,
  InstituteController,
} from "../../controller/institute/institute.controller";
import Middleware from "../../middleware/middleware";

const router: Router = express.Router();

router
  .route("/")
  .post(
    Middleware.isloggedIn,
    InstituteController.createInstitute,
    createTeacherTable,
    createStudentTable,
    createCourseTable,
  );

export default router;
