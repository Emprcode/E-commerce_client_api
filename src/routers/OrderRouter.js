import express from "express";
import { getOrders } from "../model/order/OrderModel.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const userId = req.userInfo._id;
    console.log(userId);
    const result = await getOrders({ userId });
    res.json({
      status: "success",
      message: "Order fetched successfully",
      result,
    });
    // console.log("order:", result);
  } catch (error) {
    next(error);
  }
});

export default router;
