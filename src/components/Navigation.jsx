import React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';

import PAGES from '../constants/pages';
import * as ROUTES from '../constants/routes';

export default function Navigation({isAuth, signUserOut}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logInButton = (
    <Button
      onClick={handleCloseNavMenu}
      component={Link}
      to={ROUTES.LOGIN}
      color="inherit"
    >
     {'Login'}
    </Button>
  );

  const logOutButton = (
    <Button onClick={ signUserOut } color="inherit">Log out</Button>
  );

  const createPageButton = (
    <Button
      onClick={handleCloseNavMenu}
      component={Link}
      to={ROUTES.CREATE_PAGE}
      color="inherit"
    >
      {'New Page'}
    </Button>
  );

  console.log(isAuth);

  return (
    <AppBar position="static" color="primary" sx={{ boxShadow: 1, mb: 3, mt: 1 }}>
      <Container>
        <Toolbar disableGutters variant="dense">
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="main menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {PAGES.map((page) => (
                <MenuItem key={page.title} component={Link} to={page.route} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {PAGES.map((page) => (
              <Button
                key={page.title}
                onClick={handleCloseNavMenu}
                component={Link}
                to={page.route}
                color="inherit"
              >
                {page.title}
              </Button>
            ))}
          </Box>

          { isAuth && createPageButton }
          <Button variant="text" color="inherit" startIcon={<LanguageIcon/>}>EN</Button>
          { isAuth ?  logOutButton : logInButton }
        </Toolbar>
      </Container>
    </AppBar>
  );
}