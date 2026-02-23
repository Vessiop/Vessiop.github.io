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
            backgroundColor: 'rgba(106, 138, 106, 0.3)',
            borderColor: 'rgba(212, 165, 116, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(200, 216, 200, 1)',
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
                backgroundColor: 'rgba(26, 30, 24, 0.8)',
                ticks: {
                    stepSize: 2,
                    callback: function(value) {
                        return value - 4;
                    },
                    color: '#c8d8c8',
                    backdropColor: 'rgba(46, 52, 40, 0.95)',
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
                    color: 'rgba(106, 138, 106, 0.5)',
                    circular: true,
                    lineWidth: 1
                },
                angleLines: {
                    color: 'rgba(106, 138, 106, 0.5)',
                    lineWidth: 1
                },
                pointLabels: {
                    color: '#d4a574',
                    font: {
                        size: 15,
                        weight: 'bold',
                        family: "'Cinzel', serif"
                    },
                    backdropColor: 'rgba(46, 52, 40, 0.85)',
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
                backgroundColor: 'rgba(46, 52, 40, 0.95)',
                titleColor: '#d4a574',
                bodyColor: '#c8d8c8',
                borderColor: 'rgba(106, 138, 106, 0.8)',
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
        } else if (parcours === 'spiritisme') {
            extraInfo = '<br><strong>Bonus spécial :</strong> Magie Spirituelle, Vision spirituelle, Messager des esprits';
        } else if (parcours === 'sorcellerie') {
            extraInfo = '<br><strong>Bonus spécial :</strong> Arts occultes (occulte ou nécromantique), Évolution classe (niv 5), Dégénérescence';
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
    displayDiv.style.cssText = `
        margin-top: 18px;
        padding: 15px 20px;
        background: linear-gradient(135deg, rgba(106, 138, 106, 0.35), rgba(212, 165, 116, 0.25));
        border: 2px solid rgba(212, 165, 116, 0.5);
        border-radius: 10px;
        text-align: center;
        font-size: 0.95rem;
        color: #d4a574;
        display: none;
        line-height: 1.8;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), 0 0 30px rgba(106, 138, 106, 0.3);
        backdrop-filter: blur(10px);
    `;
    chartContainer.appendChild(displayDiv);

    // Initialiser l'affichage
    updateStatsDisplay(null);
});