// configurez Express pour démarrer le serveur.

require('dotenv').config(); // Charge les variables d'environnement à partir d'un fichier .env dans process.env
console.log(process.env.MONGO_URI); // Affiche la valeur de MONGO_URI pour vérifier si elle est bien lue

const express = require('express'); // Importation d'Express pour créer des applications web et des API
const mongoose = require('mongoose'); // Importation de Mongoose pour interagir avec MongoDB
const cors = require('cors'); // Importation de CORS pour gérer les en-têtes CORS

const app = express(); // Création de l'application Express
const PORT = process.env.PORT || 5000; // Définition du port à partir des variables d'environnement ou de la valeur par défaut (5000)

// Middleware
app.use(cors()); // Middleware pour permettre les requêtes cross-origin
app.use(express.json()); // Middleware pour parser les corps de requêtes JSON

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // Connexion à la base de données MongoDB
    .then(() => console.log('MongoDB connected')) // Message de succès si la connexion est établie
    .catch(err => console.log(err)); // Message d'erreur en cas de problème de connexion

// Routes
app.use('/api/users', require('./routes/users')); // Définition des routes pour les utilisateurs

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Démarrage du serveur et affichage du port utilisé
});
