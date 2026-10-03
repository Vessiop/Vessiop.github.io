// Création du graphique radar des caractéristiques
const ctx = document.getElementById('statsChart').getContext('2d');

// Données de base du Liant (échelle de -4 à +6)
const baseStats = {
    FOR: -2,
    CST: -1,
    DEX: 0,
    INT: -2,
    SAG: 3,
    PER: 2,
    CHA: 3
};

// Bonus des départs animaliers
const departBonuses = {
    'depart-a': { CHA: 3, SAG: 2 },
    'depart-b': { PER: 3, DEX: 2 },
    'depart-c': { CST: 4, SAG: 2 },
    'depart-d': { FOR: 5, DEX: 2 }, // FOR -2 devient +3
    'depart-e': { INT: 5, SAG: 2 }
};

// Noms des départs pour l'affichage
const departNames = {
    "depart-a": "Compagnon de Longue Route",
    "depart-b": "Sillage des Hurons Gris",
    "depart-c": "Frontière Indomptée",
    "depart-d": "Appel des Montures Oubliées",
    "depart-e": "Sillage des Arcaniums"
};

const departDetails = {
    "depart-a": "Écho de Longue Route ; Entente Instinctive ; +1 Social, Instinct ou Sang-Froid au choix.",
    "depart-b": "Sillage de la Proie ; Flair de Liance : Puissance optimale 1 fois par combat ; +1 Instinct, Finesse ou Métier au choix.",
    "depart-c": "Réflexe d’Adaptation : 1 PR, 1 fois par round ; hors combat sans PA, PM/PE divisés par 2 ; Ascendance de Liance ; +1 Résilience, Instinct ou Finesse au choix.",
    "depart-d": "Conduite de monture +1 ; Égide de Liance : Protection pour 1 PR, 1 fois par round ; +1 Finesse, Puissance ou Instinct au choix.",
    "depart-e": "PM 1d12 si inférieur, 2 dés de Gain de PM ; Empreinte du Milieu : 10 minutes, une par Lien ; +1 Savoir, Instinct ou Métier au choix."
};

let currentDepart = null;

// Fonction pour calculer les stats avec bonus
function calculateStats(depart) {
    const stats = { ...baseStats };
    if (depart && departBonuses[depart]) {
        const bonuses = departBonuses[depart];
        for (let stat in bonuses) {
            stats[stat] += bonuses[stat];
        }
    }
    return stats;
}

// Convertir les valeurs pour le graphique (ajouter 4 pour que 0 soit au centre)
function convertStatsForChart(stats) {
    return Object.values(stats).map(val => val + 4);
}

// Création du graphique Chart.js
const statsChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['FOR', 'CST', 'DEX', 'INT', 'SAG', 'PER', 'CHA'],
        datasets: [{
            label: 'Caractéristiques',
            data: convertStatsForChart(baseStats),
            backgroundColor: 'rgba(106, 159, 90, 0.25)',
            borderColor: 'rgba(106, 159, 90, 1)',
            borderWidth: 3,
            pointBackgroundColor: 'rgba(106, 159, 90, 1)',
            pointBorderColor: '#d4d9d0',
            pointHoverBackgroundColor: '#d4d9d0',
            pointHoverBorderColor: 'rgba(106, 159, 90, 1)',
            pointRadius: 6,
            pointHoverRadius: 8
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
            duration: 800,
            easing: 'easeInOutQuart'
        },
        scales: {
            r: {
                min: 0,
                max: 10,
                backgroundColor: 'rgba(15, 25, 18, 0.3)',
                ticks: {
                    stepSize: 2,
                    callback: function(value) {
                        return value - 4;
                    },
                    color: '#a8c4b0',
                    backdropColor: 'rgba(15, 25, 18, 0.8)',
                    font: {
                        size: 12,
                        weight: 'bold'
                    }
                },
                grid: {
                    color: 'rgba(106, 159, 90, 0.5)',
                    circular: true
                },
                angleLines: {
                    color: 'rgba(106, 159, 90, 0.5)'
                },
                pointLabels: {
                    color: '#a8c4b0',
                    font: {
                        size: 15,
                        weight: 'bold',
                        family: "'Cinzel', serif"
                    }
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(15, 25, 18, 0.95)',
                titleColor: '#a8c4b0',
                bodyColor: '#d4d9d0',
                borderColor: 'rgba(106, 159, 90, 0.8)',
                borderWidth: 2,
                callbacks: {
                    label: function(context) {
                        const actualValue = context.parsed.r - 4;
                        return context.label + ': ' + (actualValue >= 0 ? '+' : '') + actualValue;
                    }
                }
            }
        }
    }
});

// Fonction pour mettre à jour le graphique
function updateChart(depart) {
    const newStats = calculateStats(depart);
    statsChart.data.datasets[0].data = convertStatsForChart(newStats);
    statsChart.update();
    currentDepart = depart;
    
    // Mettre à jour l'indicateur visuel
    updateDepartSelection(depart);
    updateStatsDisplay(depart);
}

// Fonction pour mettre à jour l'affichage de la sélection
function updateDepartSelection(depart) {
    // Retirer la classe selected de toutes les cartes
    document.querySelectorAll('.origin-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Ajouter la classe selected à la carte choisie
    if (depart) {
        const selectedCard = document.querySelector(`.origin-card.${depart}`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// Fonction pour afficher les stats actuelles
function updateStatsDisplay(depart) {
    const displayElement = document.getElementById('current-depart-display');
    if (!displayElement) return;

    if (depart) {
        const stats = calculateStats(depart);
        const bonuses = departBonuses[depart];
        let bonusText = '';
        
        for (let stat in bonuses) {
            bonusText += `${stat} +${bonuses[stat]} `;
        }
        
        const extraInfo = '<br><strong>Gains :</strong> ' + departDetails[depart];

        displayElement.innerHTML = `
            <strong>Départ sélectionné :</strong> ${departNames[depart]}<br>
            <strong>Bonus appliqués :</strong> ${bonusText}${extraInfo}
        `;
        displayElement.style.display = 'block';
    } else {
        displayElement.innerHTML = '<strong>Aucun départ sélectionné</strong> - Stats de base affichées';
        displayElement.style.display = 'block';
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const departCards = document.querySelectorAll('.origin-card');
    
    // Ajouter les événements de clic sur les cartes de départ
    departCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function() {
            const departClass = Array.from(this.classList).find(cls => 
                Object.keys(departBonuses).includes(cls)
            );
            
            if (departClass) {
                // Si on clique sur le départ déjà sélectionné, on le désélectionne
                if (currentDepart === departClass) {
                    updateChart(null);
                } else {
                    updateChart(departClass);
                }
            }
        });
    });

    // Créer l'élément d'affichage du départ sélectionné
    const chartContainer = document.querySelector('.chart-container');
    const displayDiv = document.createElement('div');
    displayDiv.id = 'current-depart-display';
    displayDiv.style.marginTop = '20px';
    displayDiv.style.padding = '15px';
    displayDiv.style.background = 'rgba(74, 107, 58, 0.2)';
    displayDiv.style.borderRadius = '6px';
    displayDiv.style.textAlign = 'center';
    displayDiv.style.fontSize = '0.95rem';
    displayDiv.style.display = 'none';
    displayDiv.style.border = '1px solid rgba(74, 107, 58, 0.4)';
    chartContainer.appendChild(displayDiv);

    // Initialiser l'affichage
    updateStatsDisplay(null);
});
