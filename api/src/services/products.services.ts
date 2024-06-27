import ProductModel from "../repositories/product.repository";

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

export const updateProductService = async (id: string, updateProductBody: any) => {
    const existProduct = await ProductModel.findOne({
        where: { id },
        relations: {
            category: true,
        }
    })
    if (!existProduct) throw new Error("Id de producto inexistente");
    await ProductModel.update(id, updateProductBody);
    const updateProduct = await ProductModel.findOne({
        where: { id },
        relations: {
            category: true,
        }
    })
    return updateProduct;
}
