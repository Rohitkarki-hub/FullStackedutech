import { Request, Response } from "express";

import sequelize from "../../../database/connection";
import { IExtendedRequest } from "../../../middleware/type";
import { QueryTypes } from "sequelize";

export class CourseController {
  static async createCourse(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const {
      courseName,
      coursePrice,
      courseDescription,
      courseDuration,
      courseLevel,
      categoryId,
    } = req.body;
    if (
      !courseName ||
      !coursePrice ||
      !courseDescription ||
      !courseDuration ||
      !courseLevel ||
      !categoryId
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const courseImage = req.file ? req.file.path : null;
    console.log("Course Image:", courseImage);

    await sequelize.query(
      `INSERT INTO course_${instituteNumber} (courseName, coursePrice, courseDescription, courseDuration, courseLevel, courseImage, categoryId) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          courseName,
          coursePrice,
          courseDescription,
          courseDuration,
          courseLevel,
          courseImage,
          categoryId,
        ],
        type: QueryTypes.INSERT,
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
        type: QueryTypes.DELETE,
      },
    );

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }
  }

  // static async getAllCourses(req: IExtendedRequest, res: Response) {
  //   const instituteNumber = req.user?.currentInstituteNumber;
  //   const courses = await sequelize.query(
  //     `SELECT*FROM course_${instituteNumber} JOIN COURSE_${instituteNumber} ON course_${instituteNumber}.categoryId = category_${instituteNumber}.id`,
  //     {
  //       type: QueryTypes.SELECT,
  //     },
  //   );
  //   console.log(courses);
  //   res.status(200).json({
  //     message: "All Courses retrieved successfully",
  //     data: courses,
  //   });
  // }

  static async getAllCourses(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;

    // Use aliases (c and cat) to keep the query readable and avoid 'Not unique' errors
    const query = `
      SELECT 
        c.*, 
        cat.categoryName, 
        cat.categoryDescription 
      FROM course_${instituteNumber} AS c
      JOIN category_${instituteNumber} AS cat ON c.categoryId = cat.id
    `;

    const courses = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    console.log(courses);
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
        type: QueryTypes.SELECT,
      },
    );
    res.status(200).json({
      message: "Course retrieved successfully",
      data: course,
    });
  }
}
