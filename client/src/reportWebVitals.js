const reportWebVitals = onPerfEntry => {
  // Vérifie si onPerfEntry est défini et est une fonction
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Importation dynamique du module 'web-vitals'
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Appel de chaque fonction de web vitals, en passant la fonction onPerfEntry
      getCLS(onPerfEntry); // Mesure du Cumulative Layout Shift (Changement de mise en page cumulatif)
      getFID(onPerfEntry); // Mesure du First Input Delay (Délai de la première interaction)
      getFCP(onPerfEntry); // Mesure du First Contentful Paint (Premier rendu de contenu)
      getLCP(onPerfEntry); // Mesure du Largest Contentful Paint (Rendu du plus grand élément de contenu)
      getTTFB(onPerfEntry); // Mesure du Time to First Byte (Temps avant le premier octet reçu)
    });
  }
};

export default reportWebVitals; // Exporte la fonction reportWebVitals comme exportation par défaut
