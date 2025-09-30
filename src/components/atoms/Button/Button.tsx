import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
};

const Button: React.FC<ButtonProps> = ({ label, ...props }) => {
  return (
    <button
      className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      {...props}
    >
      {label}
    </button>
  );
};

export default Button;
