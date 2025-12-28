// Gestion des thèmes
const themeTabs = document.querySelectorAll('.theme-tab');
const body = document.body;
const stormOverlay = document.querySelector('.storm-overlay');
const snowflakesContainer = document.querySelector('.snowflakes-container');
const sunContainer = document.querySelector('.sun-container');
const sun = document.getElementById('sun');
const starsContainer = document.querySelector('.stars-container');
const sandContainer = document.querySelector('.sand-container');

// Variables pour Markarane
let dayCycleInterval = null;
let dayCyclePaused = false;
let currentPhase = 'day'; // 'day', 'sunset', 'night', 'sunrise'
let cycleProgress = 0; // 0 à 120 secondes (2 minutes)
let sandStormInterval = null;
let sandStormTimeouts = []; // Pour stocker tous les timeouts des tempêtes de sable

// Fonction de nettoyage complète pour tous les thèmes
function cleanupAllThemes() {
    // Nettoyer tous les conteneurs d'animations
    snowflakesContainer.innerHTML = '';
    starsContainer.innerHTML = '';
    sandContainer.innerHTML = '';
    
    // Arrêter le cycle Markarane
    if (dayCycleInterval) {
        clearInterval(dayCycleInterval);
        dayCycleInterval = null;
    }
    
    // Arrêter toutes les tempêtes de sable
    if (sandStormInterval) {
        clearTimeout(sandStormInterval);
        sandStormInterval = null;
    }
    
    // Nettoyer tous les timeouts de tempête de sable
    sandStormTimeouts.forEach(timeout => clearTimeout(timeout));
    sandStormTimeouts = [];
    
    // Réinitialiser les variables Markarane
    dayCyclePaused = false;
    cycleProgress = 0;
    currentPhase = 'day';
    
    // Retirer toutes les classes de phase de body
    body.classList.remove('sunset', 'night', 'sunrise');
    
    // Réinitialiser le style et la position du soleil
    sun.style.transform = 'scale(1)';
    sun.style.filter = 'brightness(1)';
    sunContainer.style.left = '50%';
    sunContainer.style.top = '80px';
}

// Fonction pour créer des flocons de neige (Windress)
function createSnowflakes() {
    snowflakesContainer.innerHTML = '';
    const numberOfFlakes = 50;
    
    for (let i = 0; i < numberOfFlakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = '❄';
        snowflake.style.left = Math.random() * 100 + '%';
        const duration = 5 + Math.random() * 10;
        snowflake.style.animationDuration = duration + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        const size = 0.5 + Math.random() * 1.5;
        snowflake.style.fontSize = size + 'em';
        snowflakesContainer.appendChild(snowflake);
    }
}

// Fonction pour créer des braises (Pylorianne)
function createEmbers() {
    snowflakesContainer.innerHTML = '';
    const numberOfEmbers = 40;
    
    for (let i = 0; i < numberOfEmbers; i++) {
        const ember = document.createElement('div');
        ember.className = 'ember';
        ember.textContent = '🔥';
        ember.style.left = Math.random() * 100 + '%';
        const duration = 4 + Math.random() * 8;
        ember.style.animationDuration = duration + 's';
        ember.style.animationDelay = Math.random() * 4 + 's';
        const size = 0.4 + Math.random() * 1.2;
        ember.style.fontSize = size + 'em';
        snowflakesContainer.appendChild(ember);
    }
}

// Fonction pour créer des étoiles (Arzass)
function createStars() {
    snowflakesContainer.innerHTML = '';
    const numberOfStars = 60;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.textContent = '✨';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        const duration = 2 + Math.random() * 4;
        star.style.animationDuration = duration + 's';
        star.style.animationDelay = Math.random() * 3 + 's';
        const size = 0.5 + Math.random() * 1;
        star.style.fontSize = size + 'em';
        snowflakesContainer.appendChild(star);
    }
}

// Fonction pour jouer l'animation de transition
function playTransitionAnimation(overlayClass) {
    stormOverlay.className = 'storm-overlay active ' + overlayClass;
    
    setTimeout(() => {
        stormOverlay.className = 'storm-overlay';
    }, 3000);
}

