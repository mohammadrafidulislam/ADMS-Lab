const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // No need for useNewUrlParser or useUnifiedTopology in Mongoose 7+
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;