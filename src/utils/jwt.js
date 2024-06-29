import Jwt from "jsonwebtoken";
import { ACCESS_JWT, REFRESH_JWT } from "../configDb/envConfig.js";
import { updateUser } from "../model/user/UserModel.js";

export const signAccessJWT = async (payload) => {
  const token = Jwt.sign(payload, ACCESS_JWT, { expiresIn: "60m" });

  return token;
};

export const signRefreshJWT = async (payload) => {
  const token = Jwt.sign(payload, REFRESH_JWT, {
    expiresIn: "30d",
  });

  // store thr user in user table

  await updateUser(payload, { refreshJWT: token });
  return token;
};
