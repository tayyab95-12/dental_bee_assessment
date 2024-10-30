import React, {useState} from 'react';
import axiosInstance from '../axiosInstance';
import {useNavigate} from 'react-router-dom';

function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('token/', {
        username,
        password,
      });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + response.data.access;
      navigate('/notes'); // Redirect to notes page after login
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed! Please check your credentials.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;