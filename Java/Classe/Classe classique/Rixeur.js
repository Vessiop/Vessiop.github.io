// Création du graphique radar des caractéristiques
const ctx = document.getElementById('statsChart').getContext('2d');

// Données de base du Rixeur (échelle de -4 à +6)
const baseStats = {
    FOR: 2,
    CST: 1,
    DEX: 1,
    INT: -3,
    SAG: -1,
    PER: 1,
    CHA: -1
};

// Bonus des milieux de vie
const milieuBonuses = {
    'rues': { PER: 2, DEX: 1 },
    'gladiateur': { CST: 2, CHA: 1 },
    'guerrier': { FOR: 2, CST: 1 },
    'casseur': { CHA: 2, DEX: 1 },
    'terres': { SAG: 4, DEX: 1 }
};

// Noms des milieux pour l'affichage
const milieuNames = {
    'rues': 'Enfant des Rues',
    'gladiateur': 'Gladiateur Clandestin',
    'guerrier': 'Guerrier du Corps',
    'casseur': 'Casseur à Gages',
    'terres': 'Rixeur des Terres Vives'
};

let currentMilieu = null;

// Fonction pour calculer les stats avec bonus
function calculateStats(milieu) {
    const stats = { ...baseStats };
    if (milieu && milieuBonuses[milieu]) {
        const bonuses = milieuBonuses[milieu];
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
            backgroundColor: 'rgba(74, 58, 58, 0.2)',
            borderColor: 'rgba(74, 58, 58, 0.8)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(74, 58, 58, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(74, 58, 58, 1)',
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
                    color: '#2a1a1a',
                    font: {
                        size: 11,
                        weight: 'bold'
                    }
                },
                grid: {
                    color: 'rgba(74, 58, 58, 0.2)'
                },
                angleLines: {
                    color: 'rgba(74, 58, 58, 0.2)'
                },
                pointLabels: {
                    color: '#2a1a1a',
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
function updateChart(milieu) {
    const newStats = calculateStats(milieu);
    statsChart.data.datasets[0].data = convertStatsForChart(newStats);
    statsChart.update();
    currentMilieu = milieu;
    
    // Mettre à jour l'indicateur visuel
    updateMilieuSelection(milieu);
    updateStatsDisplay(milieu);
}

// Fonction pour mettre à jour l'affichage de la sélection
function updateMilieuSelection(milieu) {
    // Retirer la classe selected de toutes les cartes
    document.querySelectorAll('.milieu-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Ajouter la classe selected à la carte choisie
    if (milieu) {
        const selectedCard = document.querySelector(`.milieu-card.${milieu}`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// Fonction pour afficher les stats actuelles
function updateStatsDisplay(milieu) {
    const displayElement = document.getElementById('current-milieu-display');
    if (!displayElement) return;

    if (milieu) {
        const stats = calculateStats(milieu);
        const bonuses = milieuBonuses[milieu];
        let bonusText = '';
        
        for (let stat in bonuses) {
            bonusText += `${stat} +${bonuses[stat]} `;
        }
        
        displayElement.innerHTML = `
            <strong>Milieu de vie sélectionné :</strong> ${milieuNames[milieu]}<br>
            <strong>Bonus appliqués :</strong> ${bonusText}
        `;
        displayElement.style.display = 'block';
    } else {
        displayElement.innerHTML = '<strong>Aucun milieu de vie sélectionné</strong> - Stats de base affichées';
        displayElement.style.display = 'block';
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const milieuCards = document.querySelectorAll('.milieu-card');
    
    // Ajouter les événements de clic sur les cartes de milieu
    milieuCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function() {
            const milieuClass = Array.from(this.classList).find(cls => 
                ['rues', 'gladiateur', 'guerrier', 'casseur', 'terres'].includes(cls)
            );
            
            if (milieuClass) {
                // Si on clique sur le milieu déjà sélectionné, on le désélectionne
                if (currentMilieu === milieuClass) {
                    updateChart(null);
                } else {
                    updateChart(milieuClass);
                }
            }
        });
    });

    // Créer l'élément d'affichage du milieu sélectionné
    const chartContainer = document.querySelector('.chart-container');
    const displayDiv = document.createElement('div');
    displayDiv.id = 'current-milieu-display';
    displayDiv.style.marginTop = '20px';
    displayDiv.style.padding = '15px';
    displayDiv.style.background = 'rgba(74, 58, 58, 0.1)';
    displayDiv.style.borderRadius = '6px';
    displayDiv.style.textAlign = 'center';
    displayDiv.style.fontSize = '0.95rem';
    displayDiv.style.display = 'none';
    chartContainer.appendChild(displayDiv);

    // Initialiser l'affichage
    updateStatsDisplay(null);
});