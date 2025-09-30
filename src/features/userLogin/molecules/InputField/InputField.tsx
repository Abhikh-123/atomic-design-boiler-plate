import React from 'react';
import Label from '../../../userLogin/atoms/Label/Label';
import Input from '../../../userLogin/atoms/Input/Input';
import ErrorMessage from '../../../userLogin/atoms/ErrorMessage/ErrorMessage';

type InputFieldProps = {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
}) => {
  return (
    <div className="mb-4">
      <Label htmlFor={id} text={label} />
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        error={error}
      />
      <ErrorMessage message={error} />
    </div>
  );
};

export default InputField;
