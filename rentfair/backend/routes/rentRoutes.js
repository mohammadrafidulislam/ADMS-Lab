 // backend/routes/rentRoutes.js
const express = require("express");
const router = express.Router();
const AreaRent = require("../models/AreaRent");

// ✅ POST - Create new rent entry (ADD THIS)
router.post("/", async (req, res) => {
  try {
    console.log("Received POST data:", req.body);
    
    const newRent = new AreaRent(req.body);
    await newRent.save();
    
    res.status(201).json({
      success: true,
      message: "Rent data saved successfully",
      data: newRent
    });
  } catch (error) {
    console.error("Error saving rent:", error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// GET average rent for a location
router.get("/average/:location", async (req, res) => {
  try {
    const rents = await AreaRent.find({ location: req.params.location });
    const avgRent =
      rents.reduce((sum, r) => sum + r.rent, 0) / (rents.length || 1);
    res.json({ avgRent: Math.round(avgRent) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ avgRent: 0 });
  }
});

// GET last 12 months rent history for chart
router.get("/history/:location", async (req, res) => {
  try {
    const rents = await AreaRent.find({ location: req.params.location })
      .sort({ createdAt: 1 })
      .limit(12);

    const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const history = rents.map(r => {
      const date = new Date(r.createdAt);
      const month = monthNames[date.getMonth()];
      return { month, rent: r.rent };
    });

    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json([]);
  }
});

module.exports = router;