import React from 'react';
import { useState } from 'react';
import { signOut } from 'firebase/auth';

import {
  Route,
  Routes,
  useNavigate
} from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { auth } from '../firebase-config';

import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ApproachPage from './pages/ApproachPage';
import ModelsPage from './pages/ModelsPage';
import Page from './Page';

import * as ROUTES from '../constants/routes';

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  let navigate = useNavigate();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate(ROUTES.LOGIN);
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }}
    >
      <Header/>
      <Navigation isAuth={isAuth} signUserOut={signUserOut} />
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
  );
}
