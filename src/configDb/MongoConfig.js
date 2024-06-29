import mongoose from "mongoose";
import { MONGO_URL } from "./envConfig.js";

export const connectDb = () => {
  try {
    mongoose.set("strictQuery", true);
    const conn = mongoose.connect(MONGO_URL);
    conn && console.log(`mongo connected`);
  } catch (error) {
    console.log(error);
  }
};
