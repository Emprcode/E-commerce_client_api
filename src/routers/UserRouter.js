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
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.errorCode = 200;
      error.message =
        "There is already an account exist with this email, Please try different email";
    }
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if email exist

    const result = await getSingleUser({ email });

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
