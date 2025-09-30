import React from 'react';

interface TextProps {
  children: React.ReactNode;
  type?: keyof JSX.IntrinsicElements; // This restricts 'type' to valid HTML tags (e.g., 'p', 'div')
  className?: string;
}

const Text: React.FC<TextProps> = ({ children, type = 'p', className }) => {
  const Tag = type;
  return <Tag className={className}>{children}</Tag>;
};

export default Text;
