import mongoose from "mongoose";

export const connectDb = () => {
  try {
    const conn = mongoose.connect(process.env.MONGO_CLIENT);

    conn && console.log("mongo connected");
  } catch (error) {
    return {
      status: "error",
      message: error.message,
    };
  }
};
