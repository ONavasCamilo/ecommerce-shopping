import { Router } from "express";
import multer from "multer";
import { filesUploadImageController } from "../controllers/files.controller";

const filesRouter = Router();

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

filesRouter.post(
  "/uploadImage/:id",
  upload.single("file"),
  filesUploadImageController
);

export default filesRouter;
