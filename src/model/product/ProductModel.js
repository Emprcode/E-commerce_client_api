

import { connectToDatabase } from "../../configDb/ConfigDb.js";
import { ObjectId } from 'mongodb';

 
// export const getAllProduct = async () => {

//get all products 

export const getAllProduct = async()=>  {
  const db = await connectToDatabase(); // db is a Promise that resolves to the collection

  console.log(db); // logs "Promise { <pending> }"

  const collection = db.collection('products');  //   return collection; // return the collection

  const results = collection.find({}).toArray(); // wait for the Promise to resolve

  console.log(results); // logs the results of the database query
  
  return results
}

//get single product

export const getSingleProduct = async(slug)=>  {
  const db = await connectToDatabase(); 

  console.log(slug); 

  const collection = db.collection('products'); 

//   const results = await collection.findOne({ _id: new ObjectId(_id) }); // wait for the Promise to resolve
  const results = await collection.findOne( slug); 

  console.log(results); // logs the results of the database query

  return results
}



