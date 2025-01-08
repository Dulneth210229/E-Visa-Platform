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
        {visas.map((visa) => (
          <div key={visa._id}>
            <h2>
              {visa.firstName} {visa.lastName}
            </h2>
          </div>
        ))}
      </div>
      <section class="status-section">
        <div>
          {visas.map((visa) => (
            <div key={visa._id}>
              {/* <h2>
                {visa.firstName} {visa.lastName}
              </h2> */}
              <div class="data-container">
                <div class="data-card-main">
                  <span class="card-span-text">Visa Status</span>{" "}
                  <span>{visa.visaStatus}....</span>
                </div>
                <div class="data-card-main">
                  <span class="card-span-text">Payment Status</span>
                  <span>
                    {visa.paymentStatus} <i class="fa-solid fa-check"></i>
                  </span>
                </div>
                <div class="data-card-body">
                  <div class="data-card-body-text">
                    <div class="data-card-body-text-card">
                      <span class="span-border">Email </span>
                      <span>{visa.email}</span>
                    </div>
                    <div class="data-card-body-text-card">
                      <span class="span-border">Phone </span>
                      <span>{visa.phoneNumber}</span>
                    </div>
                    <div class="data-card-body-text-card">
                      <span class="span-border">Country </span>
                      <span>{visa.country}</span>
                    </div>
                    <div class="data-card-body-text-card">
                      <span class="span-border">Visa Type </span>
                      <span>{visa.visaType}</span>
                    </div>
                    <div class="data-card-body-text-card">
                      <span class="span-border">Duration </span>
                      <span>{visa.visaDuration}</span>
                    </div>
                    <div class="data-card-body-text-card">
                      <span class="span-border">Purpose </span>

                      <span>{visa.purpose}</span>
                    </div>
                  </div>

                  {/* <div class="data-card-body-text">
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
                  </div> */}
                </div>
              </div>
            </div>
          ))}

          {visas.length === 0 && <div>No visa applications found</div>}
        </div>
      </section>
      <Footer />
    </div>
  );
}
export default VisaStatus;
