import { Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";

class CategoryController {
  static async createCategory(req: IExtendedRequest, res: Response) {
    const institutenumber = req.user?.currentInstituteNumber;
    const { categoryName, categoryDescription } = req.body;
    if (!categoryName || !categoryDescription) {
      return res.status(400).json({ message: "All fields are required" });
    }
    await sequelize.query(
      `INSERT INTO category_${institutenumber} (categoryName, categoryDescription) VALUES (?, ?)`,
      {
        replacements: [categoryName, categoryDescription],
      },
    );
    res.status(201).json({ message: "Category added successfully" });
  }
  static getCategories = async (req: IExtendedRequest, res: Response) => {
    const instituteNumber = req.user?.currentInstituteNumber;
    const [categories] = await sequelize.query(
      `SELECT * FROM category_${instituteNumber}`,
    );
    res
      .status(200)
      .json({ message: "Categories retrieved successfully", categories });
  };

  static deleteCategory = async (req: IExtendedRequest, res: Response) => {
    const instituteNumber = req.user?.currentInstituteNumber;
    const categoryId = req.params.id;
    await sequelize.query(
      `DELETE FROM category_${instituteNumber} WHERE id = ?`,
      {
        replacements: [categoryId],
      },
    );
    res.status(200).json({ message: "Category deleted successfully" });
  };
}

export default CategoryController;
