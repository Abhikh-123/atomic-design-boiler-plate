import React from 'react';
import MainContent from '../../../dashBoard/organisms/MainContent/MainContent';

const DefaultLayout: React.FC = () => (
  <div className="page app-layout" style={{ paddingLeft: '90px' }}>
    <div className="main-section">
      <MainContent />
    </div>
  </div>
);

export default DefaultLayout;
