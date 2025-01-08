import React, { useState, useEffect } from "react";
import Nav from "../../../Components/Navigation/Nav";
import Footer from "../../../Components/Footer/Footer";
import "./VisaStatus.css";

function VisaStatus() {
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:5000/api/visa";

  const fetchVisas = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch visa applications");
      }
      const data = await response.json();
      setVisas(data.visa);
      setError(null);
    } catch (err) {
      setError(err.message || "Failed to fetch visa applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisas();
  }, []);

  if (loading) {
    return <div>Loading visa applications...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div class="visaStatus-body ">
      <Nav />
      <div class="status-header-text">
        <h1>Visa Status</h1>
      </div>
      <section class="status-section">
        <div>
          {visas.map((visa) => (
            <div key={visa._id}>
              <h2>
                {visa.firstName} {visa.lastName}
              </h2>
              <div class="data-container">
                <div class="data-card">
                  <span class="card-span">Visa Status:</span> {visa.visaStatus}
                </div>
                <div class="data-card">
                  <span class="card-span">Payment Status:</span>{" "}
                  {visa.paymentStatus}
                </div>
                <div class="data-card">
                  <div>
                    <div>
                      <span>Email:</span> {visa.email}
                    </div>
                    <div>
                      <span>Phone:</span> {visa.phoneNumber}
                    </div>
                    <div>
                      <span>Country:</span> {visa.country}
                    </div>
                    <div>
                      <span>Visa Type:</span> {visa.visaType}
                    </div>
                    <div>
                      <span>Duration:</span> {visa.visaDuration}
                    </div>
                    <div>
                      <span>Purpose:</span> {visa.purpose}
                    </div>
                  </div>

                  <div>
                    {visa.passportCopy && (
                      <div>
                        <span>Passport Copy:</span> Uploaded
                      </div>
                    )}
                    {visa.birthCertificate && (
                      <div>
                        <span>Birth Certificate:</span> Uploaded
                      </div>
                    )}
                    {visa.policeCertificate && (
                      <div>
                        <span>Police Certificate:</span> Uploaded
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {visas.length === 0 && <div>No visa applications found</div>}
        </div>
      </section>
    </div>
  );
}
export default VisaStatus;
