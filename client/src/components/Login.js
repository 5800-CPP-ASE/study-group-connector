import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../services/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // call login api, store token, navigate to profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login({ email, password });
      localStorage.setItem('token', token);
      navigate('/profile');
    } catch (err) {
      alert('Login failed');
    }
  };

  // render login form
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login to Study Group Connector</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
      <p><Link to="/register">Don't have an account? Register</Link></p>  { }
    </form>
  );
};

export default Login;