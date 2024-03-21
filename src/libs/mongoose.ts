require("dotenv").config();
import mongoose from 'mongoose'

mongoose.connection.once("open", () => {
  console.log("Database connection successfully established");
});

mongoose.connection.on("error", (e) => {
  console.log(`An error occurred while connecting ${e.message}`);
});
export async function connectDB() {
  console.log('Connecting to database...')
  await mongoose.connect(process.env.MONGO_URL as string);
}

export default mongoose
