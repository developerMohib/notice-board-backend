import app from "./app";
import { connectDB } from "./db/db";

const server = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection failed", error);
  }
};

server();

export default app;
