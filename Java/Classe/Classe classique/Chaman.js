// Création du graphique radar des caractéristiques
const ctx = document.getElementById('statsChart').getContext('2d');

// Données de base du Chaman (échelle de -4 à +6)
const baseStats = {
    FOR: -3,
    CST: -2,
    DEX: -1,
    INT: 1,
    SAG: 3,
    PER: 2,
    CHA: -2
};

// Bonus des parcours
const parcoursBonuses = {
    'sage': { SAG: 3, PER: 3 },
    'rodeur': { DEX: 4, PER: 4 },
    'protecteur': { FOR: 6, CST: 4 }, // FOR passe de -3 à +3, CST passe de -2 à +2
    'spiritisme': { SAG: 3, INT: 2 },
    'sorcellerie': { INT: 4, CST: 4, SAG: -1 } // CST passe de -2 à +2, SAG diminue
};

// Noms des parcours pour l'affichage
const parcoursNames = {
    'sage': 'Sage des Forêts',
    'rodeur': 'Rôdeur des Buissons',
    'protecteur': 'Protecteur de la Nature',
    'spiritisme': 'Voie du Spiritisme',
    'sorcellerie': 'Voie de la Sorcellerie'
};

let currentParcours = null;

// Fonction pour calculer les stats avec bonus
function calculateStats(parcours) {
    const stats = { ...baseStats };
    if (parcours && parcoursBonuses[parcours]) {
        const bonuses = parcoursBonuses[parcours];
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
            backgroundColor: 'rgba(74, 106, 74, 0.2)',
            borderColor: 'rgba(74, 106, 74, 0.8)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(74, 106, 74, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(74, 106, 74, 1)',
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
                    color: '#2a4a2a',
                    font: {
                        size: 11,
                        weight: 'bold'
                    }
                },
                grid: {
                    color: 'rgba(74, 106, 74, 0.2)'
                },
                angleLines: {
                    color: 'rgba(74, 106, 74, 0.2)'
                },
                pointLabels: {
                    color: '#2a4a2a',
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
function updateChart(parcours) {
    const newStats = calculateStats(parcours);
    statsChart.data.datasets[0].data = convertStatsForChart(newStats);
    statsChart.update();
    currentParcours = parcours;
    
    // Mettre à jour l'indicateur visuel
    updateParcoursSelection(parcours);
    updateStatsDisplay(parcours);
}

// Fonction pour mettre à jour l'affichage de la sélection
function updateParcoursSelection(parcours) {
    // Retirer la classe selected de toutes les cartes
    document.querySelectorAll('.parcours-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Ajouter la classe selected à la carte choisie
    if (parcours) {
        const selectedCard = document.querySelector(`.parcours-card.${parcours}`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// Fonction pour afficher les stats actuelles
function updateStatsDisplay(parcours) {
    const displayElement = document.getElementById('current-parcours-display');
    if (!displayElement) return;

    if (parcours) {
        const stats = calculateStats(parcours);
        const bonuses = parcoursBonuses[parcours];
        let bonusText = '';
        
        for (let stat in bonuses) {
            bonusText += `${stat} ${bonuses[stat] >= 0 ? '+' : ''}${bonuses[stat]} `;
        }
        
        // Ajouter infos spéciales
        let extraInfo = '';
        if (parcours === 'sage') {
            extraInfo = '<br><strong>Bonus spécial :</strong> RM +1d6, Savoir +1';
        } else if (parcours === 'rodeur') {
            extraInfo = '<br><strong>Bonus spécial :</strong> REA +2, Finesse +1, Transmission de stats, Maîtrise d\'arme de tir/jet';
        } else if (parcours === 'protecteur') {
            extraInfo = '<br><strong>Bonus spécial :</strong> REA +4, Puissance/Résilience +1, Transmission de stats, Maîtrise d\'arme CàC';
        }
        
        displayElement.innerHTML = `
            <strong>Parcours sélectionné :</strong> ${parcoursNames[parcours]}<br>
            <strong>Bonus appliqués :</strong> ${bonusText}${extraInfo}
        `;
        displayElement.style.display = 'block';
    } else {
        displayElement.innerHTML = '<strong>Aucun parcours sélectionné</strong> - Stats de base affichées';
        displayElement.style.display = 'block';
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const parcoursCards = document.querySelectorAll('.parcours-card');
    
    // Ajouter les événements de clic sur les cartes de parcours
    parcoursCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function() {
            const parcoursClass = Array.from(this.classList).find(cls => 
                ['sage', 'rodeur', 'protecteur', 'spiritisme', 'sorcellerie'].includes(cls)
            );
            
            if (parcoursClass) {
                // Si on clique sur le parcours déjà sélectionné, on le désélectionne
                if (currentParcours === parcoursClass) {
                    updateChart(null);
                } else {
                    updateChart(parcoursClass);
                }
            }
        });
    });

    // Créer l'élément d'affichage du parcours sélectionné
    const chartContainer = document.querySelector('.chart-container');
    const displayDiv = document.createElement('div');
    displayDiv.id = 'current-parcours-display';
    displayDiv.style.marginTop = '20px';
    displayDiv.style.padding = '15px';
    displayDiv.style.background = 'rgba(74, 106, 74, 0.1)';
    displayDiv.style.borderRadius = '6px';
    displayDiv.style.textAlign = 'center';
    displayDiv.style.fontSize = '0.95rem';
    displayDiv.style.display = 'none';
    chartContainer.appendChild(displayDiv);

    // Initialiser l'affichage
    updateStatsDisplay(null);
});