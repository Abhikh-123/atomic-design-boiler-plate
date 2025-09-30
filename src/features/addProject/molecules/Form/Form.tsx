import React from 'react';
import InputField from '../../../addProject/atoms/Input/InputField';
import Button from '../../../addProject/atoms/Button/Button';

interface FormProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  body: string;
  setBody: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  buttonText: string;
}

const Form: React.FC<FormProps> = ({
  title,
  setTitle,
  body,
  setBody,
  onSubmit,
  buttonText,
}) => {
  return (
    <form className="addproject-form" onSubmit={onSubmit} data-testid="form">
      <InputField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter project name"
      />
      <InputField
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Enter team lead name"
      />
      <Button className="add-update-button" type="submit">
        {buttonText}
      </Button>
    </form>
  );
};

export default Form;
