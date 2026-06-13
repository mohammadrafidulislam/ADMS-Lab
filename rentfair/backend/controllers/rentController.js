// backend/controllers/rentController.js
const AreaRent = require("../models/AreaRent");

// Get average rent for a location
const getAverageRent = async (req, res) => {
  try {
    const { location } = req.params;
    const rents = await AreaRent.find({ location });
    if (!rents.length) return res.json({ avgRent: 0 });

    const total = rents.reduce((sum, item) => sum + item.rent, 0);
    const avgRent = Math.round(total / rents.length);
    res.json({ avgRent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ avgRent: 0 });
  }
};

// Get last 12 months rent history for a location
const getRentHistory = async (req, res) => {
  try {
    const { location } = req.params;
    // Sort by createdAt descending, limit 12 months
    const rents = await AreaRent.find({ location })
      .sort({ createdAt: -1 })
      .limit(12);

    // Prepare data in ascending order (oldest first)
    const data = rents
      .map((item) => ({
        month: new Date(item.createdAt).toLocaleString("default", { month: "short" }),
        avgRent: item.rent,
      }))
      .reverse(); // oldest first

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json([]);
  }
};

module.exports = { getAverageRent, getRentHistory };