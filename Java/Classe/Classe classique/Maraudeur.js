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
            backgroundColor: 'rgba(58, 90, 74, 0.3)',
            borderColor: 'rgba(212, 165, 116, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(200, 184, 168, 1)',
            pointBorderColor: 'rgba(212, 165, 116, 1)',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(212, 165, 116, 1)',
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
                backgroundColor: 'rgba(26, 30, 26, 0.8)',
                ticks: {
                    stepSize: 2,
                    callback: function(value) {
                        return value - 4;
                    },
                    color: '#c8b8a8',
                    backdropColor: 'rgba(46, 52, 46, 0.95)',
                    backdropPadding: 4,
                    font: {
                        size: 13,
                        weight: 'bold',
                        family: "'Cinzel', serif"
                    },
                    showLabelBackdrop: true,
                    z: 10
                },
                grid: {
                    color: 'rgba(58, 90, 74, 0.5)',
                    circular: true,
                    lineWidth: 1
                },
                angleLines: {
                    color: 'rgba(58, 90, 74, 0.5)',
                    lineWidth: 1
                },
                pointLabels: {
                    color: '#d4a574',
                    font: {
                        size: 15,
                        weight: 'bold',
                        family: "'Cinzel', serif"
                    },
                    backdropColor: 'rgba(46, 52, 46, 0.85)',
                    backdropPadding: 6,
                    borderRadius: 4
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: 'rgba(46, 52, 46, 0.95)',
                titleColor: '#d4a574',
                bodyColor: '#c8b8a8',
                borderColor: 'rgba(58, 90, 74, 0.8)',
                borderWidth: 2,
                padding: 12,
                titleFont: {
                    family: "'Cinzel', serif",
                    size: 14,
                    weight: 'bold'
                },
                bodyFont: {
                    family: "'Crimson Text', serif",
                    size: 13
                },
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
        
        // Ajouter infos spéciales
        let extraInfo = '';
        if (voie === 'routes') {
            extraInfo = '<br><strong>Bonus :</strong> Observateur de terrain, Choix kit Routes (Ronde Guetteur/Camouflage/Second Croc)';
        } else if (voie === 'flots') {
            extraInfo = '<br><strong>Bonus :</strong> Expertise Nageur, Choix héritage Flots (Souffle Courants/Lecture Ciel/Chef Pont)';
        } else if (voie === 'hautes') {
            extraInfo = '<br><strong>Bonus :</strong> Escalade Instinctive, Choix kit Hautes (Bombardier/Œil Panoramique/Vol Initiative)';
        }
        
        displayElement.innerHTML = `
            <strong>Voie sélectionnée :</strong> ${voieNames[voie]}<br>
            <strong>Bonus appliqués :</strong> ${bonusText}${extraInfo}
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
    displayDiv.style.cssText = `
        margin-top: 18px;
        padding: 15px 20px;
        background: linear-gradient(135deg, rgba(58, 90, 74, 0.35), rgba(212, 165, 116, 0.25));
        border: 2px solid rgba(212, 165, 116, 0.5);
        border-radius: 10px;
        text-align: center;
        font-size: 0.95rem;
        color: #d4a574;
        display: none;
        line-height: 1.8;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), 0 0 30px rgba(58, 90, 74, 0.3);
        backdrop-filter: blur(10px);
    `;
    chartContainer.appendChild(displayDiv);

    // Initialiser l'affichage
    updateStatsDisplay(null);
});