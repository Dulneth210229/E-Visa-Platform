import React, { useState } from "react";
import axios from "axios";
import "./AddFiles.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const AddFiles = () => {
  const [files, setFiles] = useState({});
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(files).forEach((key) => formData.append(key, files[key]));
    try {
      await axios.post("http://localhost:5000/api/files/upload", formData);
      alert("Files uploaded successfully!");
      navigate("/visa-status");
    } catch (error) {
      alert("Failed to upload files");
    }
  };

  return (
    <form id="add-files-form" onSubmit={handleSubmit}>
      <h1>Upload Personal Files</h1> <hr />
      <br></br>
      <label>Passport Copy :</label>
      <input
        type="file"
        name="passportCopy"
        className="file-input"
        onChange={handleFileChange}
        required
      />
      <label>Birth Certificate :</label>
      <input
        type="file"
        name="birthCertificate"
        className="file-input"
        onChange={handleFileChange}
        required
      />
      <label>Police Certificate :</label>
      <input
        type="file"
        name="policeCertificate"
        className="file-input"
        onChange={handleFileChange}
        required
      />
      <label>Medical Certificate :</label>
      <input
        type="file"
        name="biodata"
        className="file-input"
        onChange={handleFileChange}
        required
      />
      <button id="upload-button" type="submit">
        Upload Files
      </button>
    </form>
  );
};

export default AddFiles;
