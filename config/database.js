const mongoose = require("mongoose");

const connectToDatabase = async () => {
  const databaseUrl = process.env.DB_PATH;

  if (!databaseUrl) {
    throw new Error("DB_PATH is not configured");
  }

  await mongoose.connect(databaseUrl);
  // console.log("Database connected");
};

module.exports = connectToDatabase;

