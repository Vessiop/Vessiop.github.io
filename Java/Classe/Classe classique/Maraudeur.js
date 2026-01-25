// Création du graphique radar des caractéristiques
const ctx = document.getElementById('statsChart').getContext('2d');

// Données de base du Maraudeur (échelle de -4 à +6)
const baseStats = {
    FOR: 1,
    CST: 2,
    DEX: 2,
    INT: -3,
    SAG: -2,
    PER: 2,
    CHA: 0
};

// Bonus des voies
const voieBonuses = {
    'routes': { PER: 2 },
    'flots': { CST: 2 },
    'hautes': { DEX: 2 }
};

// Noms des voies pour l'affichage
const voieNames = {
    'routes': 'Voie des Routes',
    'flots': 'Voie des Flots',
    'hautes': 'Voie des Hautes-Lignes'
};

let currentVoie = null;

// Fonction pour calculer les stats avec bonus
function calculateStats(voie) {
    const stats = { ...baseStats };
    if (voie && voieBonuses[voie]) {
        const bonuses = voieBonuses[voie];
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
            backgroundColor: 'rgba(45, 90, 74, 0.2)',
            borderColor: 'rgba(45, 90, 74, 0.8)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(45, 90, 74, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(45, 90, 74, 1)',
            pointRadius: 5,
            pointHoverRadius: 7
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
                ticks: {
                    stepSize: 2,
                    callback: function(value) {
                        return value - 4;
                    },
                    color: '#1d3a2a',
                    font: {
                        size: 11,
                        weight: 'bold'
                    }
                },
                grid: {
                    color: 'rgba(45, 90, 74, 0.2)'
                },
                angleLines: {
                    color: 'rgba(45, 90, 74, 0.2)'
                },
                pointLabels: {
                    color: '#1d3a2a',
                    font: {
                        size: 14,
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
function updateChart(voie) {
    const newStats = calculateStats(voie);
    statsChart.data.datasets[0].data = convertStatsForChart(newStats);
    statsChart.update();
    currentVoie = voie;
    
    // Mettre à jour l'indicateur visuel
    updateVoieSelection(voie);
    updateStatsDisplay(voie);
}

// Fonction pour mettre à jour l'affichage de la sélection
function updateVoieSelection(voie) {
    // Retirer la classe selected de toutes les cartes
    document.querySelectorAll('.voie-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Ajouter la classe selected à la carte choisie
    if (voie) {
        const selectedCard = document.querySelector(`.voie-card.${voie}`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// Fonction pour afficher les stats actuelles
function updateStatsDisplay(voie) {
    const displayElement = document.getElementById('current-voie-display');
    if (!displayElement) return;

    if (voie) {
        const stats = calculateStats(voie);
        const bonuses = voieBonuses[voie];
        let bonusText = '';
        
        for (let stat in bonuses) {
            bonusText += `${stat} +${bonuses[stat]} `;
        }
        
        displayElement.innerHTML = `
            <strong>Voie sélectionnée :</strong> ${voieNames[voie]}<br>
            <strong>Bonus appliqués :</strong> ${bonusText}
        `;
        displayElement.style.display = 'block';
    } else {
        displayElement.innerHTML = '<strong>Aucune voie sélectionnée</strong> - Stats de base affichées';
        displayElement.style.display = 'block';
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const voieCards = document.querySelectorAll('.voie-card');
    
    // Ajouter les événements de clic sur les cartes de voie
    voieCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function() {
            const voieClass = Array.from(this.classList).find(cls => 
                ['routes', 'flots', 'hautes'].includes(cls)
            );
            
            if (voieClass) {
                // Si on clique sur la voie déjà sélectionnée, on la désélectionne
                if (currentVoie === voieClass) {
                    updateChart(null);
                } else {
                    updateChart(voieClass);
                }
            }
        });
    });

    // Créer l'élément d'affichage de la voie sélectionnée
    const chartContainer = document.querySelector('.chart-container');
    const displayDiv = document.createElement('div');
    displayDiv.id = 'current-voie-display';
    displayDiv.style.marginTop = '20px';
    displayDiv.style.padding = '15px';
    displayDiv.style.background = 'rgba(45, 90, 74, 0.1)';
    displayDiv.style.borderRadius = '6px';
    displayDiv.style.textAlign = 'center';
    displayDiv.style.fontSize = '0.95rem';
    displayDiv.style.display = 'none';
    chartContainer.appendChild(displayDiv);

    // Initialiser l'affichage
    updateStatsDisplay(null);
});