// frontend/src/components/RentChart.jsx
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

export default function RentChart({ location }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!location) return;

    const fetchRentHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/rent/history/${location}`
        );
        // res.data should be an array of { month: "Jan", avgRent: 65000 }
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch rent history:", err);
        setData([]);
      }
    };

    fetchRentHistory();
  }, [location]);

  if (!data.length) return null;

  const formatTaka = (value) => `৳${Number(value).toLocaleString()}`;

  return (
    <div style={{ width: "100%", height: 250 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(v) => formatTaka(v)} />
          <Line
            type="monotone"
            dataKey="avgRent"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}