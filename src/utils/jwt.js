import Jwt from "jsonwebtoken";
import { createSession } from "../model/session/SessionModel.js";
import { updateUser } from "../model/user/UserModel.js";
import { ACCESS_JWT, REFRESH_JWT } from "../configDb/envConfig.js";

//payload must be an object
export const signAccessJWT = async (payload) => {
  const token = Jwt.sign(payload, ACCESS_JWT, { expiresIn: "60m" });

  //store in session table

  await createSession({ token });

  return token;
};

export const signRefreshJWT = async (payload) => {
  const token = Jwt.sign(payload, REFRESH_JWT, {
    expiresIn: "10d",
  });

  // store thr user in user table

  await updateUser(payload, { refreshJWT: token });
  return token;
};

//verify token

export const verifyAccessJWT = (token) => {
  try {
    return Jwt.verify(token, ACCESS_JWT);
  } catch (error) {
    return error.message;
  }
};
export const verifyRefreshJWT = (token) => {
  try {
    return Jwt.verify(token, ACCESS_JWT);
  } catch (error) {
    return error.message;
  }
};
