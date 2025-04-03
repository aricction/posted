import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


// Import React and necessary hooks
import React, { useState, useRef, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from "../firebase"; // Import from firebase.js
import "../login/Login.css"; // Import your CSS file

function Login({ closeModal }) {
  const modalRef = useRef();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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



  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setTimeout(()=> {
            navigate('/');
      },1000);
      // Handle successful login here (e.g., redirect or display user info)
    } catch (error) {
      console.error("Error signing in with Google: ", error.message);
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  const handleEmailPasswordSignIn = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        setSuccess('Registration successful!');
        setEmail('');
        setPassword('');
        setTimeout(()=> {
          navigate('/');
    },1000);
      });
      // Handle successful login here (e.g., redirect or display user info)
    } catch (error) {
      console.error("Error signing in with email and password: ", error.message);
      setError("Failed to sign in with email and password. Please try again.");
    }
  };

  return (
    <div className="z-[999999] absolute top-0 left-0 backdrop-blur-sm flex items-center justify-center w-lvw h-lvh">
      <div ref={modalRef} className="bg-white w-[30rem] p-5 rounded-lg /login-container">
        <h2 className="login-title">Login</h2>
        <button className="google-signin" onClick={handleGoogleSignIn}>
          Sign in with Google
        </button>
        <form className="login-form" onSubmit={handleEmailPasswordSignIn}>
          <div className="form-group">
            <label htmlFor="login">Email</label>
            <input
              type="email"
              id="login"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative form-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute top-11 right-5 text-black">{showPassword
              ?<FaEye />
              :<FaEyeSlash />
            }</button>

            {password && <p className="text-xs text-red-600">password should be atleast 6 characters</p>}
          </div>
          <button type="submit" className="submit-button">Sign in with Email</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
}

export default Login;
