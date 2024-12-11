const mongoose = require('mongoose'); // Importation de Mongoose pour interagir avec MongoDB

// Définition du schéma pour le modèle User
const UserSchema = new mongoose.Schema({
    name: {
        type: String, // Le champ "name" est de type String
        required: true // Le champ "name" est requis
    },
    email: {
        type: String, // Le champ "email" est de type String
        required: true // Le champ "email" est requis
    }
});

// Création du modèle User basé sur le schéma défini
// "User" est le nom du modèle, qui sera utilisé pour interagir avec la collection "users" dans MongoDB
module.exports = mongoose.model('User', UserSchema);
