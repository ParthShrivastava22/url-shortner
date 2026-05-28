import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/mongo.config.js";
import shorturlRoute from "./src/modules/shorturl/shorturl.route.js";
import authRoute from "./src/modules/auth/auth.route.js";
import errorMiddleware from "./src/shared/middleware/error.middleware.js";
import cors from "cors";

dotenv.config("./.env");

const app = express();

app.use(cors());
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/shorturl", shorturlRoute);
app.use("/api/auth", authRoute);
app.use("/", shorturlRoute);

app.use(errorMiddleware);

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on port 3000");
});
