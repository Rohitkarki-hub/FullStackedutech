import express from "express";

const app = express();
import authRoute from "./route/globals/auth/authRoute";
import instituteRoute from "./route/institute/instituteRoute";
import courseRoute from "./route/institute/courses/courseRoute";
import studentRoute from "./route/student/studentRoute";

app.use(express.json());

app.use("/api/", authRoute);
app.use("/api/institute", instituteRoute);
app.use("/api/student", studentRoute);
app.use("/api/institute/courses", courseRoute);

export default app;
