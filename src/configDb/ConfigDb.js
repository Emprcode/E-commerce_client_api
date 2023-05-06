
import { MongoClient } from 'mongodb';

const url = 'mongodb://127.0.0.1:27017/E-commerce';

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



// some-other-file.js
// import { connectToDatabase } from './db.js';

// async function someFunction() {
//   const db = await connectToDatabase();
//   const collection = db.collection('admin');
//   // perform database operations here
// }