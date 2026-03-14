import React from 'react';
import "../../style/user.css";

const User = () => {
  // Example user data
  const userData = {
    name: "John Doe",
    role: "Customer",
    email: "john.doe@example.com",
    joined: "2023-05-12",
  };

  return (
    <div className="main-content">
      <h1 className="page-title">User Profile</h1>

      <div className="user-card">
        <div className="user-avatar">
          <img src="/images/avatar.png" alt="User Avatar" />
        </div>
        <div className="user-info">
          <h2>{userData.name}</h2>
          <p><strong>Role:</strong> {userData.role}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Joined:</strong> {userData.joined}</p>
          <button className="btn-primary">Edit Profile</button>
        </div>
      </div>

      <div className="user-activity">
        <h3>Recent Activity</h3>
        <ul>
          <li>Purchased "Laptop X168A"</li>
          <li>Updated account settings</li>
          <li>Logged in from new device</li>
        </ul>
      </div>
    </div>
  );
};

export default User;