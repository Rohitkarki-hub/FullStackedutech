import express, { Router } from "express";
import teacherLoginController from "../../controller/teacher/teacher.controller";
import asyncErrorHandle from "../../services/asyncErrorHandle";

const router: Router = express.Router();

router.route("/").post(asyncErrorHandle(teacherLoginController.teacherLogin));
export default router;
