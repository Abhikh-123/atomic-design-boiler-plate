import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddProjectTemplate from '../templates/AddProjectTemplate';

const AddProject: React.FC = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return <AddProjectTemplate onBackClick={handleBackClick} />;
};

export default AddProject;
