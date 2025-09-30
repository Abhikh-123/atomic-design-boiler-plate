import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './provider/AuthProvider';
import { ThemeProvider } from './provider/ThemeProvider';
import './style/style.css';
import { AppRoutes } from '../src/routes/AppRoutes';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
export default App;
