import { NextFunction, Request, Response } from "express";

import sequelize from "../../database/connection";
import { generateRandomNumber } from "../../services/generateNumber";
import User from "../../database/models/user.model";
import { IExtendedRequest } from "../../middleware/type";

class InstituteController {
  static async createInstitute(
    req: IExtendedRequest,
    res: Response,
    next: Function,
  ) {
    console.log("Request body:", req.body);
    console.log("User:", req.user);
    const { instituteName, instituteEmail, institutePhone, instituteAddress } =
      req.body;
    const instituteVatNo = req.body.instituteVatNo || null;
    const institutePanVatNo = req.body.institutePanVatNo || null;
    if (
      !instituteName ||
      !instituteEmail ||
      !institutePhone ||
      !instituteAddress
    ) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const instituteNumber = generateRandomNumber();
    const TableName = `institute_${instituteNumber}`;

    await sequelize.query(`CREATE TABLE IF NOT EXISTS ${TableName} (
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  instituteName VARCHAR(255) NOT NULL,
  instituteEmail VARCHAR(255) NOT NULL UNIQUE,
  institutePhone VARCHAR(255) NOT NULL UNIQUE,
  instituteAddress VARCHAR(255) NOT NULL,
  instituteVatNo VARCHAR(100),
  institutePanVatNo VARCHAR(100),  
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`);

    await sequelize.query(
      `INSERT INTO ${TableName} (instituteName, instituteEmail, institutePhone, instituteAddress, instituteVatNo, institutePanVatNo) VALUES (?, ?, ?, ?, ?, ?)`,
      {
        replacements: [
          instituteName,
          instituteEmail,
          institutePhone,
          instituteAddress,
          instituteVatNo,
          institutePanVatNo,
        ],
      },
    );

    await sequelize.query(`CREATE TABLE IF NOT EXISTS user_institute(
      id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
      userId VARCHAR(255) REFERENCES users(id) ,
      instituteNumber VARCHAR(255) UNIQUE
         )`);

    await sequelize.query(
      `INSERT INTO user_institute (userId, instituteNumber) VALUES (?, ?)`,
      {
        replacements: [req.user?.id, instituteNumber],
      },
    );

    if (req.user) {
      await User.update(
        { currentInstituteNumber: instituteNumber },
        { where: { id: req.user.id } },
      );
    }
    req.instituteNumber = instituteNumber;
    next();
  }
}
const createTeacherTable = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  const instituteNumber = req.instituteNumber;
  await sequelize.query(`CREATE TABLE IF NOT EXISTS teacher_${instituteNumber} (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    teacherName VARCHAR(255) NOT NULL,
    teacherEmail VARCHAR(255) NOT NULL UNIQUE,
    teacherPhone VARCHAR(255) NOT NULL UNIQUE,
    
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`);
  next();
};
const createStudentTable = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  const instituteNumber = req.instituteNumber;
  await sequelize.query(`CREATE TABLE IF NOT EXISTS student_${instituteNumber} (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    studentName VARCHAR(255) NOT NULL,
    studentEmail VARCHAR(255) NOT NULL UNIQUE,
    studentPhone VARCHAR(255) NOT NULL UNIQUE,
    
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`);
  next();
};

const createCourseTable = async (
  req: IExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  const instituteNumber = req.instituteNumber;
  await sequelize.query(`CREATE TABLE IF NOT EXISTS course_${instituteNumber} (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    courseName VARCHAR(255) NOT NULL,
    coursePrice VARCHAR(255) NOT NULL UNIQUE,
    courseDescription TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )`);
  res.status(201).json({ message: "Institute created successfully" });
};
export {
  InstituteController,
  createTeacherTable,
  createStudentTable,
  createCourseTable,
};
