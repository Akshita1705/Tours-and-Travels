import React, { useState } from "react";
import { db } from "../firebaseConfig"; // Ensure the correct Firebase path
import { collection, addDoc } from "firebase/firestore";
import "./TourPackages.css";

const TourPackages = () => {
  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [packageType, setPackageType] = useState("Standard");
  const [filteredPackages, setFilteredPackages] = useState([]);

  const [bookingDetails, setBookingDetails] = useState(null);
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [phone, setPhone] = useState("");
      const [showForm, setShowForm] = useState(false);
      const [confirmation, setConfirmation] = useState("");

  // Tour Package Data
  const tourPackages = [
    { name: "Goa Beach Escape", location: "Goa", prices: { Standard: 10000, Deluxe: 15000, Luxury: 20000 }, duration: "5 Days" },
    { name: "Royal Rajasthan", location: "Rajasthan", prices: { Standard: 12000, Deluxe: 18000, Luxury: 25000 }, duration: "7 Days" },
    { name: "Himalayan Adventure", location: "Manali", prices: { Standard: 8000, Deluxe: 13000, Luxury: 18000 }, duration: "6 Days" },
    { name: "Kerala Backwaters", location: "Kerala", prices: { Standard: 11000, Deluxe: 16000, Luxury: 22000 }, duration: "6 Days" },
    { name: "Golden Triangle", location: "Delhi-Agra-Jaipur", prices: { Standard: 13000, Deluxe: 20000, Luxury: 28000 }, duration: "5 Days" },
  ];

  // Search Function
  const searchPackages = () => {
    if (!destination || !departure) {
      alert("Please select Destination and Departure date.");
      return;
    }

    const results = tourPackages.filter((pkg) => pkg.location === destination);
    setFilteredPackages(results);
  };
  const handleBook = (flight) => {
    setBookingDetails(flight);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      alert("Please fill in all details.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/; // Ensures valid 10-digit number

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid phone number.");
      return;
    }
    const bookingData = {
      name,
      email,
      phone,
      destination: bookingDetails.location,
      package_name: bookingDetails.name,
      departure_date: departure,
      travellers,
      package_type: packageType,
      price: bookingDetails.prices[packageType],
      duration: bookingDetails.duration,
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, "tourBookings"), bookingData);
      alert(`Booking confirmed! A payment link has been sent to ${email}.`);
      setShowForm(false);
      setName("");
      setEmail("");
      setPhone("");
      setConfirmation("Booking successful!");
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("An error occurred while booking. Please try again.");
    }
  };

  return (
    <div className="tour_page">
      <div className="tour-booking-container">
        <h2>Book Your Tour Package</h2>
        <div className="booking-form">
          <label>Destination</label>
          <select value={destination} onChange={(e) => setDestination(e.target.value)}>
            <option value="">Select Destination</option>
            <option>Goa</option>
            <option>Rajasthan</option>
            <option>Manali</option>
            <option>Kerala</option>
            <option>Delhi-Agra-Jaipur</option>
          </select>

          <label>Departure Date</label>
          <input type="date" value={departure} onChange={(e) => setDeparture(e.target.value)} 
           min={new Date().toISOString().split("T")[0]} />

          <label>Travellers & Package Type</label>
          <select value={travellers} onChange={(e) => setTravellers(e.target.value)}>
            <option>1 Traveller</option>
            <option>2 Travellers</option>
            <option>3 Travellers</option>
          </select>

          <select value={packageType} onChange={(e) => setPackageType(e.target.value)}>
            <option value="Standard">Standard</option>
            <option value="Deluxe">Deluxe</option>
            <option value="Luxury">Luxury</option>
          </select>

          <button className="search-button" onClick={searchPackages}>Search</button>
        </div>

        {/* Package Results */}
        <div className="tour-results">
          <h3>Available Packages</h3>
          {filteredPackages.length > 0 ? (
            filteredPackages.map((pkg, index) => (
              <div key={index} className="tour-option">
                <strong>{pkg.name}</strong>
                <p>Location: {pkg.location}</p>
                <p>Duration: {pkg.duration}</p>
                <p>Package: {packageType} | Price: ₹{pkg.prices[packageType]}</p>
                <button className="book-btn" onClick={() => handleBook(pkg)}>Book</button>
              </div>
            ))
          ) : (
            <p>No packages found.</p>
          )}
        </div>
      </div>
      {bookingDetails && (
        <div className="user-form">
          <h3>Enter Your Details</h3>
          <form onSubmit={handleSubmit}>
              <label>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

              <label>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

              <label>Phone</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />

              <button type="submit" className="confirm-btn">Confirm Booking</button>
            </form>
        </div>
      )}

      {confirmation && <p className="confirmation-message">{confirmation}</p>}
    </div>
  );
};

export default TourPackages;
