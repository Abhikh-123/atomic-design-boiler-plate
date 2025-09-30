import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

const LanguageChange: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <h1>{t('greeting')}</h1>
      <span>
        <Trans
          i18nKey={t('description.line1')}
          values={{ channel: 'Intracis' }}
          components={{ 1: <b /> }}
        />
      </span>
      <br />
      <span>{t('description.line2', { channel: 'Intracis' })}</span>
    </div>
  );
};

export default LanguageChange;
