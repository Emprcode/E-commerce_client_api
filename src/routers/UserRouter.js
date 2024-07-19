import express from "express";
import { createUser, getUser, updateUser } from "../model/user/UserModel.js";
import bcrypt from "bcryptjs";
import {
  signAccessJWT,
  signRefreshJWT,
  verifyRefreshJWT,
} from "../utils/jwt.js";
import { newAccessJwtAuth, userAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// router.post("/", async (req, res, next) => {
//   try {
//     console.log(req.body);
//     const result = await createUser(req.body);

//     console.log(result);

//     result?._id
//       ? res.json({
//           status: "success",
//           message: "User Created Successfully",
//         })
//       : res.json({
//           status: "error",
//           message: "Unable to create user, Please try again later",
//         });
//   } catch (error) {
//     if (error.message.includes("E11000 duplicate key error collection")) {
//       error.errorCode = 200;
//       error.message =
//         "There is already an account exist with this email, Please try different email";
//     }
//     next(error);
//   }
// });

// router.post("/login", async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     // check if email exist

//     const result = await getUser({ email });

//     console.log(result);
//     result?._id
//       ? res.json({
//           status: "success",
//           message: "User login successful",
//         })
//       : res.json({
//           status: "error",
//           message: "Unable to login user, Please try again later",
//         });
//   } catch (error) {
//     next(error);
//   }
// });

//google

router.post("/google", async (req, res, next) => {
  try {
    // check if user exist
    const { email } = req.body;
    const user = await getUser({ email });
    if (user) {
      const tokens = {
        accessJWT: await signAccessJWT({ email }),
        refreshJWT: await signRefreshJWT({ email }),
      };

      // const { password, ...rest } = user._doc;
      res.json({
        status: "success",
        message: "Google Login Successful",
        tokens,
      });
    } else {
      const generatePassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatePassword, 10);
      const newUser = {
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      };
      const result = await createUser(newUser);

      if (result?._id) {
        const tokens = {
          accessJWT: await signAccessJWT({ email }),
          refreshJWT: await signRefreshJWT({ email }),
        };

        // const { password, ...rest } = user._doc;
        res.json({
          status: "success",
          message: "New google Login Successful",
          tokens,
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

router.get("/", userAuth, (req, res, next) => {
  try {
    res.json({
      status: "success",
      user: req.userInfo,
    });
  } catch (error) {
    next(error);
  }
});
router.put("/", userAuth, async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await updateUser(req.body);
    if (result?._id) {
      const tokens = {
        accessJWT: await signAccessJWT({ email }),
        refreshJWT: await signRefreshJWT({ email }),
      };
      res.json({
        status: "success",
        message: "User updated successfully",
        tokens,
      });
    } else {
      res.json({
        status: "error",
        message: "Unable to update user please try again",
      });
    }
  } catch (error) {
    next(error);
  }
});

//get new access token
router.get("/new-accessjwt", newAccessJwtAuth);

// logout user
router.patch("/logout", async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const { email } = verifyRefreshJWT(authorization);
    email && (await updateUser({ email }, { refreshJWT: "" }));

    res.json({
      status: "success",
      message: "logout success",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
