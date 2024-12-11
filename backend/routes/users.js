// module Express pour gérer les routes liées aux utilisateurs dans une application Node.js.
const express = require('express'); // Importation d'Express pour créer des applications web et des API
const router = express.Router(); // Création d'un routeur pour gérer les routes liées aux utilisateurs
const User = require('../models/User'); // Importation du modèle User pour interagir avec la collection d'utilisateurs dans MongoDB

// @route POST /api/users
// @desc Create a new user
// @access Public
router.post('/', async (req, res) => {
    // Endpoint : POST /api/users
    // Action : Créer un nouvel utilisateur (Create)
    try {
        const { name, email } = req.body; // Extraction des données de la requête
        const newUser = new User({ name, email }); // Création d'une nouvelle instance du modèle User
        await newUser.save(); // Sauvegarde du nouvel utilisateur dans la base de données
        res.json(newUser); // Retourne le nouvel utilisateur en JSON
    } catch (err) {
        res.status(500).json({ error: err.message }); // Gestion des erreurs et retour d'un message d'erreur
    }
});

// @route GET /api/users
// @desc Get all users
// @access Public
router.get('/', async (req, res) => {
    // Endpoint : GET /api/users
    // Action : Récupérer tous les utilisateurs (Read)
    try {
        const users = await User.find(); // Recherche de tous les utilisateurs dans la base de données
        res.json(users); // Retourne les utilisateurs en JSON
    } catch (err) {
        res.status(500).json({ error: err.message }); // Gestion des erreurs et retour d'un message d'erreur
    }
});

// @route PUT /api/users/:id
// @desc Update a user
// @access Public
router.put('/:id', async (req, res) => {
    // Endpoint : PUT /api/users/:id
    // Action : Mettre à jour un utilisateur (Update)
    try {
        const { name, email } = req.body; // Extraction des données de la requête
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, // ID de l'utilisateur à mettre à jour
            { name, email }, // Nouvelles données de l'utilisateur
            { new: true } // Retourner le document mis à jour
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' }); // Gestion du cas où l'utilisateur n'est pas trouvé
        }
        res.json(updatedUser); // Retourne l'utilisateur mis à jour en JSON
    } catch (err) {
        res.status(500).json({ error: err.message }); // Gestion des erreurs et retour d'un message d'erreur
    }
});

// @route DELETE /api/users/:id
// @desc Delete a user
// @access Public
router.delete('/:id', async (req, res) => {
    // Endpoint : DELETE /api/users/:id
    // Action : Supprimer un utilisateur (Delete)
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id); // Suppression de l'utilisateur par son ID
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' }); // Gestion du cas où l'utilisateur n'est pas trouvé
        }
        res.json({ message: 'User deleted successfully' }); // Retour d'un message de succès en JSON
    } catch (err) {
        res.status(500).json({ error: err.message }); // Gestion des erreurs et retour d'un message d'erreur
    }
});

module.exports = router; // Exportation du routeur pour utilisation dans l'application principale
