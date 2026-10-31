import { MongoClient } from "mongodb";

let dbInstance = null;

const connectDB = async (URI) => {
  if (dbInstance) {
    return dbInstance;
  }

  try {
    // making new object for db
    const client = new MongoClient(URI);
    console.log("Connecting to Database...");
    // connecting to cloud db
    await client.connect();
    // connecting to particular db
    dbInstance = client.db("store_v1");
    console.log("Database connected successfully !!!");
    return dbInstance;
  } catch (error) {
    console.log("Database error: ", error);
    process.exit(1);
  }
};

const getCollection = (collectionName) => {
  if (!dbInstance) {
    throw new Error("Database not initialized !!!");
  }

  return dbInstance.collection(collectionName);
};

export { connectDB, getCollection };
