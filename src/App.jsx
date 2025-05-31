import React, { useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';
import './App.css';
import Navigation from './components/Navigation';
import routes from './routes/routes';
import { ThemeProvider } from './context/ThemeContext';
import { AppointmentProvider } from './context/AppointmentContext';
import { useTheme } from './context/ThemeContext';

const AppContent = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { darkMode } = useTheme();

  // Create a theme instance based on dark/light mode preference
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          ...(darkMode
            ? {
                // Dark mode palette
                primary: {
                  main: '#90caf9',
                },
                secondary: {
                  main: '#f48fb1',
                },
                background: {
                  default: '#121212',
                  paper: '#1e1e1e',
                },
              }
            : {
                // Light mode palette
                primary: {
                  main: '#1976d2',
                },
                secondary: {
                  main: '#dc004e',
                },
                background: {
                  default: '#f5f5f5',
                  paper: '#ffffff',
                },
              }),
        },
      }),
    [darkMode]
  );

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
        <Navigation open={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

        <Box sx={{ display: 'flex' }}>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - 240px)` },
              ml: { sm: '240px' },
              mt: '64px'
            }}
          >
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Box>
        </Box>
      </div>
    </MuiThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppointmentProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AppointmentProvider>
    </ThemeProvider>
  );
}

export default App;