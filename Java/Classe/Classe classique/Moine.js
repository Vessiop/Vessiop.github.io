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
            backgroundColor: 'rgba(90, 106, 90, 0.2)',
            borderColor: 'rgba(90, 106, 90, 0.8)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(90, 106, 90, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(90, 106, 90, 1)',
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
                    color: '#3a4a3a',
                    font: {
                        size: 11,
                        weight: 'bold'
                    }
                },
                grid: {
                    color: 'rgba(90, 106, 90, 0.2)'
                },
                angleLines: {
                    color: 'rgba(90, 106, 90, 0.2)'
                },
                pointLabels: {
                    color: '#3a4a3a',
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
        
        displayElement.innerHTML = `
            <strong>Chemin spirituel sélectionné :</strong> ${cheminNames[chemin]}<br>
            <strong>Bonus appliqués :</strong> ${bonusText}
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
    displayDiv.style.marginTop = '20px';
    displayDiv.style.padding = '15px';
    displayDiv.style.background = 'rgba(90, 106, 90, 0.1)';
    displayDiv.style.borderRadius = '6px';
    displayDiv.style.textAlign = 'center';
    displayDiv.style.fontSize = '0.95rem';
    displayDiv.style.display = 'none';
    chartContainer.appendChild(displayDiv);

    // Initialiser l'affichage
    updateStatsDisplay(null);
});