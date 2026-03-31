import Category from "../adminModels/categoryModel.js";

export const createCategory = async (req, res) => {
  const category = await Category.create({ name: req.body.name });
  res.json(category);
};

export const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};

export const deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};