import { Router } from "express";
import multer from "multer";
import {
  deleteProductController,
  getAllProductsController,
  getOneProductsController,
  postCreateProductController,
  updateProductController,
} from "../controllers/products.controller";
import updateProductDtoMiddleware from "../middlewares/updateProductDto.middleware";
import { verifyToken } from "../middlewares/verifyToken.middleware";
import { isAdmin } from "../middlewares/isAdmin.middleware";
import CreateProductDtoMiddleware from "../middlewares/createProductDto.middleware";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 200000 }, // 200kb
  fileFilter: (req, file, cb) => {
    const filetypes = /jpg|jpeg|png|webp|svg|gif/;
    const mimetype = filetypes.test(file.mimetype);
    let extname = false;
    if (file.originalname) {
      const extension = file.originalname.split(".").pop()?.toLowerCase();
      if (extension) {
        extname = filetypes.test(extension);
      }
    }

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Tipo de archivo no soportado"));
    }
  },
});

const productsRouter = Router();

productsRouter.get("/list", getAllProductsController);

productsRouter.get("/one/:id", getOneProductsController);

productsRouter.put(
  "/update/:id",
  [updateProductDtoMiddleware, verifyToken, isAdmin],
  updateProductController
);

productsRouter.post(
  "/create",
  upload.single("file"),
  [CreateProductDtoMiddleware, verifyToken, isAdmin],
  postCreateProductController
);

productsRouter.delete(
  "/delete/:id",
  [verifyToken, isAdmin],
  deleteProductController
);

export default productsRouter;
