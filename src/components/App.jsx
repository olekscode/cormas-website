import React from 'react';
import { useState } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ApproachPage from './pages/ApproachPage';
import ModelsPage from './pages/ModelsPage';
import Page from './Page';

import * as ROUTES from '../constants/routes';


const theme = createTheme({
  palette: {
    primary: {
      main: '#26a232',
    },
    secondary: {
      main: '#e90061',
    },
  },
});


export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline enableColorScheme />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh'
          }}
        >
          <Header/>
          <Navigation/>
          <Container>
            <Box sx={{ maxWidth: '500vh' }}>
              <Routes>
                <Route exact path={ROUTES.HOME} element={ <HomePage/> } />
                <Route exact path={ROUTES.LOGIN} element={ <LoginPage setIsAuth={setIsAuth} /> } />
                <Route exact path={ROUTES.APPROACH} element={ <ApproachPage/> } />
                <Route exact path={ROUTES.MODELS} element={ <ModelsPage/> } />
                <Route exact path={'/:id'} element={ <Page/> } />
              </Routes>
            </Box>
          </Container>
          <Footer/>
        </Box>
      </Router>
    </ThemeProvider>
  );
}
