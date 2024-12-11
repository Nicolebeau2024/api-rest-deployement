import React, { useState } from 'react'; // Importation de React et du hook useState pour gérer l'état local
import exampleImage from '../assets/images/p8.png'; // Importation d'une image d'exemple pour l'affichage

// Composant UserForm pour ajouter un nouvel utilisateur
const UserForm = ({ addUser }) => {
    // États locaux pour stocker les valeurs des champs du formulaire
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du formulaire (rechargement de la page)
        addUser({ name, email }); // Appelle la fonction addUser passée en prop avec les valeurs des champs
        setName(''); // Réinitialise le champ du nom
        setEmail(''); // Réinitialise le champ de l'email
    };

    return (
        <div className="user-form-container"> {/* Conteneur principal du formulaire */}
            <img src={exampleImage} alt="Example" style={{ width: '70%', height: '190px', margin: '0 0% 0 0%' }} /> {/* Affichage de l'image d'exemple */}
            <form onSubmit={handleSubmit}> {/* Formulaire avec gestion de la soumission */}
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
                <button type="submit" className="btn btn-primary">Add User</button> {/* Bouton pour soumettre le formulaire */}
            </form>
        </div>
    );
};

export default UserForm; // Exportation du composant UserForm pour l'utiliser dans d'autres parties de l'application
