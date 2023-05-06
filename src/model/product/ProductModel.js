
// import { connectToDatabase } from '../../configDb/ConfigDb.js'

import { connectToDatabase } from "../../configDb/ConfigDb.js";

 
// export const getAllProduct = async () => {

//     const db = await connectToDatabase();
 
//     const collection = await db.collection('products');
  
//  return await collection.find()
   
// }


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

export const getSingleProduct = async({_id})=>  {
  const db = await connectToDatabase(); // db is a Promise that resolves to the collection

  console.log(db); // logs "Promise { <pending> }"

  const collection = db.collection('products');  //   return collection; // return the collection

  const results = collection.findOne(_id) // wait for the Promise to resolve

  console.log(results); // logs the results of the database query

  return results
}



// export const getSingleProduct = () => {
//     return 
// }