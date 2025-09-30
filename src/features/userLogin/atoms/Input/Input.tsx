import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const Input: React.FC<InputProps> = ({ error, ...props }) => {
  return (
    <div className="flex flex-col w-full">
      <input
        className={`border rounded p-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
        {...props}
      />
    </div>
  );
};

export default Input;
