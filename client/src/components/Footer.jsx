import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        mt: 4,
        backgroundColor: 'primary.main',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Container>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Gestionnaire de produits. Tous droits réservés.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
