import React from "react";
import { Link } from "react-router-dom";
import "../css/home.css";
import homeImage from "../images/3d-view-house-with-copy-space.jpg"


export default function Home() {
  return (
   <div id="Home">
    
      <div className="hero-section">
        <div className="row align-items-center gx-4">
          
          <div className="col-12 col-lg-6 mb-4 mb-lg-0">
            <div className="hero-text mx-4">
              <h1>Welcome to NextHome 🏠</h1>
              <h2>Your PG, Your Comfort</h2>
              <p>
                Discover safe, affordable, and fully verified PG accommodations.
                Whether you're a student or working professional, we help you
                find the perfect stay—fast and hassle-free.
              </p>

              <div className="hero-buttons">
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
                <Link to="/login" className="btn btn-outline-primary">
                  Login
                </Link>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6 text-center">
            <img
              src={homeImage}
              alt="PG Renting Illustration"
              className="hero-img"
            />
            
          </div>

        </div>
      </div>
    </div>
  );
}
