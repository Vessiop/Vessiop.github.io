// Gestion des thèmes
const themeTabs = document.querySelectorAll('.theme-tab');
const body = document.body;
const stormOverlay = document.querySelector('.storm-overlay');
const snowflakesContainer = document.querySelector('.snowflakes-container');

// Fonction pour créer des flocons de neige
function createSnowflakes() {
    snowflakesContainer.innerHTML = ''; // Nettoyer les flocons existants
    
    const numberOfFlakes = 50;
    
    for (let i = 0; i < numberOfFlakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = '❄';
        
        // Position aléatoire
        snowflake.style.left = Math.random() * 100 + '%';
        
        // Durée d'animation aléatoire
        const duration = 5 + Math.random() * 10;
        snowflake.style.animationDuration = duration + 's';
        
        // Délai aléatoire
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        
        // Taille aléatoire
        const size = 0.5 + Math.random() * 1.5;
        snowflake.style.fontSize = size + 'em';
        
        snowflakesContainer.appendChild(snowflake);
    }
}

// Fonction pour jouer l'animation de tempête
function playStormAnimation() {
    stormOverlay.classList.add('active');
    
    setTimeout(() => {
        stormOverlay.classList.remove('active');
    }, 3000);
}

// Gestion du clic sur les onglets
themeTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const theme = this.dataset.theme;
        
        // Retirer la classe active de tous les onglets
        themeTabs.forEach(t => t.classList.remove('active'));
        
        // Ajouter la classe active à l'onglet cliqué
        this.classList.add('active');
        
        // Retirer tous les thèmes du body
        body.className = '';
        
        // Appliquer le thème sélectionné
        if (theme === 'windress') {
            // Jouer l'animation de tempête
            playStormAnimation();
            
            // Après l'animation, appliquer le thème et créer les flocons
            setTimeout(() => {
                body.classList.add('theme-windress');
                createSnowflakes();
            }, 1500);
            
        } else if (theme === 'base') {
            // Retour au thème de base
            snowflakesContainer.innerHTML = '';
            
        } else {
            // Autres thèmes (à développer)
            snowflakesContainer.innerHTML = '';
            body.classList.add('theme-' + theme);
        }
    });
});

// Initialiser avec le thème de base
document.addEventListener('DOMContentLoaded', function() {
    // Rien à faire au chargement initial
});