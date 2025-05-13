import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className="home-container">
      {/* Navbar */}
      <div className="photo">
      <nav className="navbar">
        <h1 className="logo"><span className="pack">Pack</span><span className="ur-bags">UrBags</span></h1>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
      </nav>
      
      {/* Hero Section */}
      <section className="hero">
        <div className="overlay">
          <h2>Travel in style, explore with ease!</h2>
          <p><em>Find the best destinations for your vacations.</em></p>
        </div>
      </section>

      {/* Feature Boxes */}
      <section className="features">
      <div className="feature-box flight-box" onClick={() => navigate("/flight-booking")}>
          <img src="https://www.creativefabrica.com/wp-content/uploads/2023/06/15/Plane-take-off-icon-Flying-airplane-De-Graphics-72192754-1.png" alt="Flight" />
          <h3>Flight</h3>
        </div>
        <div className="feature-box" onClick={() => navigate("/tour-booking")}>
          <img src="https://img.favpng.com/8/20/20/travel-agent-trip-planner-logo-png-favpng-nv8XZCtyidNgppLumwd4bMkUL.jpg" alt="Tour Package" />
          <h3>Tour Package</h3>
        </div>
        <div className="feature-box" onClick={() => navigate("/hotel-booking")}>
          <img src="https://static.vecteezy.com/system/resources/previews/027/543/221/non_2x/hotel-logo-silhouette-hotel-icon-vector.jpg" alt="Hotels" />
          <h3>Hotels</h3>
        </div>
        <div className="feature-box" onClick={() => navigate("/train-booking")}>
  <img src="https://clipground.com/images/train-logo-png-2.jpg" alt="Train" />
  <h3>Train</h3>
</div>

        <div className="feature-box" onClick={() => navigate("/buses-booking")}>
          <img src="https://st.depositphotos.com/1041170/4626/v/950/depositphotos_46267611-stock-illustration-modern-bus-symbol-outlined-vector.jpg" alt="Buses" />
          <h3>Buses</h3>
        </div>
       
      </section>
      </div>
        {/* About Section */}
        <section id="about" className="section">
        <h2>About PackUrBags</h2>
        <p>Welcome to PackUrBags, your trusted travel companion! Whether you're planning a solo adventure, a family vacation, or a corporate trip, we are here to make your journey smooth, memorable, and hassle-free. Our mission is to redefine travel by offering a seamless and convenient experience for travelers of all kinds.</p>
        <p>At PackUrBags, we provide a comprehensive range of travel services, including flight bookings, hotel accommodations, train and bus reservations, and customized tour packages tailored to your preferences.</p>
        <p>We prioritize safety, convenience, and affordability. Our platform ensures secure transactions, real-time updates, and an extensive selection of accommodations and travel options worldwide.</p>
        <p>Beyond just bookings, PackUrBags offers expert travel guides, insider tips, and exclusive deals to enhance your travel experience. We believe that every journey should be enriching and inspiring, helping you create unforgettable memories.</p>
      </section>
    <div id="contact" className="section">
        <h2>Contact Us</h2>
        <p><b>Email:</b> support@packurbags.com</p>
        <p><b>Phone:</b> +1 234 567 890</p>
        <p><b>Address:</b> 123 Travel Street, Wanderlust City, 45678</p>
    </div>
    <div id="faq" className="section">
    <h2>Frequently Asked Questions</h2>
    
    <div class="faq-item">
        <h3>1. How can I book a flight?</h3>
        <p>You can book a flight by visiting our "Flights" section, selecting your destination, and proceeding with the payment.</p>
    </div>

    <div class="faq-item">
        <h3>2. What payment methods do you accept?</h3>
        <p>We accept credit/debit cards, PayPal, and net banking.</p>
    </div>

    <div class="faq-item">
        <h3>3. Can I cancel or reschedule my booking?</h3>
        <p>Yes, you can cancel or reschedule your booking from the "My Bookings" section. Cancellation charges may apply.</p>
    </div>

    <div class="faq-item">
        <h3>4. Do you offer travel insurance?</h3>
        <p>Yes, you can opt for travel insurance while booking your trip.</p>
    </div>
</div>
<footer>
        &copy; 2025 PackUrBags. All rights reserved.
    </footer>
    </div>
    </>
  );
};

export default Home;