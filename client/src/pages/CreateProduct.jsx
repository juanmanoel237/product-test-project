import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';

const CreateProduct = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    rating: '',
    warranty_years: '',
    available: false,
  });
  const [error, setError] = useState('');

  const { name, type, price, rating, warranty_years, available } = formData;

  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData({
      ...formData,
      [name]: inputType === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(
        'http://localhost:5000/api/products',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate('/products');
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création du produit.');
    }
  };

  return (
    <Box 
      sx={{ 
        maxWidth: 600, 
        margin: 'auto', 
        padding: 3, 
        borderRadius: 2, 
        boxShadow: 3, 
        bgcolor: 'background.paper' 
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Ajouter un Nouveau Produit
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nom du produit"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
        <TextField
          label="Type"
          variant="outlined"
          fullWidth
          margin="normal"
          name="type"
          value={type}
          onChange={handleChange}
          required
        />
        <TextField
          label="Prix"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          name="price"
          value={price}
          onChange={handleChange}
          required
        />
        <TextField
          label="Note (sur 5)"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          name="rating"
          value={rating}
          onChange={handleChange}
          required
          inputProps={{ min: 0, max: 5, step: 0.1 }}
        />
        <TextField
          label="Années de garantie"
          type="number"
          variant="outlined"
          fullWidth
          margin="normal"
          name="warranty_years"
          value={warranty_years}
          onChange={handleChange}
          required
        />
        <Box display="flex" alignItems="center" marginY={2}>
          <label>
            <input
              type="checkbox"
              name="available"
              checked={available}
              onChange={handleChange}
              style={{ marginRight: 8 }}
            />
            Produit disponible ?
          </label>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Ajouter le Produit
        </Button>
      </form>
    </Box>
  );
};

export default CreateProduct;
