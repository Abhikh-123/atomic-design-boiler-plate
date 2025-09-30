import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { useTranslation } from 'react-i18next';
import ProjectForm from '../organisms/ProjectForm';

interface AddProjectTemplateProps {
  onBackClick: () => void;
}

const AddProjectTemplate: React.FC<AddProjectTemplateProps> = ({
  onBackClick,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <div className={`page ${theme}`}>
      <div className="page-heading">
        <h1>{t('add-project')}</h1>
        <button className="header-button" onClick={onBackClick}>
          {t('back')}
        </button>
      </div>
      <ProjectForm />
    </div>
  );
};

export default AddProjectTemplate;
