import CategoryModel from "../repositories/category.repository";

export const getCategoriesService = async () => {
  const categories = await CategoryModel.find();
  return categories;
};
