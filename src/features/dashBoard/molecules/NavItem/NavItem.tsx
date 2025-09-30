import React from 'react';
import { Link } from 'react-router-dom';

interface NavItemProps {
  label: string;
  href: string;
}

const NavItem: React.FC<NavItemProps> = ({ label, href }) => (
  <Link to={href} className="nav-item">
    {label}
  </Link>
);

export default NavItem;
