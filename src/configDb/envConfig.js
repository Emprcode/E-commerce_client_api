import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const ACCESS_JWT = process.env.ACCESS_JWT;
export const REFRESH_JWT = process.env.REFRESH_JWT;
export const MONGO_URL = process.env.MONGO_URL;
