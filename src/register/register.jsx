
import React, { useState, useRef, useEffect } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './Register.css'; // Import the CSS file for styling

const Register = ({ closeModal }) => {
  const modalRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeModal]);




  const handleRegister = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setSuccess('Registration successful!');
        setIsLoggedIn(true);
        setEmail('');
        setPassword('');
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(`Error: ${errorMessage}`);
      });
  };

  return (
    <div className="z-[999999] absolute top-0 left-0 backdrop-blur-sm flex items-center justify-center w-lvw h-lvh">

      <div ref={modalRef} className="bg-white text-black w-[30rem] p-5 rounded-lg /register-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default Register;
