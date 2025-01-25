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

  const handleConfirm = async (id) => {
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
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/admin/visa/${id}`
      );
      console.log(response.data);
      setVisas((prev) => prev.filter((visa) => visa._id !== id));
    } catch (error) {
      console.error("Error deleting visa:", error);
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
                <div className="visa-details">
                  <p>
                    <strong>Email:</strong> {visa.email}
                  </p>
                  <p>
                    <strong>Country:</strong> {visa.country}
                  </p>
                  <p>
                    <strong>Visa Type:</strong> {visa.visaType}
                  </p>
                  <p>
                    <strong>Visa Status:</strong> {visa.visaStatus}
                  </p>
                  <p>
                    <strong>Passport Copy:</strong>{" "}
                    {visa.passportCopy ? "Uploaded" : "Not Uploaded"}
                  </p>
                  <p>
                    <strong>Birth Certificate:</strong>{" "}
                    {visa.birthCertificate ? "Uploaded" : "Not Uploaded"}
                  </p>
                  <p>
                    <strong>Police Certificate:</strong>{" "}
                    {visa.policeCertificate ? "Uploaded" : "Not Uploaded"}
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
          <p>No Visa Data Available</p>
        )}
      </div>
    </div>
  );
};

export default VisaDetails;
