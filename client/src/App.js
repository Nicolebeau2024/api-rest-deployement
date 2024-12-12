import React, { useState, useEffect } from 'react'; // Importation des hooks React pour gérer l'état et les effets secondaires
import axios from 'axios'; // Importation de la bibliothèque Axios pour effectuer des requêtes HTTP
import UserForm from './components/UserForm'; // Importation du composant pour ajouter un utilisateur
import UserEdit from './components/UserEdit'; // Importation du composant pour éditer un utilisateur
import UserList from './components/UserList'; // Importation du composant pour afficher la liste des utilisateurs
import exampleVideo from './assets/videos/example2.mp4'; // Importation d'une vidéo d'exemple pour l'arrière-plan
import Serpentin from './components/Serpentin'; // Importation du composant Serpentin
import './theme.css'; // Importation des styles thématiques supplémentaires

const App = () => {
    // État pour stocker les utilisateurs
    const [users, setUsers] = useState([]);
    // État pour stocker l'utilisateur sélectionné pour modification
    const [selectedUser, setSelectedUser] = useState(null);

    // Effet secondaire pour récupérer les utilisateurs lors du premier rendu du composant
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // Requête GET pour récupérer tous les utilisateurs
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data); // Mise à jour de l'état avec les utilisateurs récupérés
            } catch (error) {
                console.error('Error fetching users:', error); // Gestion des erreurs
            }
        };
        fetchUsers(); // Appel de la fonction pour récupérer les utilisateurs
    }, []); // Tableau de dépendances vide, l'effet s'exécute uniquement au premier rendu

    // Fonction pour ajouter un nouvel utilisateur
    const addUser = async (user) => {
        try {
            // Requête POST pour ajouter un utilisateur
            const response = await axios.post('http://localhost:5000/api/users', user);
            setUsers([...users, response.data]); // Mise à jour de l'état avec le nouvel utilisateur ajouté
        } catch (error) {
            console.error('Error adding user:', error); // Gestion des erreurs
        }
    };

    // Fonction pour mettre à jour un utilisateur existant
    const updateUser = async (updatedUser) => {
        try {
            // Requête PUT pour mettre à jour un utilisateur par son ID
            const response = await axios.put(`http://localhost:5000/api/users/${updatedUser._id}`, updatedUser);
            // Mise à jour de l'état avec l'utilisateur modifié
            setUsers(users.map(user => (user._id === updatedUser._id ? response.data : user)));
            setSelectedUser(null); // Réinitialisation de l'utilisateur sélectionné
        } catch (error) {
            console.error('Error updating user:', error); // Gestion des erreurs
        }
    };

    // Fonction pour supprimer un utilisateur
    const deleteUser = async (id) => {
        try {
            // Requête DELETE pour supprimer un utilisateur par son ID
            await axios.delete(`http://localhost:5000/api/users/${id}`);
            // Mise à jour de l'état en filtrant l'utilisateur supprimé
            setUsers(users.filter(user => user._id !== id));
        } catch (error) {
            console.error('Error deleting user:', error); // Gestion des erreurs
        }
    };

    return (
        <div id="app" className="app">
            <Serpentin /> {/* Ajout du composant Serpentin */}
            <video autoPlay loop muted className="background-video">
                <source src={exampleVideo} type="video/mp4" />
                Votre navigateur ne supporte pas la balise vidéo.
            </video>
            <div className="content">
                <UserForm addUser={addUser} /> {/* Composant pour ajouter un utilisateur */}
                {selectedUser && (
                    <UserEdit
                        user={selectedUser}
                        onUpdate={updateUser}
                    />
                )}
                <UserList
                    users={users}
                    editUser={(id) => {
                        const user = users.find(user => user._id === id);
                        setSelectedUser(user); // Sélectionne un utilisateur pour modification
                    }}
                    deleteUser={deleteUser} // Fonction pour supprimer un utilisateur
                /> {/* Composant pour afficher la liste des utilisateurs */}
            </div>
        </div>
    );
};

export default App; // Exportation du composant principal de l'application
