import { connectToDatabase } from "../../configDb/ConfigDb.js";

//get all products 

export const getAllCategory = async()=>  {
    const db = await connectToDatabase(); // db is a Promise that resolves to the collection
  
    console.log(db); // logs "Promise { <pending> }"
  
    const collection = db.collection('categories');  //   return collection; // return the collection
  
    const results = collection.find({}).toArray(); // wait for the Promise to resolve
  
    console.log(results); // logs the results of the database query
    
    return results
  }