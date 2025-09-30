import React from 'react';
import { Link } from 'react-router-dom';

const FormFooter: React.FC = () => (
  <div className="flex justify-between mt-2 text-sm">
    <Link to="/forgot-password" className="text-blue-500 hover:underline">
      Forgot Password?
    </Link>
    <Link to="/register" className="text-blue-500 hover:underline">
      Create Account
    </Link>
  </div>
);

export default FormFooter;
