import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import Admin from './Admin';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // load user from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem('auth_user'); // stored user info from login
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch (_) {
        localStorage.removeItem('auth_user');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('auth_user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="container my-4" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="text-center mb-4">
        <h2 className="text-primary"> Authentication and Authorization Demo</h2>
        <p className="text-muted">Try the registration, login, and protected routes</p>
      </div>

      <nav className="mb-4">
        <ul className="nav nav-pills flex-wrap justify-content-center gap-2">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          {!user && (
            <>
              <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">Profile</Link>
              </li>
              {user.role === 'admin' && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link">Admin</Link>
                </li>
              )}
              <li className="nav-item">
                <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>

      <div className="card shadow-sm p-4">
        <Routes>
          <Route path="/" element={
            <div className="text-center text-secondary">
              <h5>Welcome!</h5>
              <p>Register or login to access protected routes.</p>
            </div>
          } />
          <Route path="/register" element={<Register onRegister={(u) => setUser(u)} />} />
          <Route path="/login" element={<Login onLogin={(u) => setUser(u)} />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
