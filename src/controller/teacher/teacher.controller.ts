import { Response } from "express";
import { IExtendedRequest } from "../../middleware/type";
import sequelize from "../../database/connection";
import { QueryTypes } from "sequelize";
import bcrypt from "bcrypt";
import { Jwt } from "jsonwebtoken";
import generateJWTToken from "../../services/generateJwtToken";

interface Iteacher {
  teacherEmail: string;
  teacherPassword: string;
  teacherInstituteNumber: string;
  id: string;
}

class teacherLoginController {
  static async teacherLogin(req: IExtendedRequest, res: Response) {
    const { teacherEmail, teacherPassword, teacherInstituteNumber } = req.body;
    if (!teacherEmail || !teacherPassword || !teacherInstituteNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const teacherData: Iteacher[] = await sequelize.query(
      `SELECT * FROM teacher_${teacherInstituteNumber} WHERE teacherEmail = ? `,
      {
        replacements: [teacherEmail],
        type: QueryTypes.SELECT,
      },
    );
    if (teacherData.length > 0) {
      return res
        .status(200)
        .json({ message: "Teacher logged in successfully", data: teacherData });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = bcrypt.compareSync(
      teacherPassword,
      teacherData[0].teacherPassword,
    );
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    } else {
      const token = generateJWTToken({
        id: teacherData[0].id,
        instituteNumber: teacherInstituteNumber,
      });
      return res.status(200).json({
        message: "Teacher logged in successfully",
        data: teacherData,
        token,
      });
    }
  }
}

export default teacherLoginController;
