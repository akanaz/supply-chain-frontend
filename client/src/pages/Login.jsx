import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../services/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import '../styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!username.trim() || !password.trim()) {
        setError('Please enter both username and password');
        setLoading(false);
        return;
      }

      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setError('User not found. Please register first.');
        setLoading(false);
        return;
      }

      // FIXED: Get user data correctly
      const userData = querySnapshot.docs[0].data();
      const userEmail = userData.email;

      try {
        const userCredential = await signInWithEmailAndPassword(auth, userEmail, password);

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('authToken', userCredential.user.uid);

        navigate('/');
      } catch (authError) {
        setError('Incorrect password. Please try again.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo-container">
            <div className="logo-icon">👤</div>
          </div>
          <h1>Sign In</h1>
          <p>Welcome to Supply Chain Management</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="alert alert-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. owner"
              disabled={loading}
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={loading}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-login" disabled={loading}>
            <span>{loading ? 'Signing in...' : 'Sign In'}</span>
          </button>

          <div className="login-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/register">Create one now</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
