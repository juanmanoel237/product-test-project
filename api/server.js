const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const socketIo = require('socket.io')
const dotenv = require('dotenv');
const http = require('http');

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

// Injecter l'instance de io dans les routes
app.use('/api/auth', authRoutes);
app.use('/api/products', (req, res, next) => {
  req.io = io;  // Ajouter io aux requêtes
  next();
}, productRoutes);

io.on('connection', (socket) => {
  console.log('Un utilisateur est connecté');
  
  socket.on('disconnect', () => {
    console.log('Utilisateur déconnecté');
  });
});

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connecté'))
    .catch((err) => console.log('MongoDB erreur:', err))

server.listen(PORT, () => {
    console.log(`Server tourne sur le port ${PORT}`)
})
