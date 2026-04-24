import express, { Router } from "express";
import asyncErrorHandle from "../../services/asyncErrorHandle";
import { studentController } from "../../controller/student/student.controller";

const router: Router = express.Router();

router
  .route("/")

  .get(asyncErrorHandle(studentController.getStudents));

export default router;
