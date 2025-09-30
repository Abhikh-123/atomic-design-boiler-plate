import React, { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Sidebar from '../components/organisms/Sidebar/Sidebar';
import Header from '../components/organisms/Header/Header';
const Home = lazy(() => import('../features/dashBoard/pages/Home'));
const LoginPage = lazy(
  () => import('../features/userLogin/pages/LoginPage/LoginPage')
);
const Project = lazy(
  () => import('../features/projects/pages/Project/Project')
);
const AddProject = lazy(() => import('../features/addProject/page/AddProject'));

export function AppRoutes() {
  const location = useLocation();
  const showSidebarAndHeader = location.pathname !== '/';

  return (
    <>
      {showSidebarAndHeader && <Sidebar />}
      {showSidebarAndHeader && <Header />}
      <Suspense fallback={<div> Loading....</div>}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/add-project" element={<AddProject />} />
        </Routes>
      </Suspense>
    </>
  );
}
