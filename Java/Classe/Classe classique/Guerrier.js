// Création du graphique radar des caractéristiques
const ctx = document.getElementById('statsChart').getContext('2d');

// Données de base du Guerrier (échelle de -4 à +6)
const baseStats = {
    FOR: 2,
    CST: 1,
    DEX: 1,
    INT: -2,
    SAG: -2,
    PER: 0,
    CHA: 0
};

// Bonus des vocations
const vocationBonuses = {
    'forge': { FOR: 3 },
    'shield': { CST: 3 },
    'rogue': { DEX: 3 },
    'magic': { INT: 4 },
    'agile': { DEX: 2 },
    'stance': { CST: 2, FOR: 1 },
    'duel': {} // REA n'est pas dans le graphique
};

// Noms des vocations pour l'affichage
const vocationNames = {
    'forge': 'Voie du Forgé-Vif',
    'shield': 'Voie du Rempart Mobile',
    'rogue': 'Voie du Coup Bas Tactique',
    'magic': 'Voie de l\'Éveil Contrôlé',
    'agile': 'Voie du Corps-Route',
    'stance': 'Voie de l\'Avant-Garde',
    'duel': 'Voie du Duelliste'
};

let currentVocation = null;

// Fonction pour calculer les stats avec bonus
function calculateStats(vocation) {
    const stats = { ...baseStats };
    if (vocation && vocationBonuses[vocation]) {
        const bonuses = vocationBonuses[vocation];
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

// Création du graphique Chart.js avec thème bronze/acier
const statsChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['FOR', 'CST', 'DEX', 'INT', 'SAG', 'PER', 'CHA'],
        datasets: [{
            label: 'Caractéristiques',
            data: convertStatsForChart(baseStats),
            backgroundColor: 'rgba(184, 115, 58, 0.20)',
            borderColor: 'rgba(184, 115, 58, 0.9)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(184, 115, 58, 1)',
            pointBorderColor: 'rgba(107, 124, 138, 0.9)',
            pointHoverBackgroundColor: '#d49558',
            pointHoverBorderColor: 'rgba(212, 149, 88, 1)',
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
                backgroundColor: 'rgba(10, 8, 6, 0.6)',
                ticks: {
                    stepSize: 2,
                    callback: function(value) {
                        return value - 4;
                    },
                    color: '#b8733a',
                    backdropColor: 'rgba(10, 8, 6, 0.8)',
                    font: {
                        size: 11,
                        weight: 'bold'
                    }
                },
                grid: {
                    color: 'rgba(107, 124, 138, 0.3)',
                    circular: true
                },
                angleLines: {
                    color: 'rgba(107, 124, 138, 0.3)'
                },
                pointLabels: {
                    color: '#b0bfc8',
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
                backgroundColor: 'rgba(10, 8, 6, 0.95)',
                titleColor: '#d49558',
                bodyColor: '#d4caba',
                borderColor: 'rgba(184, 115, 58, 0.8)',
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
function updateChart(vocation) {
    const newStats = calculateStats(vocation);
    statsChart.data.datasets[0].data = convertStatsForChart(newStats);
    statsChart.update();
    currentVocation = vocation;
    
    // Mettre à jour l'indicateur visuel
    updateVocationSelection(vocation);
    updateStatsDisplay(vocation);
}

// Fonction pour mettre à jour l'affichage de la sélection
function updateVocationSelection(vocation) {
    // Retirer la classe selected de toutes les cartes
    document.querySelectorAll('.vocation-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Ajouter la classe selected à la carte choisie
    if (vocation) {
        const selectedCard = document.querySelector(`.vocation-card.${vocation}`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// Fonction pour afficher les stats actuelles
function updateStatsDisplay(vocation) {
    const displayElement = document.getElementById('current-vocation-display');
    if (!displayElement) return;

    if (vocation) {
        const stats = calculateStats(vocation);
        const bonuses = vocationBonuses[vocation];
        let bonusText = '';
        
        for (let stat in bonuses) {
            bonusText += `${stat} +${bonuses[stat]} `;
        }
        
        displayElement.innerHTML = `
            <strong>Vocation sélectionnée :</strong> ${vocationNames[vocation]}<br>
            <strong>Bonus appliqués :</strong> ${bonusText || 'Aucun bonus de caractéristique (bonus de Réactivité)'}
        `;
        displayElement.style.display = 'block';
    } else {
        displayElement.innerHTML = '<strong>Aucune vocation sélectionnée</strong> - Stats de base affichées';
        displayElement.style.display = 'block';
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const vocationCards = document.querySelectorAll('.vocation-card');
    
    // Ajouter les événements de clic sur les cartes de vocation
    vocationCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function() {
            const vocationClass = Array.from(this.classList).find(cls => 
                ['forge', 'shield', 'rogue', 'magic', 'agile', 'stance', 'duel'].includes(cls)
            );
            
            if (vocationClass) {
                // Si on clique sur la vocation déjà sélectionnée, on la désélectionne
                if (currentVocation === vocationClass) {
                    updateChart(null);
                } else {
                    updateChart(vocationClass);
                }
            }
        });
    });

    // Créer l'élément d'affichage de la vocation sélectionnée
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
        const displayDiv = document.createElement('div');
        displayDiv.id = 'current-vocation-display';
        displayDiv.style.cssText = `
            margin-top: 18px;
            padding: 13px 16px;
            background: linear-gradient(135deg, rgba(184, 115, 58, 0.20), rgba(107, 124, 138, 0.15));
            border: 1px solid rgba(184, 115, 58, 0.4);
            border-radius: 6px;
            text-align: center;
            font-size: 0.92rem;
            color: #d49558;
            display: none;
            line-height: 1.6;
            box-shadow: inset 0 1px 0 rgba(212, 149, 88, 0.1), 0 2px 6px rgba(0, 0, 0, 0.3);
        `;
        chartContainer.appendChild(displayDiv);
    }

    // Initialiser l'affichage
    updateStatsDisplay(null);
});