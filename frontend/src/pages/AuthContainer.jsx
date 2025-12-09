// src/pages/AuthPage.jsx
import { useState } from "react";
import Login from "./Login";
import SignUp from "./signup";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [prefilledData, setPrefilledData] = useState(null); // For auto-fill after signup

  const handleSwitchToSignUp = () => setIsLogin(false);
  const handleSwitchToLogin = () => setIsLogin(true);

  const handleSignupSuccess = (userData) => {
    // After successful signup, switch to login and prefill
    setPrefilledData({
      email: userData.email,
      password: "" // Never pre-fill password for security
    });
    setIsLogin(true);
  };

  return (
    <>
      {isLogin ? (
        <Login
          onSwitchToSignUp={handleSwitchToSignUp}
          prefilledEmail={prefilledData?.email}
        />
      ) : (
        <SignUp
          onSwitchToLogin={handleSwitchToLogin}
          onSignupSuccess={handleSignupSuccess}
        />
      )}
    </>
  );
}