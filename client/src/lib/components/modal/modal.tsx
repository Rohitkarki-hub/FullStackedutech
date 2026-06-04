import { useState } from "react";

import { addCategory } from "../../store/institute/category/categorySlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ICategoryAddData } from "../../store/institute/category/catogeryslice.types";
import { Status } from "../../types.ts/types";

const Modal = ({ handleClose }: { handleClose: () => void }) => {
  const dispatch = useAppDispatch();
  const { status } = useAppSelector((state) => state.category);
  const [categoryData, setCategoryData] = useState<ICategoryAddData>({
    categoryName: "",
    categoryDescription: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCategoryData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(addCategory(categoryData));
    if (status === Status.SUCCESS) {
      handleClose();
    }
  };
  return (
    <div
      id="modal"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="fixed inset-0 bg-black/50" />
      <div className="relative w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Create Category
          </h3>
          <button
            id="closeModalButton"
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              className="h-4 w-4 inline-block ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="category_name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Category Name
            </label>
            <input
              type="text"
              id="category_name"
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Web Development"
              name="categoryName"
              value={categoryData.categoryName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="category_description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Category Description
            </label>
            <textarea
              id="category_description"
              className="w-full mt-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
              placeholder="Description of the category"
              name="categoryDescription"
              value={categoryData.categoryDescription}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              id="cancelButton"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              id="submitUrlButton"
              type="submit"
              className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 dark:from-green-500 dark:to-green-600 dark:hover:from-green-600 dark:hover:to-green-700"
            >
              Create Category
              <svg
                className="h-4 w-4 inline-block ml-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
