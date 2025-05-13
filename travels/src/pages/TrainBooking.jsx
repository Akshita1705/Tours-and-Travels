import React, { useState } from "react";
import { db, collection, addDoc } from "../firebaseConfig";
import "./TrainBooking.css";

const TrainBooking = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departure, setDeparture] = useState("");
  const [travellers, setTravellers] = useState(1);
  const [classType, setClassType] = useState("Sleeper");
  const [filteredTrains, setFilteredTrains] = useState([]);

  const [bookingDetails, setBookingDetails] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [confirmation, setConfirmation] = useState("");
  

  // Train Data
  const trains = [
    // New Delhi to Mumbai
    { company: "Rajdhani Express", from: "New Delhi", to: "Mumbai", prices: { Sleeper: 1200, AC3: 2500, AC2: 3500 }, time: "6:00 AM", duration: "15h" },
    { company: "Shatabdi Express", from: "New Delhi", to: "Mumbai", prices: { Sleeper: 1300, AC3: 2700, AC2: 3700 }, time: "8:00 AM", duration: "14h 30m" },
    { company: "Duronto Express", from: "New Delhi", to: "Mumbai", prices: { Sleeper: 1400, AC3: 2800, AC2: 3800 }, time: "9:00 PM", duration: "15h 45m" },
  
    // New Delhi to Kolkata
    { company: "Howrah Rajdhani", from: "New Delhi", to: "Kolkata", prices: { Sleeper: 1100, AC3: 2400, AC2: 3400 }, time: "7:00 AM", duration: "17h" },
    { company: "Sealdah Duronto", from: "New Delhi", to: "Kolkata", prices: { Sleeper: 1150, AC3: 2500, AC2: 3500 }, time: "9:30 AM", duration: "16h 30m" },
    { company: "Humsafar Express", from: "New Delhi", to: "Kolkata", prices: { Sleeper: 1200, AC3: 2600, AC2: 3600 }, time: "8:45 PM", duration: "18h" },
  
    // New Delhi to Hyderabad
    { company: "Telangana Express", from: "New Delhi", to: "Hyderabad", prices: { Sleeper: 1000, AC3: 2200, AC2: 3200 }, time: "5:30 AM", duration: "20h" },
    { company: "Dakshin Express", from: "New Delhi", to: "Hyderabad", prices: { Sleeper: 1050, AC3: 2300, AC2: 3300 }, time: "6:45 PM", duration: "19h 30m" },
    { company: "AP Express", from: "New Delhi", to: "Hyderabad", prices: { Sleeper: 1100, AC3: 2400, AC2: 3400 }, time: "10:00 PM", duration: "21h" },
  
    // Bangalore to Mumbai
    { company: "Udyan Express", from: "Bangalore", to: "Mumbai", prices: { Sleeper: 900, AC3: 2000, AC2: 3000 }, time: "6:30 AM", duration: "16h" },
    { company: "Chalukya Express", from: "Bangalore", to: "Mumbai", prices: { Sleeper: 950, AC3: 2100, AC2: 3100 }, time: "5:00 PM", duration: "17h" },
    { company: "Karnataka Express", from: "Bangalore", to: "Mumbai", prices: { Sleeper: 1000, AC3: 2200, AC2: 3200 }, time: "9:15 PM", duration: "15h 30m" },
  
    // Bangalore to Kolkata
    { company: "Duronto Express", from: "Bangalore", to: "Kolkata", prices: { Sleeper: 1200, AC3: 2500, AC2: 3500 }, time: "6:00 AM", duration: "30h" },
    { company: "Humsafar Express", from: "Bangalore", to: "Kolkata", prices: { Sleeper: 1250, AC3: 2600, AC2: 3600 }, time: "7:00 PM", duration: "31h 15m" },
    { company: "Howrah Express", from: "Bangalore", to: "Kolkata", prices: { Sleeper: 1300, AC3: 2700, AC2: 3700 }, time: "10:30 PM", duration: "29h 45m" },
  
    // Bangalore to Hyderabad
    { company: "Garib Rath Express", from: "Bangalore", to: "Hyderabad", prices: { Sleeper: 900, AC3: 1900, AC2: 2900 }, time: "9:00 AM", duration: "10h" },
    { company: "Kacheguda Express", from: "Bangalore", to: "Hyderabad", prices: { Sleeper: 950, AC3: 2000, AC2: 3000 }, time: "7:00 PM", duration: "9h 30m" },
    { company: "Rayalaseema Express", from: "Bangalore", to: "Hyderabad", prices: { Sleeper: 1000, AC3: 2100, AC2: 3100 }, time: "11:30 PM", duration: "10h 15m" },
  
    // Mumbai to Kolkata
    { company: "Duronto Express", from: "Mumbai", to: "Kolkata", prices: { Sleeper: 1400, AC3: 2800, AC2: 3800 }, time: "7:30 PM", duration: "17h" },
    { company: "Gitanjali Express", from: "Mumbai", to: "Kolkata", prices: { Sleeper: 1450, AC3: 2900, AC2: 3900 }, time: "5:00 AM", duration: "26h" },
    { company: "Howrah Mail", from: "Mumbai", to: "Kolkata", prices: { Sleeper: 1500, AC3: 3000, AC2: 4000 }, time: "9:00 PM", duration: "25h 30m" },
  
    // Mumbai to Hyderabad
    { company: "Konark Express", from: "Mumbai", to: "Hyderabad", prices: { Sleeper: 950, AC3: 2000, AC2: 3000 }, time: "6:45 AM", duration: "14h" },
    { company: "Devagiri Express", from: "Mumbai", to: "Hyderabad", prices: { Sleeper: 1000, AC3: 2100, AC2: 3100 }, time: "8:00 PM", duration: "12h 30m" },
    { company: "LTT-HYB Express", from: "Mumbai", to: "Hyderabad", prices: { Sleeper: 1050, AC3: 2200, AC2: 3200 }, time: "11:15 PM", duration: "13h" },
  
    // Kolkata to Hyderabad
    { company: "Falaknuma Express", from: "Kolkata", to: "Hyderabad", prices: { Sleeper: 1100, AC3: 2300, AC2: 3300 }, time: "4:00 AM", duration: "26h" },
    { company: "East Coast Express", from: "Kolkata", to: "Hyderabad", prices: { Sleeper: 1150, AC3: 2400, AC2: 3400 }, time: "6:45 PM", duration: "25h 30m" },
    { company: "Humsafar Express", from: "Kolkata", to: "Hyderabad", prices: { Sleeper: 1200, AC3: 2500, AC2: 3500 }, time: "10:30 PM", duration: "24h 45m" },
  ];
  

  // Search Function
  const searchTrains = () => {
    if (!from || !to || !departure) {
      alert("Please select From, To, and Departure date.");
      return;
    }

    if (from === to) {
      alert("From and To cities cannot be the same.");
      return;
    }
    const results = trains.filter((train) => train.from === from && train.to === to);
    setFilteredTrains(results);
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
    const phoneRegex = /^[6-9]\d{9}$/; // Valid 10-digit number

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
      from,
      to,
      departure_date: departure,
      travellers,
      classType,
      train_name: bookingDetails.company,
      price: bookingDetails.prices[classType],
      duration: bookingDetails.duration,
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, "trainBookings"), bookingData);
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
    <div className="train_page">
      <div className="train-booking-container">
        <h2>Book Your Train</h2>
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
           min={new Date().toISOString().split("T")[0]}  />

          <label>Travellers & Class</label>
          <select value={travellers} onChange={(e) => setTravellers(e.target.value)}>
            <option>1 Traveller</option>
            <option>2 Travellers</option>
            <option>3 Travellers</option>
          </select>

          <select value={classType} onChange={(e) => setClassType(e.target.value)}>
            <option value="Sleeper">Sleeper</option>
            <option value="AC3">AC 3 Tier</option>
            <option value="AC2">AC 2 Tier</option>
          </select>

          <button className="search-button" onClick={searchTrains}>Search</button>
        </div>

        {/* Train Results */}
        <div className="train-results">
          <h3>Available Trains</h3>
          {filteredTrains.length > 0 ? (
            filteredTrains.map((train, index) => (
              <div key={index} className="train-option">
                <strong>{train.company}</strong>
                <p>{train.from} → {train.to}</p>
                <p>Time: {train.time} | Duration: {train.duration}</p>
                <p>Class: {classType} | Price: ₹{train.prices[classType]}</p>
                <button className="book-btn" onClick={() => handleBook(train)}>Book</button>
              </div>
            ))
          ) : (
            <p>No trains found.</p>
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

export default TrainBooking;