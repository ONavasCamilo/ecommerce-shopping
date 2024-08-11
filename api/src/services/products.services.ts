import CreateProductDto from "../dto/createProduct.dto";
import UpdateProductDto from "../dto/updateProduct.dto";
import CategoryModel from "../repositories/category.repository";
import ProductModel from "../repositories/product.repository";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import toStream from "buffer-to-stream";

export const getAllProductsService = async () => {
  const products = await ProductModel.find({
    relations: {
      category: true,
    },
  });
  return products;
};

export const getOneProductService = async (id: string) => {
  const product = await ProductModel.findOne({
    where: { id },
    relations: {
      category: true,
    },
  });
  return product;
};

export const updateProductService = async (
  id: string,
  updateProductBody: UpdateProductDto
) => {
  const existProduct = await ProductModel.findOne({
    where: { id },
    relations: {
      category: true,
    },
  });
  if (!existProduct) throw new Error("Id de producto inexistente");
  await ProductModel.update(id, updateProductBody);
  const updateProduct = await ProductModel.findOne({
    where: { id },
    relations: {
      category: true,
    },
  });
  return updateProduct;
};

export const createProductService = async (product: CreateProductDto, file: Express.Multer.File) => {
  const categories = await CategoryModel.find();
  const category = categories.find(
    (category) => category.name === product.category
  );
  if (!category) throw new Error("Categoria no encontrada");
  const response: UploadApiResponse = await new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: "ecommerce_shopping" },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result as UploadApiResponse);
        }
      }
    );
    toStream(file.buffer).pipe(upload);
  });
  const newProduct = ProductModel.create({ ...product, category, imgUrl: response.secure_url });
  await ProductModel.save(newProduct);
  return newProduct;
};

export const deleteProductService = async (id: string) => {
  const existProduct = await ProductModel.findOneBy({ id });
  if (!existProduct) throw new Error("Id de producto inexistente");
  await ProductModel.delete(existProduct);
  return existProduct;
};
