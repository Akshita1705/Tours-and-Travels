import React, { useState } from "react";
import "./FlightBooking.css";
import { db, collection, addDoc } from "../firebaseConfig"; // Adjust path if needed


const FlightBooking = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [classType, setClassType] = useState("Economy");
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [confirmation, setConfirmation] = useState("");


  // Flight Data with Three Flights for Each Route
  const flights = [
    // New Delhi → New York
    { company: "IndiGo", from: "New Delhi", to: "New York", prices: { Economy: 45000, Business: 75000, FirstClass: 120000 }, time: "10:00 AM", duration: "15h" },
    { company: "Air India", from: "New Delhi", to: "New York", prices: { Economy: 47000, Business: 77000, FirstClass: 125000 }, time: "2:00 PM", duration: "16h" },
    { company: "Emirates", from: "New Delhi", to: "New York", prices: { Economy: 49000, Business: 80000, FirstClass: 130000 }, time: "6:00 PM", duration: "15h 30m" },
  
    // Mumbai → London
    { company: "Vistara", from: "Mumbai", to: "London", prices: { Economy: 50000, Business: 85000, FirstClass: 130000 }, time: "11:30 AM", duration: "10h" },
    { company: "British Airways", from: "Mumbai", to: "London", prices: { Economy: 52000, Business: 87000, FirstClass: 135000 }, time: "3:00 PM", duration: "10h 30m" },
    { company: "Lufthansa", from: "Mumbai", to: "London", prices: { Economy: 54000, Business: 89000, FirstClass: 140000 }, time: "8:00 PM", duration: "9h 45m" },
  
    // New Delhi → Dubai
    { company: "Emirates", from: "New Delhi", to: "Dubai", prices: { Economy: 25000, Business: 50000, FirstClass: 85000 }, time: "9:00 AM", duration: "4h" },
    { company: "Air India", from: "New Delhi", to: "Dubai", prices: { Economy: 27000, Business: 52000, FirstClass: 90000 }, time: "1:00 PM", duration: "4h 30m" },
    { company: "Qatar Airways", from: "New Delhi", to: "Dubai", prices: { Economy: 29000, Business: 55000, FirstClass: 95000 }, time: "6:00 PM", duration: "4h 15m" },
  
    // New Delhi → London
    { company: "Air India", from: "New Delhi", to: "London", prices: { Economy: 55000, Business: 90000, FirstClass: 140000 }, time: "8:00 AM", duration: "9h 30m" },
    { company: "British Airways", from: "New Delhi", to: "London", prices: { Economy: 57000, Business: 92000, FirstClass: 145000 }, time: "12:00 PM", duration: "9h 45m" },
    { company: "Vistara", from: "New Delhi", to: "London", prices: { Economy: 59000, Business: 95000, FirstClass: 150000 }, time: "5:00 PM", duration: "10h" },
  
    // Mumbai → Dubai
    { company: "Emirates", from: "Mumbai", to: "Dubai", prices: { Economy: 24000, Business: 48000, FirstClass: 80000 }, time: "7:00 AM", duration: "3h 50m" },
    { company: "Qatar Airways", from: "Mumbai", to: "Dubai", prices: { Economy: 26000, Business: 51000, FirstClass: 85000 }, time: "12:00 PM", duration: "4h" },
    { company: "Etihad Airways", from: "Mumbai", to: "Dubai", prices: { Economy: 28000, Business: 53000, FirstClass: 90000 }, time: "6:00 PM", duration: "4h 10m" },
  
    // Mumbai → New York
    { company: "Air India", from: "Mumbai", to: "New York", prices: { Economy: 65000, Business: 110000, FirstClass: 180000 }, time: "9:00 AM", duration: "16h" },
    { company: "Emirates", from: "Mumbai", to: "New York", prices: { Economy: 68000, Business: 115000, FirstClass: 185000 }, time: "3:00 PM", duration: "16h 30m" },
    { company: "United Airlines", from: "Mumbai", to: "New York", prices: { Economy: 70000, Business: 120000, FirstClass: 190000 }, time: "9:00 PM", duration: "17h" },
  
    // Bangalore → New York
    { company: "Air India", from: "Bangalore", to: "New York", prices: { Economy: 70000, Business: 125000, FirstClass: 200000 }, time: "8:00 AM", duration: "18h" },
    { company: "Emirates", from: "Bangalore", to: "New York", prices: { Economy: 73000, Business: 130000, FirstClass: 210000 }, time: "2:00 PM", duration: "18h 30m" },
    { company: "Qatar Airways", from: "Bangalore", to: "New York", prices: { Economy: 75000, Business: 135000, FirstClass: 215000 }, time: "8:00 PM", duration: "19h" },
  
    // Bangalore → London
    { company: "British Airways", from: "Bangalore", to: "London", prices: { Economy: 55000, Business: 95000, FirstClass: 145000 }, time: "7:00 AM", duration: "10h" },
    { company: "Vistara", from: "Bangalore", to: "London", prices: { Economy: 57000, Business: 97000, FirstClass: 150000 }, time: "1:00 PM", duration: "10h 30m" },
    { company: "Lufthansa", from: "Bangalore", to: "London", prices: { Economy: 59000, Business: 100000, FirstClass: 155000 }, time: "7:00 PM", duration: "11h" },
  
    // Bangalore → Dubai
    { company: "Qatar Airways", from: "Bangalore", to: "Dubai", prices: { Economy: 30000, Business: 55000, FirstClass: 90000 }, time: "2:00 PM", duration: "6h" },
    { company: "Etihad Airways", from: "Bangalore", to: "Dubai", prices: { Economy: 32000, Business: 57000, FirstClass: 95000 }, time: "5:00 PM", duration: "5h 30m" },
    { company: "Emirates", from: "Bangalore", to: "Dubai", prices: { Economy: 34000, Business: 60000, FirstClass: 100000 }, time: "9:00 PM", duration: "5h" },
  ];
  

  // Search Function
  const searchFlights = () => {
    if (!from || !to || !departure) {
      alert("Please select From, To, and Departure date.");
      return;
    }

    const results = flights.filter((flight) => flight.from === from && flight.to === to);
    setFilteredFlights(results);
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
        airline: bookingDetails.company,
        from_city: bookingDetails.from,
        to_city: bookingDetails.to,
        departure_date: departure,
        class_type: classType,
        price: bookingDetails.prices[classType],
        timestamp: new Date(),
    };

    try {
        await addDoc(collection(db, "flightBookings"), bookingData);
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
    <div className="flight_page">
    <div className="flight-booking-container">
      <h2>Book Your Flight</h2>                                                                
      <div className="booking-form">
        <label>From</label>
        <select value={from} onChange={(e) => setFrom(e.target.value)}>
          <option value="">Select City</option>
          <option>New Delhi</option>
          <option>Mumbai</option>
          <option>Bangalore</option>
        </select>

        <label>To</label>
        <select value={to} onChange={(e) => setTo(e.target.value)}>
          <option value="">Select City</option>
          <option>New York</option>
          <option>London</option>
          <option>Dubai</option>
        </select>

        <label>Departure</label>
<input 
  type="date" 
  value={departure} 
  onChange={(e) => setDeparture(e.target.value)} 
  min={new Date().toISOString().split("T")[0]} // Sets min to today's date
/>


        <label>Travellers & Class</label>
        <select value={travellers} onChange={(e) => setTravellers(e.target.value)}>
          <option>1 Traveller</option>
          <option>2 Travellers</option>
          <option>3 Travellers</option>
        </select>

        <select value={classType} onChange={(e) => setClassType(e.target.value)}>
          <option value="Economy">Economy</option>
          <option value="Business">Business</option>
          <option value="FirstClass">First Class</option>
        </select>

        <button className="search-button" onClick={searchFlights}>Search</button>
      </div>

      {/* Flight Results */}
      <div className="flight-results">
        <h3>Available Flights</h3>
        {filteredFlights.length > 0 ? (
          filteredFlights.map((flight, index) => (
            <div key={index} className="flight-option">
              <strong>{flight.company}</strong>
              <p>{flight.from} → {flight.to}</p>
              <p>Time: {flight.time} | Duration: {flight.duration}</p>
              <p>Class: {classType} | Price: ₹{flight.prices[classType]}</p>
              <button className="book-btn" onClick={() => handleBook(flight)}>Book</button>
            </div>
          ))
        ) : (
          <p>No flights found.</p>
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

export default FlightBooking;
