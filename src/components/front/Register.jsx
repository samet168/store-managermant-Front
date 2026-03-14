import React from 'react';
import '../../style/Front/GlobalFront.css';
import api from '../../services/api';

const Register = () => {

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      // eslint-disable-next-line no-unused-vars
      const response = await api.post('/register', form);

      alert("Register Success");

      window.location.href = "/login";

    } catch (error) {

      console.error(error);

      alert("Register Failed");

    }
  };

  return (
    <div className="auth-container">

      <div className="auth-card">

        <h2>Register</h2>

        <form className="auth-form" onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Username"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <button type="submit" className="auth-button">
            Register
          </button>

        </form>

        <p className="auth-footer">
          Already have an account? <a href="/login">Login here</a>
        </p>

      </div>

    </div>
  );
};

export default Register;