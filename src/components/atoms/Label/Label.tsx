import React from 'react';

type LabelProps = {
  htmlFor: string;
  text: string;
};

const Label: React.FC<LabelProps> = ({ htmlFor, text }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium mb-1">
    {text}
  </label>
);

export default Label;
