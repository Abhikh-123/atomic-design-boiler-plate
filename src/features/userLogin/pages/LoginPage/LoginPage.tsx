import React from 'react';
import AuthTemplate from '../../../userLogin/templates/AuthTemplate/AuthTemplate';
import LoginForm from '../../../userLogin/organisms/LoginForm/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <AuthTemplate>
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <LoginForm />
    </AuthTemplate>
  );
};

export default LoginPage;
