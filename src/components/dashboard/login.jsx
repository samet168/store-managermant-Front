import React from 'react';
import api from '../../services/api';

const Login = () => {

  const [form, setForm] = React.useState({
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

      const response = await api.post('/login', form);

      console.log(response.data);

      alert("Login Success");

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user_name", response.data.user.name);

      window.location.href = "/dashboard";

    } catch (error) {
      console.error(error);
      alert("Login Failed");
    }

  };

  return (
    <div className="auth-container position-relative z-index-1 vh-100">

      <div className="auth-card">

        <h2>Login</h2>

        <form className="auth-form" onSubmit={handleSubmit}>

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
            Login
          </button>

        </form>



      </div>

    </div>
  );
};

export default Login;