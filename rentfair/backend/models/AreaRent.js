const mongoose = require("mongoose");

const areaRentSchema = new mongoose.Schema({
  location: { type: String, required: true },
  rent: { type: Number, required: true },
  size: Number,
  rooms: Number,
  bathrooms: Number,
  floor: Number,
  lift: String,
  parking: String,
  createdAt: { type: Date, default: Date.now },
});

// Explicitly specify the collection name in MongoDB
module.exports = mongoose.model("AreaRent", areaRentSchema, "area_rents");