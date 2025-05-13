import React, { useState } from "react";
import { db } from "../firebaseConfig"; // Adjust path if needed
import { collection, addDoc } from "firebase/firestore";
import "./Hotels.css";

const Hotels = () => {
  const [city, setCity] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [filteredHotels, setFilteredHotels] = useState([]);

  const [bookingDetails, setBookingDetails] = useState(null);
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [phone, setPhone] = useState("");
        const [showForm, setShowForm] = useState(false);
        const [confirmation, setConfirmation] = useState("");

  // Hotel Data
  const hotels = [
    { name: "Taj Hotel", city: "Mumbai", price: 5000, rating: "5 Star" },
    { name: "The Oberoi", city: "Mumbai", price: 4500, rating: "5 Star" },
    { name: "Leela Palace", city: "Bangalore", price: 4000, rating: "5 Star" },
    { name: "ITC Gardenia", city: "Bangalore", price: 3800, rating: "5 Star" },
    { name: "The Park", city: "Kolkata", price: 3500, rating: "4 Star" },
    { name: "Hyatt Regency", city: "Hyderabad", price: 4200, rating: "5 Star" },
  ];

  // Search Function
  const searchHotels = () => {
    if (!city || !checkIn || !checkOut) {
      alert("Please select City, Check-in, and Check-out dates.");
      return;
    }
    const results = hotels.filter((hotel) => hotel.city === city);
    setFilteredHotels(results);
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
      hotel_name: bookingDetails.name,
      city: bookingDetails.city,
      check_in: checkIn,
      check_out: checkOut,
      guests,
      price: bookingDetails.price,
      timestamp: new Date(),
    };

    try {
      await addDoc(collection(db, "hotelBookings"), bookingData);
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
    <div className="hotel_page">
      <div className="hotel-booking-container">
        <h2>Book Your Hotel</h2>
        <div className="booking-form">
          <label>City</label>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Select City</option>
            <option>Mumbai</option>
            <option>Bangalore</option>
            <option>Kolkata</option>
            <option>Hyderabad</option>
          </select>

          <label>Check-in Date</label>
          <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} 
           min={new Date().toISOString().split("T")[0]} />

          <label>Check-out Date</label>
          <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} 
            min={checkIn || new Date().toISOString().split("T")[0]} />

          <label>Guests</label>
          <select value={guests} onChange={(e) => setGuests(e.target.value)}>
            <option>1 Guest</option>
            <option>2 Guests</option>
            <option>3 Guests</option>
          </select>

          <button className="search-button" onClick={searchHotels}>Search</button>
        </div>

        {/* Hotel Results */}
        <div className="hotel-results">
          <h3>Available Hotels</h3>
          {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel, index) => (
              <div key={index} className="hotel-option">
                <strong>{hotel.name}</strong>
                <p>{hotel.city}</p>
                <p>Rating: {hotel.rating}</p>
                <p>Price: ₹{hotel.price} per night</p>
                <button className="book-btn" onClick={() => handleBook(hotel)}>Book</button>
              </div>
            ))
          ) : (
            <p>No hotels found.</p>
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

export default Hotels;
