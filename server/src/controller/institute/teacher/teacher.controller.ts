import { Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";
import generateRandomPassword from "../../../services/generateRandomPassword";
import mailService from "../../../services/sendMail";

class teacherController {
  static async createTeacher(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const {
      teacherName,
      teacherEmail,
      teacherPhone,
      teacherExpertise,
      teacherJoinDate,
      teacherSalary,
      teacherPassword,
      courseId,
    } = req.body;

    const teacherImage = req.file ? req.file.path : null;
    if (
      !teacherName ||
      !teacherEmail ||
      !teacherPhone ||
      !teacherExpertise ||
      !teacherJoinDate ||
      !teacherSalary
    ) {
      res.status(400).json({ message: "All fields are required" });
    }
    const data = generateRandomPassword(teacherName);
    const insertData = await sequelize.query(
      `INSERT INTO teacher_${instituteNumber} (teacherName, teacherEmail, teacherPhone, teacherExpertise, teacherJoinDate, teacherSalary, teacherImage,teacherPassword) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          teacherName,
          teacherEmail,
          teacherPhone,
          teacherExpertise,
          teacherJoinDate,
          teacherSalary,
          teacherImage,
          data.hashversion,
        ],
        type: QueryTypes.INSERT,
      },
    );

    const teacherData: { id: string }[] = await sequelize.query(
      `SELECT id FROM teacher_${instituteNumber} WHERE teacherEmail = ?`,
      {
        replacements: [teacherEmail],
        type: QueryTypes.SELECT,
      },
    );
    console.log(teacherData);
    await sequelize.query(
      `UPDATE course_${instituteNumber} SET teacherId = ? WHERE id = ?`,
      {
        replacements: [teacherData[0].id, courseId],
        type: QueryTypes.UPDATE,
      },
    );
    const mailInfo = {
      from: process.env.NODEMAILER_EMAIL as string,
      to: teacherEmail,
      subject: "welcome to sasaa mern projeect",
      text: `Your password is ${data.plainversion}, your InstituteNumber is ${instituteNumber} `,
    };
    await mailService.sendMail(mailInfo);

    res.status(201).json({ message: "Teacher added successfully" });
  }
  static async getTeacher(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const [teacher] = await sequelize.query(
      `SELECT * FROM teacher_${instituteNumber}`,
      {
        type: QueryTypes.SELECT,
      },
    );

    res.status(200).json({
      message: "Teacher retrieved successfully",
      data: teacher,
    });
  }
  static async deleteTeacher(req: IExtendedRequest, res: Response) {
    const instituteNumber = req.user?.currentInstituteNumber;
    const teacherId = req.params.id;
    await sequelize.query(
      `DELETE FROM teacher_${instituteNumber} WHERE id = ?`,
      {
        replacements: [teacherId],
        type: QueryTypes.DELETE,
      },
    );
    res.status(200).json({ message: "Teacher deleted successfully" });
  }
}

export default teacherController;
