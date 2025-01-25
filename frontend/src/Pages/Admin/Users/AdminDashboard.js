import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "../../../Components/AdminNav/Navbar "; // Import the AdminNav component
import "./AdminDashboard.css"; // Normal CSS styling

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://Localhost:5000/api/user"); // Adjust based on your backend URL
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Delete user
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://Localhost:5000/api/user/${id}`); // Adjust based on your backend URL
        setUsers(users.filter((user) => user._id !== id)); // Remove user from state
      } catch (err) {
        alert("Failed to delete user. Please try again.");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <AdminNav />
      <div className="admin-dashboard">
        <h1>User Details</h1>
        <hr />
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.email}</td>
                <td class="td-btn-remove">
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user._id)}
                  >
                    Remove User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
