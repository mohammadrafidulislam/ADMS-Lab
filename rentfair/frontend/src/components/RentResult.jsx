// frontend/src/components/RentResult.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import RentChart from "./RentChart";

const formatTaka = (value) => `৳${Number(value).toLocaleString()}`;

export default function RentResult({ averageRent = 0, userRent = 0, location }) {
  const [chartData, setChartData] = useState([]);

  // Fetch last 12 months rent for the selected location
  useEffect(() => {
    if (!location) return;

    const fetchChartData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/rent/history/${location}`
        );
        // Backend should return an array: [{ month: "Jan", rent: 65000 }, ...]
        setChartData(res.data || []);
      } catch (error) {
        console.error("Failed to fetch rent history:", error);
        setChartData([]);
      }
    };

    fetchChartData();
  }, [location]);

  if (!averageRent) return null;

  const fairLow = Math.round(averageRent * 0.9);
  const fairHigh = Math.round(averageRent * 1.1);

  let status = "";
  let bgColor = "";
  let textColor = "";

  if (userRent < fairLow) {
    status = "Underpriced";
    bgColor = "#ecfdf5";
    textColor = "#047857";
  } else if (userRent > fairHigh) {
    status = "Overpriced";
    bgColor = "#fde8e8";
    textColor = "#dc2626";
  } else {
    status = "Fair Price";
    bgColor = "#fefce8";
    textColor = "#ca8a04";
  }

  return (
    <div>
      <div className="card" style={{ background: bgColor, marginBottom: "16px" }}>
        <h3 style={{ color: textColor }}>{status}</h3>
        <p>Your rent compared to the average rent in <b>{location}</b></p>
        <p><b>Your Rent:</b> {formatTaka(userRent)}</p>
      </div>

      <div className="grid-2">
        <div className="card">
          <p>Fair Range (Low)</p>
          <h2>{formatTaka(fairLow)}</h2>
        </div>
        <div className="card">
          <p>Fair Range (High)</p>
          <h2>{formatTaka(fairHigh)}</h2>
        </div>
        <div className="card" style={{ gridColumn: "1 / span 2", border: "2px solid #2563eb" }}>
          <p>Area Average</p>
          <h2 style={{ color: "#2563eb" }}>{formatTaka(averageRent)}</h2>
          
          {/* Pass dynamic chart data */}
          <div style={{ marginTop: "20px" }}>
            <RentChart data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}