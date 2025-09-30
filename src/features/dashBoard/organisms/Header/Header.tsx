import React from 'react';
import LanguageSelector from '../../../../components/molecules/LanguageSelector/LanguageSelector';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '../../../../components/molecules/Theme/ThemeToggle';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="header">
      <span>{t('Intracis')} </span>
      <div style={{ display: 'flex' }}>
        <ThemeToggle />
        <LanguageSelector />
      </div>
    </div>
  );
};

export default Header;
