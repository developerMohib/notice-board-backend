import app from "./app";
import config from "./config";
import { connectDB } from "./db/db";
import { initCronJobs } from "./utils/cronJob";

const server = async () => {
  try {
    await connectDB();
    console.log("MongoDB connected");
     app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
    initCronJobs();
  } catch (error) {
    console.error("DB connection failed", error);
  }
};

server();

export default app;
