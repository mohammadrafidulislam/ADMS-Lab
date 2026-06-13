// frontend/src/App.jsx
import { useState } from "react";
import axios from "axios";

import Header from "./components/Header";
import Hero from "./components/Hero";
import PropertyDetails from "./components/PropertyDetails";
import RentResult from "./components/RentResult";
import Footer from "./components/Footer";

function App() {
  const [averageRent, setAverageRent] = useState(0); // fixed initialization
  const [selectedLocation, setSelectedLocation] = useState("Dhanmondi");
  const [userRent, setUserRent] = useState(0);
  const [rentHistory, setRentHistory] = useState([]); // new state for chart data

  const handleCheck = async (propertyData) => {
    if (!propertyData.location || !propertyData.rent) {
      alert("Please enter your rent");
      return;
    }

    setSelectedLocation(propertyData.location);
    setUserRent(Number(propertyData.rent));

    try {
      // Fetch average rent
      const resAvg = await axios.get(
        `http://localhost:5000/api/rent/average/${propertyData.location}`
      );
      setAverageRent(resAvg.data?.avgRent || 0);

      // Fetch 12-month rent history for chart
      const resHistory = await axios.get(
        `http://localhost:5000/api/rent/history/${propertyData.location}`
      );
      setRentHistory(resHistory.data || []);
    } catch (error) {
      console.error("Failed to fetch rent data:", error);
      setAverageRent(0);
      setRentHistory([]);
    }
  };

  return (
    <>
      <Header />
      <Hero />

      <div className="container grid-2">
        <PropertyDetails onCheck={handleCheck} />
        <RentResult
          averageRent={averageRent}
          userRent={userRent}
          location={selectedLocation}
          chartData={rentHistory} // pass chart data here
        />
      </div>

      <Footer />
    </>
  );
}

export default App;