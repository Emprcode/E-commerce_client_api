import express from "express";
import { createUser, getUser } from "../model/user/UserModel.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../configDb/envConfig.js";
import bcrypt from "bcryptjs";

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

    const result = await getUser({ email });

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

//google

router.post("/google", async (req, res, next) => {
  try {
    // check if user exist
    const { email } = req.body;
    const user = await getUser({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET);

      const { password, ...rest } = user._doc;
      res.json({
        rest,
        token,
        status: "success",
        message: "Google Login Successful",
      });
    } else {
      const generatePassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatePassword, 10);
      const newUser = await createUser({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      // console.log("newUser", newUser);
      if (newUser._id) {
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET);

        const { password, ...rest } = newUser._doc;
        res.json({
          status: "success",
          message: "Google login successful",
          token,
          rest,
        });
      }
    }
    res.json({
      status: "error",
      message: "Invalid logging details. Use valid email",
    });
  } catch (error) {
    next(error);
  }
});

//get user

// router.get("/", adminAuth, (req, res, next) => {
// router.get("/", (req, res, next) => {
//   try {
//     res.json({
//       status: "success",
//       user: req.userInfo,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// logout user
// router.patch("/logout", async (req, res, next) => {
//   try {
//     const { authorization } = req.headers;
//     const { email } = verifyRefreshJWT(authorization);
//     email && (await findUserAndUpdate({ email }, { refreshJWT: "" }));

//     res.json({
//       status: "success",
//       message: "logout success",
//     });
//   } catch (error) {
//     next(error);
//   }
// });

export default router;
