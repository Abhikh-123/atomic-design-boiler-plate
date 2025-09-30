import React from 'react';
import NavItem from '../NavItem/NavItem';
import { useTranslation } from 'react-i18next';

const SidebarSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <nav className="sidebar">
      <NavItem data-testid="home-title" label={t('home')} href="/home" />
      {/* <NavItem label="About" href="/about" />
    <NavItem label="Search" href="/search" /> */}
      <NavItem label={t('project')} href="/project" />
      {/* <NavItem label={t("add-project")} href="/add-project" /> */}
      <NavItem label={t('logout')} href="/" />
    </nav>
  );
};

export default SidebarSection;
