import express from "express";
import morgan from "morgan";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import router from "./routes/index.routes";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "./config/env.config";

const app = express();

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api", router);

export default app;
