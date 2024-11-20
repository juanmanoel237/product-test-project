import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography, Container } from '@mui/material';

const Home = () => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Bienvenue dans votre Gestionnaire de produits
        </Typography>
      </Box>
      <Button
        component={Link}
        to="/products"
        variant="contained"
        color="primary"
        size="large"
      >
        Voir les produits
      </Button>
    </Container>
  );
};

export default Home;
