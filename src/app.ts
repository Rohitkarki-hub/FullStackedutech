import express from "express";

const app = express();
import authRoute from "./route/globals/auth/authRoute";
import instituteRoute from "./route/institute/instituteRoute";
import courseRoute from "./route/institute/courses/courseRoute";
import studentRoute from "./route/student/studentRoute";
import categoryRoute from "./route/institute/category/categoryRoute";
import teacherInstituteRoute from "./route/institute/teacher/teacherRoute";
import teacherRoute from "./route/teacher/teacherRoute";

app.use(express.json());

app.use("/api/", authRoute);
app.use("/api/institute", instituteRoute);
app.use("/api/student", studentRoute);
app.use("/api/institute/courses", courseRoute);
app.use("/api/institute/category", categoryRoute);
app.use("/api/institute/teacher", teacherInstituteRoute);
app.use("/api/teacher", teacherRoute);
export default app;
