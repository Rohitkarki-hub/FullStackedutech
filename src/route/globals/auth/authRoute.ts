import express, { Router } from "express";
import AuthController from "../../../controller/globals/auth/auth.controller";
import asyncErrorHandle from "../../../services/asyncErrorHandle";

const router: Router = express.Router();

router.route("/register").post(asyncErrorHandle(AuthController.registerUser));
router.route("/login").post(asyncErrorHandle(AuthController.loginUser));

export default router;
