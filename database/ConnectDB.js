import { MongoClient } from "mongodb";

const connectDB = async (URI) => {
  try {
    const client = new MongoClient(URI);
    console.log("Connecting to Database...");
    await client.connect();
    console.log("Database connected successfully !!!");
    return client;
  } catch (error) {
    console.log("Database error: ", error);
  }
};
export default connectDB;
