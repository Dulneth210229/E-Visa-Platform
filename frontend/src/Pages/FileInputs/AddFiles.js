import React, { useState } from "react";
import axios from "axios";
import "./AddFiles.css"; // Import the CSS file
import { useNavigate } from "react-router-dom";

const AddFiles = () => {
  const [files, setFiles] = useState({});
  const [name, setName] = useState(""); // State for the name field
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name); // Append name to the form data
    Object.keys(files).forEach((key) => formData.append(key, files[key]));
    try {
      await axios.post("http://localhost:5000/api/files/upload", formData);
      alert("Files uploaded successfully!");
    } catch (error) {
      alert("Failed to upload files");
    }
    navigate("/visa-status");
  };

  return (
    <form id="add-files-form" onSubmit={handleSubmit}>
      <h1>Upload Personal Files</h1> <hr />
      <br></br>
      <label>Name :</label>
      <input
        type="text"
        name="name"
        className="file-input"
        onChange={handleNameChange}
        required
      />
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
