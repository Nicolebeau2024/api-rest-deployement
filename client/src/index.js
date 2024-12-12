import React from 'react'; // Importation de la bibliothèque React pour construire les composants d'interface utilisateur
import ReactDOM from 'react-dom/client'; // Importation de ReactDOM pour rendre les composants React dans le DOM
import './index.css'; // Importation des styles globaux pour l'application
import App from './App'; // Importation du composant principal de l'application
import reportWebVitals from './reportWebVitals'; // Importation de la fonction pour mesurer les performances de l'application
import './theme.css'; // Importation des styles thématiques supplémentaires

// Création de la racine pour le rendu de l'application
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendu de l'application dans le DOM, en utilisant React StrictMode pour activer les vérifications et les avertissements supplémentaires
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Si vous souhaitez commencer à mesurer la performance de votre application, passez une fonction
// pour enregistrer les résultats (par exemple : reportWebVitals(console.log))
// ou envoyez-les à un point de terminaison d'analyse. En savoir plus : https://bit.ly/CRA-vitals
reportWebVitals();
