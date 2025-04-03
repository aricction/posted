import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signOut } from "../firebase";

import Login from "../login/login"
import Register from "../register/register"

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openSignupModal = () => setIsSignupModalOpen(true);
  const closeSignupModal = () => setIsSignupModalOpen(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <nav className={`relative bg-blue-500 p-4 text-white shadow-xl`}>
      {/* Modals */}
      {isLoginModalOpen && <Login closeModal={closeLoginModal} />}
      {isSignupModalOpen && <Register closeModal={closeSignupModal} />}
      
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-between gap-5">
          <h1 className="text-lg font-bold">POSTED</h1>
        </div>
        <div className="flex items-center space-x-2">
          {isLoggedIn ? (
            <>
              {user && user.photoURL && (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-8 h-8 rounded-full space-x-4"
                />
              )}
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <div className="border-solid rounded border-2 border-white p-2 w-fit hover:bg-white hover:text-blue-600 duration-700">
                <button onClick={openLoginModal}>Login</button>
              </div>
              <div className="border-solid rounded border-2 border-white p-2 w-fit hover:bg-white hover:text-blue-600 duration-700">
                <h3>
                  <button onClick={openSignupModal}>Register</button>
                </h3>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
