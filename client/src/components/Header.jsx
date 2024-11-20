import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo */}
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          Gestionnaire de produits
        </Typography>

        {/* Navigation */}
        <Box>
          <Button
            color="inherit"
            component={Link}
            to="/products"
          >
            Produits
          </Button>
          {token ? (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/create-product"
              >
                Ajouter un produit
              </Button>
              <Button
                color="inherit"
                onClick={handleLogout}
              >
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                component={Link}
                to="/register"
              >
                Inscription
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/login"
              >
                Connexion
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
