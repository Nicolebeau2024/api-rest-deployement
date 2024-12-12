import React, { useState, useEffect } from 'react'; // Importation de React, du hook useState pour gérer l'état local, et useEffect pour les effets secondaires
/* import axios from 'axios'; // Importation d'axios pour les requêtes HTTP */

// Composant UserEdit pour éditer les détails d'un utilisateur
const UserEdit = ({ user, onUpdate }) => {
    // États locaux pour stocker les valeurs du nom et de l'email
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    // Effet secondaire pour mettre à jour les champs lorsque l'utilisateur change
    useEffect(() => {
        setName(user.name); // Met à jour le nom lorsque le prop user change
        setEmail(user.email); // Met à jour l'email lorsque le prop user change
    }, [user]);

    // Fonction pour gérer la mise à jour de l'utilisateur
    const handleEdit = async () => {
        try {
            const updatedUser = { ...user, name, email }; // Crée un objet utilisateur mis à jour avec les nouvelles valeurs
            await onUpdate(updatedUser); // Appelle la fonction onUpdate passée en prop avec l'utilisateur mis à jour
        } catch (error) {
            console.error('Error updating user:', error); // Affiche une erreur si la mise à jour échoue
        }
    };

    return (
        <div>
            <h2>Edit User</h2> {/* Titre pour la section d'édition */}
            <div className="form-group"> {/* Groupe de champs pour le nom */}
                <label>Name</label> {/* Étiquette pour le champ du nom */}
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                /> {/* Champ de texte pour le nom */}
            </div>
            <div className="form-group"> {/* Groupe de champs pour l'email */}
                <label>Email</label> {/* Étiquette pour le champ de l'email */}
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /> {/* Champ de texte pour l'email */}
            </div>
            <button onClick={handleEdit} className="btn btn-primary">Save</button> {/* Bouton pour enregistrer les modifications */}
        </div>
    );
};

export default UserEdit; // Exportation du composant UserEdit pour l'utiliser dans d'autres parties de l'application
