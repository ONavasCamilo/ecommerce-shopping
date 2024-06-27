import { Category } from "../entities/category.entity";
import { Product } from "../entities/product.entity";
import CategoryModel from "../repositories/category.repository";
import ProductModel from "../repositories/product.repository";
import data from "../utils/data.json";

export const seedProducts = async () => {
  const categoryPromise = data?.map(async (element) => {
    await CategoryModel.createQueryBuilder()
      .insert()
      .into(Category)
      .values({ name: element.category })
      .orIgnore()
      .execute();
  });
  await Promise.all(categoryPromise);

  const categories = await CategoryModel.find();
  const productPromises = data?.map(async (element) => {
    const category = categories.find(
      (category) => category.name === element.category
    );
    if (!category) {
      throw new Error(`Categoria ${element.category} no encontrada`);
    }
    const product = new Product();
    product.name = element.name;
    product.description = element.description;
    product.price = element.price;
    product.imgUrl = element.imgUrl;
    product.stock = element.stock;
    product.category = category;
    await ProductModel.createQueryBuilder()
      .insert()
      .into(Product)
      .values(product)
      .orUpdate(["description", "price", "imgUrl", "stock"], ["name"])
      .execute();
  });
  await Promise.all(productPromises);
};
