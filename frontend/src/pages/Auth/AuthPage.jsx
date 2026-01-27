import React from 'react';

const AuthPage = ({ type }) => {
  const renderContent = () => {
    if (type === 'signin') return <h2>Sign In Page</h2>;
    if (type === 'signup') return <h2>Sign Up Page</h2>;
    if (type === 'update-password') return <h2>Update Password Page</h2>;
    return null;
  };

  return (
    <div className="auth-container">
      {renderContent()}
    </div>
  );
};

export default AuthPage;