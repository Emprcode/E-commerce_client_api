import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
dotenv.config();
const MONGO_URL = process.env.MONGO_CLIENT;

const client = new MongoClient(MONGO_URL);

export const connectToDatabase = async() => {
  try {
    await client.connect();
    console.log("Connected to database!");
    const db = client.db('E-commerce');
    return db;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

