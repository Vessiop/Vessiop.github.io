// Création du graphique radar des caractéristiques
const ctx = document.getElementById('statsChart').getContext('2d');

// Données de base de l'Initié (échelle de -4 à +6)
const baseStats = {
    FOR: 1,
    CST: 3,
    DEX: -1,
    INT: -3,
    SAG: 3,
    PER: 1,
    CHA: -2
};

// Bonus des chemins spirituels
const cheminBonuses = {
    'vie': { SAG: 3 },
    'pilier': { FOR: 2, DEX: 1 }, // Par défaut, on prend FOR +2, DEX +1
    'ame': { SAG: 3 },
    'devoration': { DEX: 3 }
};

// Noms des chemins pour l'affichage
const cheminNames = {
    'vie': 'Chemin de la Vie',
    'pilier': 'Chemin du Pilier',
    'ame': 'Chemin de l\'Âme',
    'devoration': 'Chemin de la Dévoration'
};

let currentChemin = null;

// Fonction pour calculer les stats avec bonus
function calculateStats(chemin) {
    const stats = { ...baseStats };
    if (chemin && cheminBonuses[chemin]) {
        const bonuses = cheminBonuses[chemin];
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
            backgroundColor: 'rgba(106, 128, 112, 0.3)',
            borderColor: 'rgba(216, 184, 200, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(216, 224, 216, 1)',
            pointBorderColor: 'rgba(216, 184, 200, 1)',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(216, 184, 200, 1)',
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
                backgroundColor: 'rgba(26, 30, 28, 0.8)',
                ticks: {
                    stepSize: 2,
                    callback: function(value) {
                        return value - 4;
                    },
                    color: '#d8e0d8',
                    backdropColor: 'rgba(52, 58, 56, 0.95)',
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
                    color: 'rgba(106, 128, 112, 0.5)',
                    circular: true,
                    lineWidth: 1
                },
                angleLines: {
                    color: 'rgba(106, 128, 112, 0.5)',
                    lineWidth: 1
                },
                pointLabels: {
                    color: '#c9b896',
                    font: {
                        size: 15,
                        weight: 'bold',
                        family: "'Cinzel', serif"
                    },
                    backdropColor: 'rgba(52, 58, 56, 0.85)',
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
                backgroundColor: 'rgba(52, 58, 56, 0.95)',
                titleColor: '#d8b8c8',
                bodyColor: '#d8e0d8',
                borderColor: 'rgba(106, 128, 112, 0.8)',
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
function updateChart(chemin) {
    const newStats = calculateStats(chemin);
    statsChart.data.datasets[0].data = convertStatsForChart(newStats);
    statsChart.update();
    currentChemin = chemin;
    
    // Mettre à jour l'indicateur visuel
    updateCheminSelection(chemin);
    updateStatsDisplay(chemin);
}

// Fonction pour mettre à jour l'affichage de la sélection
function updateCheminSelection(chemin) {
    // Retirer la classe selected de toutes les cartes
    document.querySelectorAll('.chemin-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Ajouter la classe selected à la carte choisie
    if (chemin) {
        const selectedCard = document.querySelector(`.chemin-card.${chemin}`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// Fonction pour afficher les stats actuelles
function updateStatsDisplay(chemin) {
    const displayElement = document.getElementById('current-chemin-display');
    if (!displayElement) return;

    if (chemin) {
        const stats = calculateStats(chemin);
        const bonuses = cheminBonuses[chemin];
        let bonusText = '';
        
        for (let stat in bonuses) {
            bonusText += `${stat} +${bonuses[stat]} `;
        }
        
        // Ajouter infos spéciales
        let extraInfo = '';
        if (chemin === 'vie') {
            extraInfo = '<br><strong>Style :</strong> Régulation vivifiante, Bonne vitalité (+1 PV/niveau), +1 Résilience/Social';
        } else if (chemin === 'pilier') {
            extraInfo = '<br><strong>Style :</strong> Forge du Corps, Endurant (+1 PE/niveau), +1 Résilience, +1 Puissance/Finesse';
        } else if (chemin === 'ame') {
            extraInfo = '<br><strong>Style :</strong> Repos Intérieur, Âme tranquille (Avantage RM >50% PV), +1 Sang-froid/Instinct';
        } else if (chemin === 'devoration') {
            extraInfo = '<br><strong>Style :</strong> Serpent Silencieux (interdit), Voie obscure, +1 Finesse/Instinct';
        }
        
        displayElement.innerHTML = `
            <strong>Chemin spirituel sélectionné :</strong> ${cheminNames[chemin]}<br>
            <strong>Bonus appliqués :</strong> ${bonusText}${extraInfo}
        `;
        displayElement.style.display = 'block';
    } else {
        displayElement.innerHTML = '<strong>Aucun chemin sélectionné</strong> - Stats de base affichées';
        displayElement.style.display = 'block';
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const cheminCards = document.querySelectorAll('.chemin-card');
    
    // Ajouter les événements de clic sur les cartes de chemin
    cheminCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function() {
            const cheminClass = Array.from(this.classList).find(cls => 
                ['vie', 'pilier', 'ame', 'devoration'].includes(cls)
            );
            
            if (cheminClass) {
                // Si on clique sur le chemin déjà sélectionné, on le désélectionne
                if (currentChemin === cheminClass) {
                    updateChart(null);
                } else {
                    updateChart(cheminClass);
                }
            }
        });
    });

    // Créer l'élément d'affichage du chemin sélectionné
    const chartContainer = document.querySelector('.chart-container');
    const displayDiv = document.createElement('div');
    displayDiv.id = 'current-chemin-display';
    displayDiv.style.cssText = `
        margin-top: 18px;
        padding: 15px 20px;
        background: linear-gradient(135deg, rgba(106, 128, 112, 0.35), rgba(216, 184, 200, 0.25));
        border: 2px solid rgba(216, 184, 200, 0.5);
        border-radius: 10px;
        text-align: center;
        font-size: 0.95rem;
        color: #d8b8c8;
        display: none;
        line-height: 1.8;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), 0 0 30px rgba(106, 128, 112, 0.3);
        backdrop-filter: blur(10px);
    `;
    chartContainer.appendChild(displayDiv);

    // Initialiser l'affichage
    updateStatsDisplay(null);
});