// Gestion du clic sur les onglets
themeTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const theme = this.dataset.theme;
        
        // NETTOYER COMPLÈTEMENT tous les thèmes précédents
        cleanupAllThemes();
        
        // Retirer la classe active de tous les onglets
        themeTabs.forEach(t => t.classList.remove('active'));
        
        // Ajouter la classe active à l'onglet cliqué
        this.classList.add('active');
        
        // Retirer tous les thèmes du body
        body.className = '';
        
        // Appliquer le thème sélectionné
        if (theme === 'windress') {
            playTransitionAnimation('');
            setTimeout(() => {
                body.classList.add('theme-windress');
                createSnowflakes();
            }, 1500);
            
        } else if (theme === 'pylorianne') {
            playTransitionAnimation('fire');
            setTimeout(() => {
                body.classList.add('theme-pylorianne');
                createEmbers();
            }, 1500);
            
        } else if (theme === 'arzass') {
            playTransitionAnimation('night');
            setTimeout(() => {
                body.classList.add('theme-arzass');
                createStars();
            }, 1500);
            
        } else if (theme === 'markarane') {
            playTransitionAnimation('sand');
            setTimeout(() => {
                body.classList.add('theme-markarane');
                startMarkaraneCycle();
                startSandStorm();
            }, 1500);
            
        } else if (theme === 'base') {
            // Le thème de base est déjà nettoyé, rien à faire
        }
    });
});

// Initialiser avec le thème de base
document.addEventListener('DOMContentLoaded', function() {
    // Rien à faire au chargement initial
});

// ============================================
// FONCTIONS POUR LE THÈME MARKARANE (DÉSERT)
// ============================================

// Créer les étoiles pour la nuit
function createNightStars() {
    starsContainer.innerHTML = '';
    const numberOfStars = 100;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'night-star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 60 + '%'; // Seulement dans la partie haute
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (2 + Math.random() * 4) + 's';
        starsContainer.appendChild(star);
    }
}

// Mettre à jour le cycle jour/nuit
function updateDayCycle() {
    if (dayCyclePaused) return;
    
    cycleProgress += 0.1; // Incrémente de 0.1 secondes
    
    // Cycle total : 120 secondes (2 minutes)
    // 0-60s : jour (soleil se déplace de zenith à coucher)
    // 60-120s : nuit (lune se déplace de lever à coucher)
    
    if (cycleProgress >= 120) {
        cycleProgress = 0;
    }
    
    // Calculer la position du soleil/lune (de 50% à droite puis de gauche à 50%)
    let position;
    
    if (cycleProgress <= 60) {
        // Jour : de 50% (zenith) à 100% (coucher à droite)
        position = 50 + (cycleProgress / 60) * 50;
        
        // Phases du jour
        if (cycleProgress < 40) {
            currentPhase = 'day';
            body.classList.remove('sunset', 'night');
        } else {
            currentPhase = 'sunset';
            body.classList.add('sunset');
            body.classList.remove('night');
        }
        
    } else {
        // Nuit : de 0% (lever à gauche) à 50% (zenith lunaire)
        position = ((cycleProgress - 60) / 60) * 50;
        currentPhase = 'night';
        body.classList.add('night');
        body.classList.remove('sunset');
        
        // Créer les étoiles si pas encore fait
        if (cycleProgress === 60.1 || (cycleProgress > 60 && cycleProgress < 61 && starsContainer.children.length === 0)) {
            createNightStars();
        }
    }
    
    // Positionner le soleil/lune
    sunContainer.style.left = position + '%';
    
    // Ajuster la hauteur en fonction de la position (arc de cercle)
    // Au centre (50%), le soleil est au zénith (top: 80px)
    // Aux extrémités (0% ou 100%), le soleil est au coucher/lever (top: 200px)
    const distanceFromCenter = Math.abs(position - 50);
    const height = 80 + (distanceFromCenter / 50) * 120;
    sunContainer.style.top = height + 'px';
}

