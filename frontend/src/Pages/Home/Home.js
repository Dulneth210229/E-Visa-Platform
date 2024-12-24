import React from "react";
import "./Home.css";
import Nav from "../../Components/Navigation/Nav";

function Home() {
  return (
    <div>
      <Nav />
      {/**Header Section  */}
      <header class="header">
        <div class="header-text">
          <h1>Start Your E-Visa Application Today!</h1>
          <p>
            Embark on your journey with ease using our streamlined E-Visa
            application system. Enjoy secure uploads, real-time tracking, and a
            variety of visa options tailored to your needs.
          </p>
        </div>
        <button class="apply-btn">Apply Now</button>
        <button class="learn-btn">Learn More</button>
      </header>
      {/**About Section */}
      <section class="about">
        <div class="about-content">
          <div class="about-text">
            <h1>
              Experience Seamless Visa Applications with Our Innovative E-Visa
              Solution
            </h1>
            <div class="about-card-container">
              {/**Card 1 */}
              <div class="about-card">
                <i class="fa fa-plane"></i>
                <h3>Your Visa Journey Made Easy with Dark Horse</h3>
                <p>
                  Our platform ensures secure uploads, real-time tracking, and
                  multiple visa options
                </p>
                <button class="start-btn">Start &gt;</button>
              </div>
              {/**Card 2 */}
              <div class="about-card">
                <i class="fa fa-compass"></i>
                <h3>
                  Track Your Application Status Anytime, Anywhere with Real-Time
                  Updates
                </h3>
                <p>
                  Stay informed with our intuitive tracking system that updates
                  you instantly.
                </p>
                <button class="track-btn">Track &gt;</button>
              </div>
              {/**Card 3 */}
              <div class="about-card">
                <i class="fa fa-globe"></i>
                <h3>Choose From Various Visa Types Tailored to Your Needs</h3>
                <p>
                  Select the visa that fits your travel plans with ease and
                  confidence.
                </p>
                <button class="explore-btn">Explore &gt;</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
