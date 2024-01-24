import React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import logo from '../img/logo.jpeg';

export default function Header() {
  return(
    <Container>
      <Box sx={{ width: "100%", mt: 1.5 }}>
        <Grid container spacing={2}>
          <Grid item xs={3} md={1}>
            <Avatar alt="logo" src={logo} sx={{ width: 80, height: 80 }} />
          </Grid>
          <Grid item container xs={9} md={11}>
            <Grid item xs={12}>
              <Typography variant="h5">CORMAS</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h7" gutterBottom>Natural Resources and Agent-Based Simulations</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}