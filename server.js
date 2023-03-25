import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import UserRouter from "./src/routers/UserRouter.js";
import { connectDb } from "./src/configDb/ConfigDb.js";

const app = express();

const PORT = process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//database
connectDb();
//routers

app.use("/api/v1/user", UserRouter);

//uncaught error handler

app.use("*", (req, res, next) => {
  const error = {
    errorCode: 404,
    message: "Page not found",
  };
  next(error);
});

//global error handler

app.use((error, req, res, next) => {
  const statusCode = error.errorCode || 500;

  res.status(statusCode).json({
    status: "error",
    message: error.message,
  });
});

app.listen(PORT, (error) => {
  error
    ? console.log(error)
    : console.log(`Your server is running at http://localhost:${PORT}`);
});
