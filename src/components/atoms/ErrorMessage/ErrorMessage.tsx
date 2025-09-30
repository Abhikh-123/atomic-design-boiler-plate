import React from 'react';

type ErrorMessageProps = {
  message?: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) =>
  message ? <p className="text-red-500 text-xs mt-1">{message}</p> : null;

export default ErrorMessage;
