import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("You must provide Mongodb Connection String");
}

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("DATABASE CONNECT SUCCESSFULLY😊");
  } catch (error) {
    console.log("DATABASE CONNECTION FAILED!!!🥺 :", error);
  }
};

export default dbConnect;
