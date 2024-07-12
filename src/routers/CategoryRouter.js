import express from "express";
import { getAllCategory } from "../model/category/CategoryModel.js";

const router = express.Router();

//fetch all product
router.get("/", async (req, res, next) => {
  try {
    const result = await getAllCategory();
    // console.log(result);
    res.json({
      status: "success",
      message: "All categories Fetched",
      result,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
