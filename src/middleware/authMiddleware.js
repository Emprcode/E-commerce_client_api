import { getSession } from "../model/session/SessionModel.js";
import { getUser } from "../model/user/UserModel.js";
import {
  signAccessJWT,
  verifyAccessJWT,
  verifyRefreshJWT,
} from "../utils/jwt.js";

export const userAuth = async (req, res, next) => {
  try {
    //get access token
    const { authorization } = req.headers;

    //gives you decoded email
    const { email } = await verifyAccessJWT(authorization);
    if (email) {
      //check if email exist
      const { _id } = await getSession({ token: authorization });

      if (_id) {
        const user = await getUser({ email });
        if (user) {
          //get the user and set in the req obj
          user.password = undefined;
          req.userInfo = user;
          return next();
        }
      }
    }
    res.status(403).json({
      status: "error",
      message: "Unauthorize",
    });
  } catch (error) {
    if (error.message === "jwt expired") {
      error.errorCode = 403;
    }
    next(error);
  }
};

export const newAccessJwtAuth = async (req, res, next) => {
  try {
    //get access token

    const { authorization } = req.headers;

    //check if it is valid

    const { email } = verifyRefreshJWT(authorization);
    if (email) {
      //check if email exist
      const { _id } = await getUser({ email, refreshJWT: authorization });

      if (_id) {
        const accessJWT = await signAccessJWT({ email });

        if (accessJWT) {
          return res.json({
            status: "success",
            accessJWT,
          });
        }
      }
    }

    res.status(401).json({
      status: "error",
      message: "Unauthenticate",
    });
  } catch (error) {
    next(error);
  }
};
