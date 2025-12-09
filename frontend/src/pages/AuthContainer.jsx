// AuthContainer.jsx
// This component manages switching between Login and SignUp
import React, { useState } from 'react';
import Login from './Login';
import SignUp from './signup';

export default function AuthContainer() {
  const [showLogin, setShowLogin] = useState(true);

  const switchToSignUp = () => {
    setShowLogin(false);
  };

  const switchToLogin = () => {
    setShowLogin(true);
  };

  return (
    <>
      {showLogin ? (
        <Login onSwitchToSignUp={switchToSignUp} />
      ) : (
        <SignUp onSwitchToLogin={switchToLogin} />
      )}
    </>
  );
}