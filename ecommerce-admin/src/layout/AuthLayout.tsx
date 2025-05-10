import React from 'react';
import { Outlet } from 'react-router-dom';
import bg from '/src/images/auth/login-bg.webp';

const AuthLayout: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center h-screen bg-gray-50 bg-no-repeat bg-cover font-satoshi'"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};
export default AuthLayout;
