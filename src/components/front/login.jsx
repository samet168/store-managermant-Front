import React from 'react';
import '../../style/Front/GlobalFront.css'; 

const Login = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form className="auth-form">
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="auth-button">Login</button>
        </form>
        <p className="auth-footer">Don't have an account? <a href="/register">Register here</a></p>
      </div>
    </div>
  );
};

export default Login;