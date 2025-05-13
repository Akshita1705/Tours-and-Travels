import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import FlightBooking from "./pages/FlightBooking.jsx";
import TrainBooking from "./pages/TrainBooking.jsx";
import TourPackages from "./pages/TourPackages.jsx";
import Hotels from "./pages/Hotels.jsx";
import BusesBooking from "./pages/BusesBooking.jsx";
function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flight-booking" element={<FlightBooking />} />
        <Route path="/train-booking" element={<TrainBooking />} />
        <Route path="/tour-booking" element={<TourPackages/>} />
        <Route path="/hotel-booking" element={<Hotels/>} />
        <Route path="/buses-booking" element={<BusesBooking/>} />
      </Routes>

  );
}

export default App;

