import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import api from "../../../services/api";
import "./style/User.css"; // Importing the CSS styles

const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const token = localStorage.getItem("token");

  const fetchUsers = async (page = 1) => {
    try {
      const res = await api.get(`admin/users?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.data);
      setCurrentPage(res.data.current_page);
      setLastPage(res.data.last_page);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers(currentPage);
  }, [currentPage]);

  // ───── Delete User ─────
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;

    try {
      await api.delete(`admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User deleted successfully!");
      fetchUsers(currentPage); // refresh list
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete user.");
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < lastPage) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="user-page">
      <div className="user-header">
        <h2>User Management</h2>
        <Link to="/dashboard/admin/users/add-user" className="btn-add">+ Add User</Link>
      </div>

      <div className="table-wrapper">
        {users.length === 0 ? (
          <p className="no-data">No users found.</p>
        ) : (
          <>
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      <img src={user.image} alt="user" className="user-img" />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role ${user.role}`}>{user.role}</span>
                    </td>
                    <td>
                      <Link to={`/dashboard/admin/edit-user/${user.id}`} className="btn-edit">Edit</Link>
                      <button 
                        className="btn-delete" 
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="pagination">
              <button 
                className="pagination-button" 
                onClick={handlePrev} 
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {Array.from({ length: lastPage }, (_, index) => (
                <button 
                  key={index + 1} 
                  className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button 
                className="pagination-button" 
                onClick={handleNext} 
                disabled={currentPage === lastPage}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>

      <Outlet />
    </div>
  );
};

export default UserAdmin;