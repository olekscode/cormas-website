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

import Home from './pages/Home';
import Login from './pages/Login';
import Approach from './pages/Approach';
import Models from './pages/Models';
import Pages from './pages/Pages';
import Page from './pages/Page';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';

import * as ROUTES from '../constants/routes';

export default function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

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
            <Route exact path={ROUTES.HOME} element={ <Home/> } />
            <Route exact path={ROUTES.LOGIN} element={ <Login setIsAuth={setIsAuth} /> } />
            <Route exact path={ROUTES.APPROACH} element={ <Approach/> } />
            <Route exact path={ROUTES.MODELS} element={ <Models/> } />
            <Route exact path={ROUTES.PAGES} element={ <Pages isAuth={isAuth} /> } />
            <Route exact path={ROUTES.CREATE_PAGE} element={ <CreatePage isAuth={isAuth} /> } />
            <Route exact path={ROUTES.EDIT_PAGE} element={ <EditPage isAuth={isAuth} /> } />
            <Route exact path={ROUTES.PAGE} element={ <Page/> } />
          </Routes>
        </Box>
      </Container>
      <Footer/>
    </Box>
  );
}
