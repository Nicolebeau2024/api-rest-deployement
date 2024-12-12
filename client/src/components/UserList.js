import React from 'react'; // Importation de la bibliothèque React pour créer des composants

// Composant UserList pour afficher la liste des utilisateurs
const UserList = ({ users, editUser, deleteUser }) => {
    return (
        <div className="user-list-container"> {/* Conteneur pour la liste des utilisateurs */}
            {/* Affichage des 10 premiers utilisateurs */}
            {users.slice(0, 10).map(user => (
                <div key={user._id} className="user-card"> {/* Carte pour chaque utilisateur */}
                    <h5 className="card-title">{user.name}</h5> {/* Nom de l'utilisateur */}
                    <p className="card-text">{user.email}</p> {/* Email de l'utilisateur */}
                    <button className="btn btn-primary" onClick={() => editUser(user._id)}>Edit</button> {/* Bouton pour éditer l'utilisateur */}
                    <button className="btn btn-danger" onClick={() => deleteUser(user._id)}>Delete</button> {/* Bouton pour supprimer l'utilisateur */}
                </div>
            ))}
        </div>
    );
};

export default UserList; // Exportation du composant UserList pour l'utiliser dans d'autres parties de l'application
