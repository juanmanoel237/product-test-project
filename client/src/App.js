import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Register from './pages/Register';
import Login from './pages/Login';
import EditProduct from './pages/EditProduct';
import ProductList from './pages/ProductList';
import CreateProduct from './pages/CreateProduct';
import { CssBaseline, Container, Box } from '@mui/material'; // Import de MUI
import './App.css';

function App() {
  return (
    <Router>
      {/* Ajout de CssBaseline pour normaliser les styles globaux */}
      <CssBaseline />
      
      <div className="App">
        {/* Header avec MUI */}
        <Header />
        
        {/* Conteneur principal pour le contenu */}
        <Container component="main" sx={{ mt: 4, mb: 4 }}>
          <Box>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Box>
        </Container>
        
        {/* Footer avec MUI */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
