import React from 'react';
import '../../style/Front/GlobalFront.css'; 

const Register = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>
        <form className="auth-form">
          <input type="text" placeholder="Username" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="auth-button">Register</button>
        </form>
        <p className="auth-footer">Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
};

export default Register;