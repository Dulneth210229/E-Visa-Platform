import React from "react";
import { useState } from "react"; // Import useState
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./AddVisa.css";
import Nav from "../../../Components/Navigation/Nav";
import Footer from "../../../Components/Footer/Footer";

function AddVisa() {
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    DOB: "",
    email: "",
    phoneNumber: "",
    country: "",
    address: "",
    postalCode: "",
    visaType: "",
    visaDuration: "",
    purpose: "",
    paymentAmount: "",
    paymentStatus: "",
    visaStatus: "",
    passportCopy: null,
    birthCertificate: null,
    policeCertificate: null,
  });
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const calculateVisaFee = () => {
    const duration = parseInt(formData.visaDuration, 10);
    if (!isNaN(duration)) {
      return duration * 10; // $10 per month
    }
    return 0; // Default fee if duration is invalid or empty
  };

  const handleNext = () => {
    // Validation logic for the current section
    // if (
    //   currentSection === 1 &&
    //   (!formData.firstName ||
    //     !formData.lastName ||
    //     !formData.DOB ||
    //     !formData.email ||
    //     !formData.phoneNumber ||
    //     !formData.country ||
    //     !formData.address ||
    //     !formData.postalCode)
    // ) {
    //   alert("Please fill all required fields in this section.");
    //   return;
    // }
    // if (
    //   currentSection === 2 &&
    //   (!formData.visaType || !formData.visaDuration || !formData.purpose)
    // ) {
    //   alert("Please fill all required fields in this section.");
    //   return;
    // }
    setCurrentSection(currentSection + 1);
  };

  const handlePrevious = () => {
    setCurrentSection(currentSection - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Show the spinner when submit is clicked

    // Set payment fields before submission
    const amountToPay = calculateVisaFee();
    setFormData((prevData) => ({
      ...prevData,
      paymentAmount: amountToPay,
      paymentStatus: "Success",
      visaStatus: "Pending",
    }));

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://Localhost:5000/api/visa",
        formDataObj,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Visa details submitted successfully!");
      console.log(response.data);

      // Redirect to the relevant page
      setTimeout(() => {
        navigate("/"); // Redirect to the home page
      }, 2000); // Adjust the time (in ms) for how long you want to show the spinner
    } catch (error) {
      console.error("Error submitting visa details:", error);
    }
  };

  // Spinner HTML to be injected
  const spinner = <span class="loader">Loading</span>;

  return (
    <div class="addVisa-body">
      <Nav />
      <section class="add-visa-heading">
        <div class="head-text">
          <h1>E-Visa Application</h1>
        </div>
      </section>
      <section class="add-visa-form">
        <form class="visa-form" onSubmit={handleSubmit}>
          {currentSection === 1 && (
            <div class="form-container">
              <div class="form-section1">
                <div class="section1-header">
                  <h2>Personal Information</h2>
                </div>
                <div class="form-name">
                  <div class="first-name">
                    <label for="first-name">First Name</label>
                    <input
                      type="text"
                      id="first-name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div class="last-name">
                    <label for="last-name">Last Name</label>
                    <input
                      type="text"
                      id="last-name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div class="form-email-DOB">
                  <div class="email">
                    <label for="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div class="DOB">
                    <label for="DOB">Date of Birth</label>
                    <input
                      type="date"
                      id="DOB"
                      name="DOB"
                      value={formData.DOB}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div class="form-phone-country">
                  <div class="phone">
                    <label for="phone">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div class="country">
                    <label for="address">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div class="form-address-postal">
                  <div class="address">
                    <label for="address">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div class="postal">
                    <label for="postal">Postal Code</label>
                    <input
                      type="text"
                      id="postal"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div class="form-btn">
                  <button type="button" class="next" onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
          {currentSection === 2 && (
            <div class="form-container">
              <div class="form-section2">
                <div class="section2-header">
                  <h2>Personal Documents</h2>
                </div>
                <div class="form-visa">
                  <div class="visa-Type">
                    <label for="first-name">Visa Type</label>
                    <select
                      id="visa-type"
                      name="visaType"
                      value={formData.visaType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Tourist">Tourist</option>
                      <option value="Business">Business</option>
                      <option value="Student">Student</option>
                      <option value="Work">Work</option>
                      <option value="Transit">Transit</option>
                    </select>
                  </div>
                  <div class="visa-duration">
                    <label for="duration">Visa Duration</label>
                    <input
                      type="number"
                      id="duration"
                      name="visaDuration"
                      value={formData.visaDuration}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div class="visa-purpose-passport">
                  <div class="purpose">
                    <label for="purpose">Purpose</label>
                    <input
                      type="text"
                      id="purpose"
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div class="passport">
                    <label for="passport">Passport</label>
                    <input
                      type="file"
                      id="passport"
                      name="passportCopy"
                      accept=".pdf,.jpg,.jpeg,.png"
                      // onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div class="visa-birth-police">
                  <div class="birth">
                    <label for="birth">Birth Certificate</label>
                    <input
                      type="file"
                      id="birth"
                      name="birthCertificate"
                      accept=".pdf,.jpg,.jpeg,.png"
                      // onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div class="police">
                    <label for="police">Police Certificate</label>
                    <input
                      type="file"
                      id="police"
                      name="policeCertificate"
                      // onChange={handleInputChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </div>
                </div>
                <div class="form-btn">
                  <button
                    type="button"
                    class="previous"
                    onClick={handlePrevious}
                  >
                    Previous
                  </button>

                  <button type="button" class="next" onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
          {currentSection === 3 && (
            <div class="form-container">
              <div class="form-section3">
                <div class="payment-header">
                  <h2>Make Your Payment Here</h2>
                  <h3>Amount to Pay: ${calculateVisaFee()}</h3>
                </div>
                <div class="card-details">
                  <div class="card-name">
                    <label for="cardName">Cardholder Name</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      placeholder="John Doe"
                      required
                    />
                    <div class="card-number">
                      <label for="cardNumber">Card Number</label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        required
                        maxlength="19"
                      />
                    </div>
                  </div>
                </div>
                <div class="expiry-cvv">
                  <div class="expiry">
                    <label for="expiryDate">Expiry Date</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      required
                      maxlength="5"
                    />
                  </div>
                  <div class="cvv">
                    <label for="cvv">CVV</label>
                    <input
                      type="password"
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      required
                      maxlength="3"
                    />
                  </div>
                </div>
                <div class="amount">
                  <label for="amount">Amount</label>
                  <input
                    type="text"
                    id="amount"
                    name="paymentAmount"
                    value={`$${calculateVisaFee()}`}
                    disabled
                  />
                </div>
              </div>
              <button type="submit" class="submit">
                Submit
              </button>
            </div>
          )}
        </form>
        {loading && spinner} {/* Conditionally render spinner when loading */}
      </section>
      <Footer />
    </div>
  );
}

export default AddVisa;
