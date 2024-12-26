import React, { useEffect } from "react";
import "./Home.css";
import Nav from "../../Components/Navigation/Nav";
import map from "./images/map.jpg";
import Footer from "../../Components/Footer/Footer";

function Home() {
  useEffect(() => {}, []);
  return (
    <div>
      <Nav />
      {/**Header Section  */}
      <header class="header">
        <div class="header-text">
          <h1>Start Your E-Visa Application Today!</h1>
          <p>
            Embark on your journey with ease using our streamlined E-Visa
            application system. <br />
            Enjoy secure uploads, real-time tracking, and a variety of visa
            options tailored to your needs.
          </p>

          <button class="apply-btn">Apply Now</button>
          <button class="learn-btn">Learn More</button>
        </div>
      </header>
      {/**About Section */}
      <section class="about">
        <div class="about-content">
          <div class="about-grid">
            <div class="about-text">
              <h1>
                Experience Seamless Visa Applications
                <br /> with Our Innovative E-Visa Solution
              </h1>
            </div>
            <div class="about-card-container">
              {/**Card 1 */}
              <div class="about-card">
                <i class="fa-solid fa-plane-circle-check"></i>
                <h3>Your Visa Journey Made Easy with Dark Horse</h3>
                <p>
                  Our platform ensures secure uploads, real-time tracking, and
                  multiple visa options
                </p>
                <button class="start-btn">Start &gt;</button>
              </div>
              {/**Card 2 */}
              <div class="about-card">
                <i class="fa-regular fa-compass"></i>
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
                <i class="fa-solid fa-earth-asia"></i>
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
      {/**start-apply Section */}
      <section class="start-application">
        <div class="application-grid">
          <div class="start-content">
            <h1>Start Your Visa Application Today</h1>
            <p>
              Experience a seamless and secure visa application process tailored
              just for you
            </p>
            <button class="apply2-btn">Apply Now</button>
            <button class="learn2-btn">Learn More</button>
          </div>
        </div>
      </section>
      {/*Contact Us*/}
      <section class="contact">
        <div class="contact-grid">
          <div class="contact-content">
            <div class="contact-head">
              <h1>Contact Us</h1>
              <p>We're here to assist you with any inquiries</p>
              <hr />
            </div>
            <div class="contact-card">
              <i class="fa-regular fa-envelope"></i>
              <h3>Email</h3>
              <p>support@darkhose.com</p>
            </div>
            <div class="contact-card">
              <i class="fa fa-phone"></i>
              <h3>Phone</h3>
              <p>+1 234 567 890</p>
            </div>
            <div class="contact-card">
              <i class="fa-solid fa-location-dot"></i>
              <h3>Address</h3>
              <p>123 Main Street, New York, NY 10001</p>
            </div>
          </div>
          <div class="map">
            <div class="img-container">
              <img src={map} alt="map" />
            </div>
          </div>
        </div>
      </section>
      {/*FAQ*/}
      <section class="faq">
        <div class="faq-content">
          <div class="faq-grid">
            <div class="faq-head">
              <h1>FAQs</h1>
              <p>
                Find answers to your questions about the visa application
                process below
              </p>
              {/**FAQ Card 1 */}
              <div class="faq-card">
                <h3>What is an E-Visa?</h3>
                <p>
                  An E-Visa is an electronic visa that allows travelers to apply
                  for a visa online. It simplifies the application process and
                  eliminates the need for physical paperwork. E-Visas are
                  typically processed faster than traditional visas.
                </p>
              </div>
              {/**FAQ Card 2 */}
              <div class="faq-card">
                <h3>How do I apply?</h3>
                <p>
                  To apply for an E-Visa, visit our application page and fill
                  out the required information. You'll need to upload necessary
                  documents and select your visa type. Once submitted, you can
                  track your application status in real-time.
                </p>
              </div>
              {/**FAQ Card 3 */}
              <div class="faq-card">
                <h3>Can I cancel my application?</h3>
                <p>
                  Processing times for E-Visas can vary depending on the visa
                  type and application volume. Generally, you can expect a
                  decision within a few business days. For urgent applications,
                  consider our expedited processing options.
                </p>
              </div>
              {/**FAQ Card 4 */}
              <div class="faq-card">
                <h3>What documents are needed?</h3>
                <p>
                  The required documents vary by visa type but generally include
                  a valid passport, a recent photo, and any additional
                  supporting documents. Ensure all documents are clear and
                  legible for a smooth application process. Check our guidelines
                  for specific requirements based on your visa type.
                </p>
              </div>
              {/**FAQ Card 5 */}
              <div class="faq-card">
                <h3>How long does it take?</h3>
                <p>
                  Processing times for E-Visas can vary depending on the visa
                  type and application volume. Generally, you can expect a
                  decision within a few business days. For urgent applications,
                  consider our expedited processing options.
                </p>
              </div>
              <div class="faq-question">
                <h2>Still have question?</h2>
                <p class="p-tag">
                  Reach out to our support team for assistance.
                </p>
                <button class="home-contact-btn">Contact</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/**Footer */}
      <Footer />
    </div>
  );
}

export default Home;
