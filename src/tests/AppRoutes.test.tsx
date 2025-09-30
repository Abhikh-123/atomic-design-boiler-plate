import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from '../routes/AppRoutes';

// Mock lazy-loaded components to avoid waiting for actual imports
jest.mock('../features/dashBoard/pages/Home', () => () => <div>Home Page</div>);
jest.mock('../features/userLogin/pages/LoginPage/LoginPage', () => () => (
  <div>Login Page</div>
));
jest.mock('../features/projects/pages/Project/Project', () => () => (
  <div>Project Page</div>
));
jest.mock('../features/addProject/page/AddProject', () => () => (
  <div>Add Project Page</div>
));

// Mock Sidebar and Header to avoid rendering heavy UI
jest.mock('../components/organisms/Sidebar/Sidebar', () => () => (
  <div>Sidebar</div>
));
jest.mock('../components/organisms/Header/Header', () => () => (
  <div>Header</div>
));

describe('MainContent', () => {
  it("renders LoginPage at '/' and hides Sidebar/Header", async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(await screen.findByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Sidebar')).not.toBeInTheDocument();
    expect(screen.queryByText('Header')).not.toBeInTheDocument();
  });

  it("renders Home at '/home' and shows Sidebar/Header", async () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(await screen.findByText('Home Page')).toBeInTheDocument();
    expect(screen.getByText('Sidebar')).toBeInTheDocument();
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  it("renders Project page at '/project'", async () => {
    render(
      <MemoryRouter initialEntries={['/project']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(await screen.findByText('Project Page')).toBeInTheDocument();
  });

  it("renders Add Project page at '/add-project'", async () => {
    render(
      <MemoryRouter initialEntries={['/add-project']}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(await screen.findByText('Add Project Page')).toBeInTheDocument();
  });
});
