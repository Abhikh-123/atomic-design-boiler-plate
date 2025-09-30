import React from 'react';

type AuthTemplateProps = {
  children: React.ReactNode;
};

const AuthTemplate: React.FC<AuthTemplateProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        {children}
      </div>
    </div>
  );
};

export default AuthTemplate;
