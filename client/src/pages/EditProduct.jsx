import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Alert, CircularProgress } from '@mui/material';

const EditProduct = () => {
  const { id } = useParams(); // Récupérer l'ID depuis l'URL
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { name, type, price, rating, warranty_years, available } = formData;

  // Récupération des données du produit
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFormData(res.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des données du produit.');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, token]);

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    setFormData({
      ...formData,
      [name]: inputType === 'checkbox' ? checked : value,
    });
  };

  // Envoi des données modifiées
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    try {
      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage('Produit mis à jour avec succès.');
      setTimeout(() => {
        navigate('/products');
      }, 2000); // Redirection après 2 secondes
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la mise à jour du produit.');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

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
        Modifier le Produit
      </Typography>
      {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
      {successMessage && <Alert severity="success" sx={{ marginBottom: 2 }}>{successMessage}</Alert>}
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
          Enregistrer les modifications
        </Button>
      </form>
    </Box>
  );
};

export default EditProduct;
