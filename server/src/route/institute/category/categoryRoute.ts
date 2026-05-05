import express, { Router } from "express";
import asyncErrorHandle from "../../../services/asyncErrorHandle";
import CategoryController from "../../../controller/institute/category/category.controller";
import Middleware from "../../../middleware/middleware";

const router: Router = express.Router();

router
  .route("/")
  .post(
    Middleware.isloggedIn,
    asyncErrorHandle(CategoryController.createCategory),
  )
  .get(
    Middleware.isloggedIn,
    asyncErrorHandle(CategoryController.getCategories),
  );

router
  .route("/:id")
  .delete(
    Middleware.isloggedIn,
    asyncErrorHandle(CategoryController.deleteCategory),
  );

export default router;
