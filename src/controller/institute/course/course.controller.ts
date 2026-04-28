import { Request, Response } from "express";

import sequelize from "../../../database/connection";
import { IExtendedRequest } from "../../../middleware/type";

export class CourseController {
  static async createCourse(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const {
      courseName,
      coursePrice,
      courseDescription,
      courseDuration,
      courseLevel,
    } = req.body;
    if (
      !courseName ||
      !coursePrice ||
      !courseDescription ||
      !courseDuration ||
      !courseLevel
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const courseImage = req.file ? req.file.path : null;
    console.log("Course Image:", courseImage);

    await sequelize.query(
      `INSERT INTO course_${instituteNumber} (courseName, coursePrice, courseDescription, courseDuration, courseLevel, courseImage) VALUES (?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          courseName,
          coursePrice,
          courseDescription,
          courseDuration,
          courseLevel,
          courseImage,
        ],
      },
    );
    res.status(201).json({ message: "Course created successfully" });
  }

  static async deleteCourse(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const courseId = req.params.id;
    await sequelize.query(
      `DELETE FROM course_${instituteNumber} WHERE id = ?`,
      {
        replacements: [courseId],
      },
    );

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }
  }

  static async getAllCourses(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const [courses] = await sequelize.query(
      `SELECT * FROM course_${instituteNumber}`,
    );
    res.status(200).json({
      message: "All Courses retrieved successfully",
      data: courses,
    });
  }

  static async getSingleCourse(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const { courseId } = req.params;
    const [course] = await sequelize.query(
      `SELECT * FROM course_${instituteNumber} WHERE id = ?`,
      {
        replacements: [courseId],
      },
    );
    res.status(200).json({
      message: "Course retrieved successfully",
      data: course,
    });
  }
}