// Démarrer le cycle jour/nuit
function startMarkaraneCycle() {
    cycleProgress = 0; // Commencer au zénith (milieu du jour)
    dayCyclePaused = false;
    currentPhase = 'day';
    body.classList.remove('sunset', 'night');
    starsContainer.innerHTML = '';
    
    // Mettre à jour toutes les 100ms
    dayCycleInterval = setInterval(updateDayCycle, 100);
}

// Créer une tempête de sable
function createSandStorm(direction = 'right', duration = 2000) {
    sandContainer.innerHTML = '';
    const numberOfGrains = 150;
    
    for (let i = 0; i < numberOfGrains; i++) {
        const grain = document.createElement('div');
        grain.className = 'sand-grain';
        
        // Position verticale aléatoire
        grain.style.top = Math.random() * 100 + '%';
        
        // Position de départ selon la direction
        if (direction === 'right') {
            grain.style.left = '-5px';
        } else {
            grain.style.left = '100%';
        }
        
        // Animation
        const speed = duration + Math.random() * 1000;
        grain.style.transition = `left ${speed}ms linear`;
        
        sandContainer.appendChild(grain);
        
        // Démarrer l'animation
        setTimeout(() => {
            if (direction === 'right') {
                grain.style.left = '105%';
            } else {
                grain.style.left = '-5%';
            }
        }, 50);
    }
    
    // Nettoyer après l'animation
    setTimeout(() => {
        sandContainer.innerHTML = '';
    }, duration + 1000);
}

// Gérer les patterns de tempête de sable
function startSandStorm() {
    const patterns = [
        // Pattern 1: droite -> pause -> droite
        () => {
            createSandStorm('right', 2000);
            const t1 = setTimeout(() => createSandStorm('right', 2000), 4000);
            sandStormTimeouts.push(t1);
        },
        // Pattern 2: gauche -> pause -> gauche -> pause -> gauche
        () => {
            createSandStorm('left', 2000);
            const t1 = setTimeout(() => createSandStorm('left', 2000), 4000);
            const t2 = setTimeout(() => createSandStorm('left', 2000), 8000);
            sandStormTimeouts.push(t1, t2);
        },
        // Pattern 3: droite -> pause -> gauche
        () => {
            createSandStorm('right', 2000);
            const t1 = setTimeout(() => createSandStorm('left', 2000), 4000);
            sandStormTimeouts.push(t1);
        },
        // Pattern 4: gauche seul
        () => {
            createSandStorm('left', 2500);
        },
        // Pattern 5: droite -> droite -> droite
        () => {
            createSandStorm('right', 1800);
            const t1 = setTimeout(() => createSandStorm('right', 1800), 3000);
            const t2 = setTimeout(() => createSandStorm('right', 1800), 6000);
            sandStormTimeouts.push(t1, t2);
        },
        // Pattern 6: pause longue (rien)
        () => {
            // Juste une pause
        }
    ];
    
    function triggerRandomPattern() {
        const randomPattern = patterns[Math.floor(Math.random() * patterns.length)];
        randomPattern();
        
        // Prochain pattern dans 8-15 secondes
        const nextDelay = 8000 + Math.random() * 7000;
        sandStormInterval = setTimeout(triggerRandomPattern, nextDelay);
        sandStormTimeouts.push(sandStormInterval);
    }
    
    // Démarrer le premier pattern après 2 secondes
    const initialTimeout = setTimeout(triggerRandomPattern, 2000);
    sandStormTimeouts.push(initialTimeout);
}

// Gestion du clic sur le soleil pour bloquer le cycle
sun.addEventListener('click', function(e) {
    e.stopPropagation();
    if (body.classList.contains('theme-markarane')) {
        dayCyclePaused = !dayCyclePaused;
        
        // Feedback visuel
        if (dayCyclePaused) {
            sun.style.transform = 'scale(1.2)';
            sun.style.filter = 'brightness(1.3)';
        } else {
            sun.style.transform = 'scale(1)';
            sun.style.filter = 'brightness(1)';
        }
    }
});