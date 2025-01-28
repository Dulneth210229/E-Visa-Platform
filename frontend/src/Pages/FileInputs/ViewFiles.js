import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewFiles.css"; // Import the CSS file
import AdminNav from "../../Components/AdminNav/Navbar "; // Import the AdminNav component

const ViewFiles = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/files");
        setFiles(data);
      } catch (error) {
        alert("Failed to fetch files");
      }
    };
    fetchFiles();
  }, []);

  const handleDownload = (id, field) => {
    window.open(`http://localhost:5000/api/files/download/${id}/${field}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/files/${id}`);
      setFiles(files.filter((file) => file._id !== id));
      alert("Files deleted successfully!");
    } catch (error) {
      alert("Failed to delete files");
    }
  };

  return (
    <div>
      <AdminNav />
      <div id="view-files-container">
        <br />
        <br />
        <br />
        <br />
        <br />

        <h1 id="view-files-title">Uploaded Files</h1>
        {files.length === 0 ? (
          <p id="no-files-message">No files uploaded yet.</p>
        ) : (
          files.map((file) => (
            <div key={file._id} className="file-set">
              <h3 className="file-title">
                Name:{" "}
                <span class="name">{file.name || "No name provided"}</span>
              </h3>

              <div className="file-detail">
                <p>
                  <strong>Passport Copy:</strong>{" "}
                  {file.passportCopy.split("/").pop()}
                </p>
                <button
                  className="file-button"
                  onClick={() => handleDownload(file._id, "passportCopy")}
                >
                  Download
                </button>
              </div>
              <div className="file-detail">
                <p>
                  <strong>Birth Certificate:</strong>{" "}
                  {file.birthCertificate.split("/").pop()}
                </p>
                <button
                  className="file-button"
                  onClick={() => handleDownload(file._id, "birthCertificate")}
                >
                  Download
                </button>
              </div>
              <div className="file-detail">
                <p>
                  <strong>Police Certificate:</strong>{" "}
                  {file.policeCertificate.split("/").pop()}
                </p>
                <button
                  className="file-button"
                  onClick={() => handleDownload(file._id, "policeCertificate")}
                >
                  Download
                </button>
              </div>
              <div className="file-detail">
                <p>
                  <strong>Biodata:</strong> {file.biodata.split("/").pop()}
                </p>
                <button
                  className="file-button"
                  onClick={() => handleDownload(file._id, "biodata")}
                >
                  Download
                </button>
              </div>
              <button id="delete-button" onClick={() => handleDelete(file._id)}>
                Delete All Files
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewFiles;
