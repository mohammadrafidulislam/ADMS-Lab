// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const rentRoutes = require("./routes/rentRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

// API Routes
app.use("/api/rent", rentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));