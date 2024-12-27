import React from "react";
import { useState } from "react";
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
    passportCopy: null,
    birthCertificate: null,
    policeCertificate: null,
  });
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleNext = () => {
    // Validation logic for the current section
    if (
      currentSection === 1 &&
      (!formData.firstName ||
        !formData.lastName ||
        !formData.DOB ||
        !formData.email ||
        !formData.phoneNumber ||
        !formData.country ||
        !formData.address ||
        !formData.postalCode)
    ) {
      alert("Please fill all required fields in this section.");
      return;
    }
    if (
      currentSection === 2 &&
      (!formData.visaType ||
        !formData.visaDuration ||
        !formData.purpose ||
        !formData.passportCopy ||
        !formData.birthCertificate ||
        !formData.policeCertificate)
    ) {
      alert("Please fill all required fields in this section.");
      return;
    }
    setCurrentSection(currentSection + 1);
  };

  const handlePrevious = () => {
    setCurrentSection(currentSection - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataObj.append(key, formData[key]);
    });

    try {
      const response = await axios.post("/api/visa", formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Visa details submitted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error submitting visa details:", error);
    }
  };

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
                      type="text"
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
                      value={formData.passportCopy}
                      onChange={handleInputChange}
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
                      value={formData.birthCertificate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div class="police">
                    <label for="police">Police Certificate</label>
                    <input
                      type="file"
                      id="police"
                      name="policeCertificate"
                      value={formData.policeCertificate}
                      onChange={handleInputChange}
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
                  <button type="button" class="submit">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </section>
      <Footer />
    </div>
  );
}

export default AddVisa;
