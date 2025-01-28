import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "../../../Components/AdminNav/Navbar "; // Import the AdminNav component
import "./VisaDetails.css"; // Import the CSS file

const VisaDetails = () => {
  const [visas, setVisas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:5000/api/admin/visa";

  const fetchVisas = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL, {});
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

  // Function to format date to YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB"); // or use "en-US" or custom format
  };

  const handleConfirm = async (id) => {
    if (
      window.confirm("Are you sure you want to confirm this visa application?")
    ) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/admin/visa/${id}`,
          {
            visaStatus: "Confirmed",
          }
        );
        console.log(response.data);
        setVisas((prev) =>
          prev.map((visa) =>
            visa._id === id ? { ...visa, visaStatus: "Confirmed" } : visa
          )
        );
      } catch (error) {
        console.error("Error confirming visa:", error);
      }
    }
  };
  const handleRefused = async (id) => {
    if (
      window.confirm("Are you sure you want to refused this visa application?")
    ) {
      try {
        const response = await axios.put(
          `http://localhost:5000/api/admin/visa/${id}`,
          {
            visaStatus: "Refused",
          }
        );
        console.log(response.data);
        setVisas((prev) =>
          prev.map((visa) =>
            visa._id === id ? { ...visa, visaStatus: "Refused" } : visa
          )
        );
      } catch (error) {
        console.error("Error refused visa:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this visa application?")
    ) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/admin/visa/${id}`
        );
        console.log(response.data);
        setVisas((prev) => prev.filter((visa) => visa._id !== id));
      } catch (error) {
        console.error("Error deleting visa:", error);
      }
    }
  };

  return (
    <div>
      <AdminNav />
      <div className="visa-container">
        <h2 className="visa-heading">Visa Details</h2>
        <hr />
        {visas && visas.length > 0 ? (
          <div className="visa-cards-container">
            {visas.map((visa) => (
              <div className="visa-card" key={visa._id}>
                <h3 className="visa-card-title">
                  {visa.firstName} {visa.lastName}
                </h3>
                <hr></hr>
                <div className="visa-details">
                  <p>
                    <strong>Email:</strong> {visa.email}
                  </p>

                  <p>
                    <strong>Date Of Birth:</strong> {formatDate(visa.DOB)}
                  </p>
                  <p>
                    <strong>Contact:</strong> {visa.phoneNumber}
                  </p>
                  <p>
                    <strong>Country:</strong> {visa.country}
                  </p>
                  <p>
                    <strong>Address:</strong> {visa.address}
                  </p>
                  <p>
                    <strong>Postal Code:</strong> {visa.postalCode}
                  </p>
                  <p>
                    <strong>Visa Type:</strong> {visa.visaType}
                  </p>
                  <p>
                    <strong>Visa Duration:</strong> {visa.visaDuration}
                    <span> (months)</span>
                  </p>
                  <p>
                    <strong>Purpose:</strong> {visa.purpose}
                  </p>
                  <p>
                    <strong>Payment Amount:</strong> {visa.paymentAmount}
                    <span>$</span>
                  </p>
                  <p>
                    <strong>Payment Status:</strong> {visa.paymentStatus}
                  </p>
                  <p>
                    <strong>Visa Status:</strong> {visa.visaStatus}
                  </p>
                  <p>
                    <strong>Civil Status:</strong> {visa.civilStatus}
                  </p>
                  <p>
                    <strong>Gender:</strong> {visa.gender}
                  </p>
                  <p>
                    <strong>Education:</strong> {visa.education}
                  </p>
                </div>
                <div className="visa-actions">
                  <button
                    className="confirm-button"
                    onClick={() => handleConfirm(visa._id)}
                  >
                    Confirm
                  </button>
                  <button
                    className="refused-button"
                    onClick={() => handleRefused(visa._id)}
                  >
                    Refused
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(visa._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div class="no-visa-loader">
            <p class="no-visa-cont">No Visa Data Available !.....</p>
            <div class="clouds">
              <div class="wrapper">
                <div class="cloud">
                  <div class="cloud_left"></div>
                  <div class="cloud_right"></div>
                </div>
                <div class="rain">
                  <div class="drop"></div>
                  <div class="drop"></div>
                  <div class="drop"></div>
                  <div class="drop"></div>
                  <div class="drop"></div>
                </div>
                <div class="surface">
                  <div class="hit"></div>
                  <div class="hit"></div>
                  <div class="hit"></div>
                  <div class="hit"></div>
                  <div class="hit"></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisaDetails;
