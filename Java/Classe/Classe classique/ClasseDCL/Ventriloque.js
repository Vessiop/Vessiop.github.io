// Création du graphique radar des caractéristiques
const ctx = document.getElementById('statsChart').getContext('2d');

// Données de base du Ventriloque (échelle de -4 à +6)
const baseStats = {
    FOR: -3,
    CST: -2,
    DEX: 3,
    INT: 3,
    SAG: -3,
    PER: 3,
    CHA: -3
};

// Bonus des origines
const originBonuses = {
    'village': { INT: 3, PER: 3, CST: 3 },
    'cocon': { DEX: 3, PER: 3, INT: 3 },
    'clinique': { INT: 3, CST: 3, DEX: 3 },
    'tribu': { SAG: 3, PER: 3, INT: 3 }
};

// Noms des origines pour l'affichage
const originNames = {
    'village': 'Ventriloque de Nid (Village "protégé par la Voix")',
    'cocon': 'Cocon Errant (Duo/Trio de Ventriloques)',
    'clinique': 'Clinique des Chirurgiens de la Mort',
    'tribu': 'Enfant du Son (Tribu vouée à une Anirvak)'
};

let currentOrigin = null;

// Fonction pour calculer les stats avec bonus
function calculateStats(origin) {
    const stats = { ...baseStats };
    if (origin && originBonuses[origin]) {
        const bonuses = originBonuses[origin];
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
            backgroundColor: 'rgba(90, 143, 106, 0.25)',
            borderColor: 'rgba(90, 143, 106, 1)',
            borderWidth: 3,
            pointBackgroundColor: 'rgba(90, 143, 106, 1)',
            pointBorderColor: '#d4d9d0',
            pointHoverBackgroundColor: '#d4d9d0',
            pointHoverBorderColor: 'rgba(90, 143, 106, 1)',
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
                    color: 'rgba(90, 143, 106, 0.5)',
                    circular: true
                },
                angleLines: {
                    color: 'rgba(90, 143, 106, 0.5)'
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
                borderColor: 'rgba(90, 143, 106, 0.8)',
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
function updateChart(origin) {
    const newStats = calculateStats(origin);
    statsChart.data.datasets[0].data = convertStatsForChart(newStats);
    statsChart.update();
    currentOrigin = origin;
    
    // Mettre à jour l'indicateur visuel
    updateOriginSelection(origin);
    updateStatsDisplay(origin);
}

// Fonction pour mettre à jour l'affichage de la sélection
function updateOriginSelection(origin) {
    // Retirer la classe selected de toutes les cartes
    document.querySelectorAll('.origin-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Ajouter la classe selected à la carte choisie
    if (origin) {
        const selectedCard = document.querySelector(`.origin-card.${origin}`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// Fonction pour afficher les stats actuelles
function updateStatsDisplay(origin) {
    const displayElement = document.getElementById('current-origin-display');
    if (!displayElement) return;

    if (origin) {
        const stats = calculateStats(origin);
        const bonuses = originBonuses[origin];
        let bonusText = '';
        
        for (let stat in bonuses) {
            bonusText += `${stat} +${bonuses[stat]} `;
        }
        
        displayElement.innerHTML = `
            <strong>Origine sélectionnée :</strong> ${originNames[origin]}<br>
            <strong>Bonus appliqués :</strong> ${bonusText}
        `;
        displayElement.style.display = 'block';
    } else {
        displayElement.innerHTML = '<strong>Aucune origine sélectionnée</strong> - Stats de base affichées';
        displayElement.style.display = 'block';
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const originCards = document.querySelectorAll('.origin-card');
    
    // Ajouter les événements de clic sur les cartes d'origine
    originCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function() {
            const originClass = Array.from(this.classList).find(cls => 
                ['village', 'cocon', 'clinique', 'tribu'].includes(cls)
            );
            
            if (originClass) {
                // Si on clique sur l'origine déjà sélectionnée, on la désélectionne
                if (currentOrigin === originClass) {
                    updateChart(null);
                } else {
                    updateChart(originClass);
                }
            }
        });
    });

    // Créer l'élément d'affichage de l'origine sélectionnée
    const chartContainer = document.querySelector('.chart-container');
    const displayDiv = document.createElement('div');
    displayDiv.id = 'current-origin-display';
    displayDiv.style.marginTop = '20px';
    displayDiv.style.padding = '15px';
    displayDiv.style.background = 'rgba(45, 90, 61, 0.2)';
    displayDiv.style.borderRadius = '6px';
    displayDiv.style.textAlign = 'center';
    displayDiv.style.fontSize = '0.95rem';
    displayDiv.style.display = 'none';
    displayDiv.style.border = '1px solid rgba(45, 90, 61, 0.4)';
    chartContainer.appendChild(displayDiv);

    // Initialiser l'affichage
    updateStatsDisplay(null);
});