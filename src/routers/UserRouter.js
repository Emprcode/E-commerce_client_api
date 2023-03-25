import express from "express";
import { createUser, getSingleUser } from "../model/UserModel.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await createUser(req.body);

    console.log(result);

    result?._id
      ? res.json({
          status: "success",
          message: "User Created Successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to create user, Please try again later",
        });
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const result = await getSingleUser(req.body);

    console.log(result);
    result?._id
      ? res.json({
          status: "success",
          message: "User login successful",
        })
      : res.json({
          status: "error",
          message: "Unable to login user, Please try again later",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
