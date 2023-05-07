import mongoose from 'mongoose'
import { MongoClient } from 'mongodb';

const url = 'mongodb://127.0.0.1:27017/E-commerce';
// const url = 'mongodb://127.0.0.1:27017/E-commerce';

const client = new MongoClient(url);

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

export const connectDb = () => {
  try {
    mongoose.set('strictQuery', true)
    const conn = mongoose.connect(process.env.MONGO_CLIENT);
    conn && console.log("mongo connected")
  } catch (error) {
    console.log(error);
  }
};


