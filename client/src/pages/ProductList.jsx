import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Récupération des produits
  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors de la récupération des produits:', err);
      setLoading(false);
    }
  };

  // Suppression d'un produit
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // Mise à jour de la liste après suppression
      setProducts(products.filter((product) => product._id !== productId));
    } catch (err) {
      console.error('Erreur lors de la suppression du produit:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Liste des Produits
      </Typography>
      {/* Conteneur principal avec CSS Grid */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
        gap={16} // Espacement entre les cartes
      >
        {products.map((product) => (
          <Card key={product._id}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Type : {product.type}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Prix : {product.price} €
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Note : {product.rating} / 5
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Garantie : {product.warranty_years} an(s)
              </Typography>
              <Typography variant="body2" color={product.available ? 'green' : 'red'}>
                {product.available ? 'Disponible' : 'Indisponible'}
              </Typography>
              <Box marginTop={2}>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => deleteProduct(product._id)}
                >
                  Supprimer
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ProductList;
