import React, { useState } from "react";
import "./BusesBooking.css";
import { db, collection, addDoc } from "../firebaseConfig"; // Adjust path if needed


const BusesBooking = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [busType, setBusType] = useState("Sleeper");
  const [filteredBuses, setFilteredBuses] = useState([]);

  const [bookingDetails, setBookingDetails] = useState(null);
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [phone, setPhone] = useState("");
        const [showForm, setShowForm] = useState(false);
        const [confirmation, setConfirmation] = useState("");

  const buses = [
    // New Delhi to other cities
    { company: "Volvo Express", from: "New Delhi", to: "Mumbai", prices: { Sleeper: 800, AC: 1500 }, time: "6:00 AM", duration: "20h" },
    { company: "Red Bus", from: "New Delhi", to: "Mumbai", prices: { Sleeper: 850, AC: 1600 }, time: "8:00 PM", duration: "19h" },
    { company: "Intercity Travels", from: "New Delhi", to: "Mumbai", prices: { Sleeper: 900, AC: 1700 }, time: "10:00 AM", duration: "21h" },
  
    { company: "Express Line", from: "New Delhi", to: "Kolkata", prices: { Sleeper: 950, AC: 1800 }, time: "10:30 PM", duration: "24h" },
    { company: "East India Travels", from: "New Delhi", to: "Kolkata", prices: { Sleeper: 1000, AC: 1900 }, time: "7:30 PM", duration: "23h" },
  
    { company: "TSRTC", from: "New Delhi", to: "Hyderabad", prices: { Sleeper: 1100, AC: 2100 }, time: "9:00 AM", duration: "26h" },
    { company: "Orange Travels", from: "New Delhi", to: "Hyderabad", prices: { Sleeper: 1050, AC: 2000 }, time: "6:30 PM", duration: "25h" },
  
    { company: "Intercity Travels", from: "New Delhi", to: "Bangalore", prices: { Sleeper: 1200, AC: 2300 }, time: "10:00 PM", duration: "28h" },
    { company: "Royal Cruiser", from: "New Delhi", to: "Bangalore", prices: { Sleeper: 1250, AC: 2400 }, time: "11:30 PM", duration: "29h" },
  
    // Bangalore to other cities
    { company: "SRS Travels", from: "Bangalore", to: "Mumbai", prices: { Sleeper: 700, AC: 1400 }, time: "8:00 AM", duration: "16h" },
    { company: "VRL Travels", from: "Bangalore", to: "Mumbai", prices: { Sleeper: 750, AC: 1450 }, time: "9:00 PM", duration: "17h" },
  
    { company: "VRL Travels", from: "Bangalore", to: "Kolkata", prices: { Sleeper: 1200, AC: 2300 }, time: "6:00 PM", duration: "30h" },
    { company: "Eagle Travels", from: "Bangalore", to: "Kolkata", prices: { Sleeper: 1300, AC: 2500 }, time: "5:00 PM", duration: "32h" },
  
    { company: "GreenLine Express", from: "Bangalore", to: "Hyderabad", prices: { Sleeper: 600, AC: 1200 }, time: "9:30 AM", duration: "10h" },
    { company: "Kaveri Travels", from: "Bangalore", to: "Hyderabad", prices: { Sleeper: 650, AC: 1300 }, time: "8:45 PM", duration: "10h" },
  
    // Hyderabad to other cities
    { company: "Orange Travels", from: "Hyderabad", to: "Mumbai", prices: { Sleeper: 750, AC: 1400 }, time: "6:30 PM", duration: "14h" },
    { company: "Mahavat Travels", from: "Hyderabad", to: "Mumbai", prices: { Sleeper: 800, AC: 1500 }, time: "9:00 AM", duration: "15h" },
  
    { company: "TSRTC", from: "Hyderabad", to: "Kolkata", prices: { Sleeper: 1100, AC: 2100 }, time: "5:00 PM", duration: "26h" },
    { company: "Eagle Travels", from: "Hyderabad", to: "Kolkata", prices: { Sleeper: 1150, AC: 2200 }, time: "4:00 PM", duration: "27h" },
  
    { company: "Kaveri Travels", from: "Hyderabad", to: "Bangalore", prices: { Sleeper: 650, AC: 1300 }, time: "8:45 PM", duration: "10h" },
    { company: "VRL Travels", from: "Hyderabad", to: "Bangalore", prices: { Sleeper: 700, AC: 1400 }, time: "10:30 PM", duration: "11h" },
  
    // Kolkata to other cities
    { company: "Royal Cruiser", from: "Kolkata", to: "Mumbai", prices: { Sleeper: 1300, AC: 2500 }, time: "7:00 PM", duration: "30h" },
    { company: "Eagle Travels", from: "Kolkata", to: "Mumbai", prices: { Sleeper: 1350, AC: 2600 }, time: "6:00 PM", duration: "31h" },
  
    { company: "Eagle Travels", from: "Kolkata", to: "Hyderabad", prices: { Sleeper: 1200, AC: 2200 }, time: "9:30 AM", duration: "28h" },
    { company: "TSRTC", from: "Kolkata", to: "Hyderabad", prices: { Sleeper: 1250, AC: 2300 }, time: "10:00 PM", duration: "29h" },
  
    { company: "Shyamoli Express", from: "Kolkata", to: "Bangalore", prices: { Sleeper: 1250, AC: 2400 }, time: "10:00 PM", duration: "32h" },
    { company: "Mahavat Travels", from: "Kolkata", to: "Bangalore", prices: { Sleeper: 1300, AC: 2500 }, time: "8:30 PM", duration: "33h" },
  
    // Mumbai to other cities
    { company: "VRL Travels", from: "Mumbai", to: "Kolkata", prices: { Sleeper: 1300, AC: 2500 }, time: "7:00 PM", duration: "30h" },
    { company: "Royal Cruiser", from: "Mumbai", to: "Kolkata", prices: { Sleeper: 1350, AC: 2600 }, time: "5:00 PM", duration: "31h" },
  
    { company: "Mahavat Travels", from: "Mumbai", to: "Hyderabad", prices: { Sleeper: 850, AC: 1600 }, time: "5:30 PM", duration: "14h" },
    { company: "SRS Travels", from: "Mumbai", to: "Hyderabad", prices: { Sleeper: 900, AC: 1700 }, time: "9:00 AM", duration: "15h" },
  
    { company: "Paulo Travels", from: "Mumbai", to: "Bangalore", prices: { Sleeper: 900, AC: 1700 }, time: "10:30 PM", duration: "18h" },
    { company: "VRL Travels", from: "Mumbai", to: "Bangalore", prices: { Sleeper: 950, AC: 1800 }, time: "9:00 PM", duration: "19h" },
  ];
  

  // Search Function
  const searchBuses = () => {
    if (!from || !to || !departure) {
      alert("Please select From, To, and Departure date.");
      return;
    }

    if (from === to) {
      alert("From and To cities cannot be the same.");
      return;
    }
    const results = buses.filter((bus) => bus.from === from && bus.to === to);
    setFilteredBuses(results);
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
    const phoneRegex = /^[6-9]\d{9}$/; // Ensures 10-digit Indian number

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
        bus_company: bookingDetails.company,
        from_city: bookingDetails.from,
        to_city: bookingDetails.to,
        departure_date: departure,
        class_type: busType,
        price: bookingDetails.prices[busType],
        timestamp: new Date(),
    };

    try {
        await addDoc(collection(db, "bookings"), bookingData);
        alert(`Booking confirmed! A payment link has been sent to ${email}.`);
        setName("");
        setEmail("");
        setPhone("");
    } catch (error) {
        console.error("Error saving booking:", error);
        alert("An error occurred while booking. Please try again.");
    }
};


  return (
    <div className="buses_page">
      <div className="buses-booking-container">
        <h2>Book Your Bus</h2>
        <div className="booking-form">
          <label>From</label>
          <select value={from} onChange={(e) => setFrom(e.target.value)}>
            <option value="">Select City</option>
            <option>New Delhi</option>
            <option>Mumbai</option>
            <option>Bangalore</option>
            <option>Hyderabad</option>
            <option>Kolkata</option>
          </select>

          <label>To</label>
          <select value={to} onChange={(e) => setTo(e.target.value)}>
            <option value="">Select City</option>
            <option>Mumbai</option>
            <option>Kolkata</option>
            <option>Hyderabad</option>
            <option>Bangalore</option>
          </select>

          <label>Departure</label>
          <input type="date" value={departure} onChange={(e) => setDeparture(e.target.value)} 
           min={new Date().toISOString().split("T")[0]} />

          <label>Travellers & Class</label>
          <select value={travellers} onChange={(e) => setTravellers(e.target.value)}>
            <option>1 Traveller</option>
            <option>2 Travellers</option>
            <option>3 Travellers</option>
          </select>

          <select value={busType} onChange={(e) => setBusType(e.target.value)}>
            <option value="Sleeper">Sleeper</option>
            <option value="AC">AC</option>
          </select>

          <button className="search-button" onClick={searchBuses}>Search</button>
        </div>

        {/* Bus Results */}
        <div className="buses-results">
          <h3>Available Buses</h3>
          {filteredBuses.length > 0 ? (
            filteredBuses.map((bus, index) => (
              <div key={index} className="bus-option">
                <strong>{bus.company}</strong>
                <p>{bus.from} → {bus.to}</p>
                <p>Time: {bus.time} | Duration: {bus.duration}</p>
                <p>Class: {busType} | Price: ₹{bus.prices[busType]}</p>
                <button className="book-btn" onClick={() => handleBook(bus)}>Book</button>
              </div>
            ))
          ) : (
            <p>No buses found.</p>
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

export default BusesBooking;