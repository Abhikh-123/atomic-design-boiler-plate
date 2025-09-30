import React from 'react';
import { useTranslation } from 'react-i18next';

const MainContent: React.FC = () => {
  // Correctly call the translation hook before returning JSX
  const { t } = useTranslation();

  return (
    <main className="main-content">
      <h2>{t('greeting')}</h2>
      <h1>
        {t('Intracis')} - {t('project_for')}
      </h1>
      <p>{t('maincontent')}</p>
    </main>
  );
};

export default MainContent;
