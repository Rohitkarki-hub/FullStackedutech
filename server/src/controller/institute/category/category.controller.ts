import { Response } from "express";
import { IExtendedRequest } from "../../../middleware/type";
import sequelize from "../../../database/connection";
import { QueryTypes } from "sequelize";

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
        type: QueryTypes.INSERT,
      },
    );
    const [CategoryData]: { id: string; createdAt: Date }[] =
      await sequelize.query(
        `SELECT * FROM category_${institutenumber} WHERE categoryName = ?`,
        {
          replacements: [categoryName],
          type: QueryTypes.SELECT,
        },
      );
    res.status(201).json({
      message: "Category added successfully",
      data: {
        categoryName,
        categoryDescription,
        id: CategoryData.id,
        createdAt: CategoryData.createdAt,
      },
    });
  }
  static getCategories = async (req: IExtendedRequest, res: Response) => {
    const instituteNumber = req.user?.currentInstituteNumber;
    const [categories] = await sequelize.query(
      `SELECT * FROM category_${instituteNumber}`,
    );
    res
      .status(200)
      .json({ message: "Categories retrieved successfully", data: categories });
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
