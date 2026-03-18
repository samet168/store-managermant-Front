import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate
import api from "../../services/api";
import "../../assets/style/Dashboard/user.css";

const User = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const navigate = useNavigate(); // <-- Initialize navigate

  // Fetch users
// Example: fetchUsers with token
const fetchUsers = async (page = 1, searchTerm = "") => {
  try {
    const token = localStorage.getItem("token"); // ឬ wherever you store the user token

    const res = await api.get("/admin/users", {
      params: { page, search: searchTerm },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUsers(res.data.data);
    setCurrentPage(res.data.current_page);
    setLastPage(res.data.last_page);
  } catch (err) {
    console.error(err);
  }
};

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    fetchUsers(1, value);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= lastPage) {
      fetchUsers(page, search);
    }
  };

  // Delete user
const handleDelete = async (id) => {
  const confirm = window.confirm("Are you sure to delete this user?");
  if (!confirm) return;

  try {
    const token = localStorage.getItem("token");

    await api.delete(`/admin/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchUsers(currentPage, search); // refresh list
  } catch (err) {
    console.error(err);
  }
};

  // Edit user (React Router)
  const handleEdit = (id) => {
    navigate(`/dashboard/admin/users/edit/${id}`); // <-- React Router redirect
  };

  // Add user (React Router)
  const handleAdd = () => {
    navigate("/dashboard/admin/users/add-user"); // <-- React Router redirect
  };

  return (
    <div className="main-content">
      <h1 className="page-title">User Management</h1>

      {/* Add User Button */}
      <button className="btn-add" onClick={handleAdd}>
        Add User
      </button>

      {/* Search */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* User List */}
      <div className="user-list">
        {users.map((user) => (
          <div className="user-card" key={user.id}>
            <div className="user-avatar">
              <img src={user.image} alt="avatar" />
            </div>

            <div className="user-info">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <span className="role">{user.role}</span>
              <p className="date">{user.created_at?.split("T")[0]}</p>

              <div className="btn-group">
                <button className="btn edit-btn" onClick={() => handleEdit(user.id)}>
                  Edit
                </button>
                <button className="btn delete-btn" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          {currentPage} / {lastPage}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === lastPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default User;