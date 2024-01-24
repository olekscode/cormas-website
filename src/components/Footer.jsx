import React from 'react';
import Box from '@mui/material/Box';

import Copyright from './Copyright';

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        py: 3,
        px: 2,
        mt: 'auto',
      }}
      component="footer"
    >
      <Copyright/>
    </Box>
  );
}