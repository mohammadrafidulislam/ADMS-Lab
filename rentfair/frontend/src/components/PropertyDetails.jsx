import { useState } from "react";

export default function PropertyDetails({ onCheck }) {
  const [location, setLocation] = useState("Dhanmondi");
  const [rent, setRent] = useState("");
  const [size, setSize] = useState("");
  const [rooms, setRooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [floor, setFloor] = useState("");
  const [lift, setLift] = useState("Yes");
  const [parking, setParking] = useState("Yes");

  const handleSubmit = () => {
    if (!rent) {
      alert("Please enter your rent!");
      return;
    }
    onCheck({ location, rent, size, rooms, bathrooms, floor, lift, parking });
  };

  return (
    <div className="card">
      <h3>Property Details</h3>

      <label>Location</label>
      <select value={location} onChange={(e) => setLocation(e.target.value)}>
        <option>Dhanmondi</option>
        <option>Mirpur</option>
        <option>Uttara</option>
        <option>Gulshan</option>
        <option>Banani</option>
        <option>Chattogram</option>
        <option>Sylhet</option>
      </select>

      <label>Monthly Rent (BDT)</label>
      <input type="number" value={rent} onChange={(e) => setRent(e.target.value)} />

      <label>Size (sqft)</label>
      <input type="number" value={size} onChange={(e) => setSize(e.target.value)} />

      <label>Rooms</label>
      <input type="number" value={rooms} onChange={(e) => setRooms(e.target.value)} />

      <label>Bathrooms</label>
      <input type="number" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />

      <label>Floor</label>
      <input type="number" value={floor} onChange={(e) => setFloor(e.target.value)} />

      <label>Lift</label>
      <select value={lift} onChange={(e) => setLift(e.target.value)}>
        <option>Yes</option>
        <option>No</option>
      </select>

      <label>Parking</label>
      <select value={parking} onChange={(e) => setParking(e.target.value)}>
        <option>Yes</option>
        <option>No</option>
      </select>

      <button
        className="primary-btn"
        style={{ marginTop: "16px", width: "100%" }}
        onClick={handleSubmit}
      >
        Check Fair Rent
      </button>
    </div>
  );
}