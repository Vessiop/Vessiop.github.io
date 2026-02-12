// Création du graphique radar des caractéristiques
const ctx = document.getElementById('statsChart').getContext('2d');

// Données de base du Mage Rouge (échelle de -4 à +6)
const baseStats = {
    FOR: -3,
    CST: -2,
    DEX: 3,
    INT: 3,
    SAG: 2,
    PER: -3,
    CHA: 3
};

// Bonus des Pétales
const petaleBonuses = {
    'petale-1': { DEX: 3, CST: 4 }, // Carnívora: CST passe de -2 à +2
    'petale-2': { INT: 3, PER: 6 }, // Llanura: PER passe de -3 à +3
    'petale-3': { PER: 7, CST: 5 }, // Schiusa: PER passe de -3 à +4, CST passe de -2 à +3
    'petale-4': { SAG: 4, CST: 4 }, // Accordo: SAG +4, CST passe de -2 à +2
    'petale-5': { SAG: 3, PER: 5 }  // Madre-Botánica: SAG +3, PER passe de -3 à +2
};

// Noms des Pétales pour l'affichage
const petaleNames = {
    'petale-1': 'Initié de la Pétale Carnívora',
    'petale-2': 'Apprenti de la Pétale Llanura Escarlata',
    'petale-3': 'Explorateur de la Pétale Schiusa del Vestigio',
    'petale-4': 'Chercheur de la Pétale Accordo Policromo',
    'petale-5': 'Initié de la Pétale Madre-Botánica'
};

let currentPetale = null;

// Fonction pour calculer les stats avec bonus
function calculateStats(petale) {
    const stats = { ...baseStats };
    if (petale && petaleBonuses[petale]) {
        const bonuses = petaleBonuses[petale];
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
            backgroundColor: 'rgba(212, 90, 106, 0.3)',
            borderColor: 'rgba(212, 90, 106, 1)',
            borderWidth: 3,
            pointBackgroundColor: 'rgba(212, 90, 106, 1)',
            pointBorderColor: '#f4d9d0',
            pointHoverBackgroundColor: '#f4d9d0',
            pointHoverBorderColor: 'rgba(212, 90, 106, 1)',
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
                backgroundColor: 'rgba(20, 12, 12, 0.4)',
                ticks: {
                    stepSize: 2,
                    callback: function(value) {
                        return value - 4;
                    },
                    color: '#d4a8a0',
                    backdropColor: 'rgba(20, 12, 12, 0.9)',
                    font: {
                        size: 12,
                        weight: 'bold'
                    }
                },
                grid: {
                    color: 'rgba(212, 90, 106, 0.6)',
                    circular: true
                },
                angleLines: {
                    color: 'rgba(212, 90, 106, 0.6)'
                },
                pointLabels: {
                    color: '#d4a8a0',
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
                backgroundColor: 'rgba(20, 12, 12, 0.95)',
                titleColor: '#d4a8a0',
                bodyColor: '#f4d9d0',
                borderColor: 'rgba(212, 90, 106, 0.9)',
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
function updateChart(petale) {
    const newStats = calculateStats(petale);
    statsChart.data.datasets[0].data = convertStatsForChart(newStats);
    statsChart.update();
    currentPetale = petale;
    
    // Mettre à jour l'indicateur visuel
    updatePetaleSelection(petale);
    updateStatsDisplay(petale);
}

// Fonction pour mettre à jour l'affichage de la sélection
function updatePetaleSelection(petale) {
    // Retirer la classe selected de toutes les cartes
    document.querySelectorAll('.origin-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Ajouter la classe selected à la carte choisie
    if (petale) {
        const selectedCard = document.querySelector(`.origin-card.${petale}`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// Fonction pour afficher les stats actuelles
function updateStatsDisplay(petale) {
    const displayElement = document.getElementById('current-petale-display');
    if (!displayElement) return;

    if (petale) {
        const stats = calculateStats(petale);
        const bonuses = petaleBonuses[petale];
        let bonusText = '';
        
        for (let stat in bonuses) {
            bonusText += `${stat} +${bonuses[stat]} `;
        }
        
        displayElement.innerHTML = `
            <strong>Pétale sélectionnée :</strong> ${petaleNames[petale]}<br>
            <strong>Bonus appliqués :</strong> ${bonusText}
        `;
        displayElement.style.display = 'block';
    } else {
        displayElement.innerHTML = '<strong>Aucune Pétale sélectionnée</strong> - Stats de base affichées';
        displayElement.style.display = 'block';
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const petaleCards = document.querySelectorAll('.origin-card');
    
    // Ajouter les événements de clic sur les cartes de Pétale
    petaleCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function() {
            const petaleClass = Array.from(this.classList).find(cls => 
                ['petale-1', 'petale-2', 'petale-3', 'petale-4', 'petale-5'].includes(cls)
            );
            
            if (petaleClass) {
                // Si on clique sur la Pétale déjà sélectionnée, on la désélectionne
                if (currentPetale === petaleClass) {
                    updateChart(null);
                } else {
                    updateChart(petaleClass);
                }
            }
        });
    });

    // Créer l'élément d'affichage de la Pétale sélectionnée
    const chartContainer = document.querySelector('.chart-container');
    const displayDiv = document.createElement('div');
    displayDiv.id = 'current-petale-display';
    displayDiv.style.marginTop = '20px';
    displayDiv.style.padding = '15px';
    displayDiv.style.background = 'rgba(139, 45, 61, 0.25)';
    displayDiv.style.borderRadius = '6px';
    displayDiv.style.textAlign = 'center';
    displayDiv.style.fontSize = '0.95rem';
    displayDiv.style.display = 'none';
    displayDiv.style.border = '1px solid rgba(139, 45, 61, 0.5)';
    chartContainer.appendChild(displayDiv);

    // Initialiser l'affichage
    updateStatsDisplay(null);
});