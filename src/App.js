import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AuthPage from './pages/auth/AuthPage';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/dash/Dashboard';

function App() {
  const location = useLocation();

  const [auth, setAuth] = useState(null);

  useEffect(() => {
    let user = localStorage.getItem('user');
    user && JSON.parse(user) ? setAuth(true) : setAuth(false);
  }, []);

  return (
    <Routes key={location.pathname} location={location}>
      {!auth && (
        <Route exact path="/" element={<AuthPage />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      )}
      <Route path="dashboard" element={<Dashboard />} />
      <Route
        path="*"
        element={<Navigate to={auth ? '/dashboard' : '/login'} />}
      />
    </Routes>
  );
}

export default App;
