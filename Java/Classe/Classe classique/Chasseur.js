// Création du graphique radar des caractéristiques
const ctx = document.getElementById('statsChart').getContext('2d');

// Données de base du Chasseur (échelle de -4 à +6)
const baseStats = {
    FOR: -1,
    CST: 0,
    DEX: 3,
    INT: -2,
    SAG: 1,
    PER: 4,
    CHA: -3
};

// Bonus des terrains de chasse
const terrainBonuses = {
    'terres-hostiles': { PER: 2, CST: 2 },
    'artisan-lisieres': { PER: 2, INT: 5 },
    'pacte-gris': { PER: 2, DEX: 3 },
    'traqueur-contrats': { PER: 2, CHA: 6 },
    'traqueur-anomalies': { PER: 2, DEX: 3 }
};

// Noms des terrains pour l'affichage
const terrainNames = {
    "terres-hostiles": "Arpenteur des Terres Hostiles",
    "artisan-lisieres": "Artisan des Lisières",
    "pacte-gris": "Pisteur du Pacte Gris",
    "traqueur-contrats": "Traqueur de Contrats",
    "traqueur-anomalies": "Héritier du Fléau"
};

const terrainDetails = {
    "terres-hostiles": "Sens du Biome ; Déplacement forestier +2 N.A. ; catégorie Animal de traque ; +1 Instinct ou Sang-Froid au choix.",
    "artisan-lisieres": "Bricoleur naturel +1 ; Ingéniosité de Terrain : 1 fois par scène, difficulté −2 ou efficacité +10 % ; +1 Métier.",
    "pacte-gris": "Lecture du Pisteur Gris ; 2 Points de Chasse par Repos Long ; Œil du Huron Gris : Puissance optimale contre Monstre/Bête, pas de Multi-attaque ; +1 Savoir ou Instinct au choix.",
    "traqueur-contrats": "Marchandage +1 ; Œil du Professionnel : 1 fois par scène, +10 au premier jet exploitant l’information ; +1 Social ou Sang-Froid au choix.",
    "traqueur-anomalies": "Expertise de Chasse : Maudit ; Proie du Fléau : 1 fois par round ; +1 Savoir ou Sang-Froid au choix."
};

let currentTerrain = null;

// Fonction pour calculer les stats avec bonus
function calculateStats(terrain) {
    const stats = { ...baseStats };
    if (terrain && terrainBonuses[terrain]) {
        const bonuses = terrainBonuses[terrain];
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
            backgroundColor: 'rgba(58, 90, 58, 0.3)',
            borderColor: 'rgba(74, 122, 74, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(200, 216, 200, 1)',
            pointBorderColor: 'rgba(74, 122, 74, 1)',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(74, 122, 74, 1)',
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
                backgroundColor: 'rgba(26, 36, 24, 0.7)',
                ticks: {
                    stepSize: 2,
                    callback: function(value) {
                        return value - 4;
                    },
                    color: '#c8d8c8',
                    backdropColor: 'rgba(45, 61, 40, 0.95)',
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
                    color: 'rgba(58, 90, 58, 0.5)',
                    circular: true,
                    lineWidth: 1
                },
                angleLines: {
                    color: 'rgba(58, 90, 58, 0.5)',
                    lineWidth: 1
                },
                pointLabels: {
                    color: '#8aaa8a',
                    font: {
                        size: 15,
                        weight: 'bold',
                        family: "'Cinzel', serif"
                    },
                    backdropColor: 'rgba(45, 61, 40, 0.85)',
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
                backgroundColor: 'rgba(45, 61, 40, 0.95)',
                titleColor: '#8aaa8a',
                bodyColor: '#c8d8c8',
                borderColor: 'rgba(58, 90, 58, 0.8)',
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
function updateChart(terrain) {
    const newStats = calculateStats(terrain);
    statsChart.data.datasets[0].data = convertStatsForChart(newStats);
    statsChart.update();
    currentTerrain = terrain;
    
    // Mettre à jour l'indicateur visuel
    updateTerrainSelection(terrain);
    updateStatsDisplay(terrain);
}

// Fonction pour mettre à jour l'affichage de la sélection
function updateTerrainSelection(terrain) {
    // Retirer la classe selected de toutes les cartes
    document.querySelectorAll('.terrain-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Ajouter la classe selected à la carte choisie
    if (terrain) {
        const selectedCard = document.querySelector(`.terrain-card.${terrain}`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// Fonction pour afficher les stats actuelles
function updateStatsDisplay(terrain) {
    const displayElement = document.getElementById('current-terrain-display');
    if (!displayElement) return;

    if (terrain) {
        const stats = calculateStats(terrain);
        const bonuses = terrainBonuses[terrain];
        let bonusText = '';
        
        for (let stat in bonuses) {
            bonusText += `${stat} ${bonuses[stat] >= 0 ? '+' : ''}${bonuses[stat]} `;
        }
        
        const extraInfo = '<br><strong>Gains :</strong> ' + terrainDetails[terrain];

        displayElement.innerHTML = `
            <strong>Terrain de chasse sélectionné :</strong> ${terrainNames[terrain]}<br>
            <strong>Bonus appliqués :</strong> ${bonusText}${extraInfo}
        `;
        displayElement.style.display = 'block';
    } else {
        displayElement.innerHTML = '<strong>Aucun terrain sélectionné</strong> - Stats de base affichées';
        displayElement.style.display = 'block';
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const terrainCards = document.querySelectorAll('.terrain-card');
    
    // Ajouter les événements de clic sur les cartes de terrain
    terrainCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function() {
            const terrainClass = Array.from(this.classList).find(cls => 
                Object.keys(terrainBonuses).includes(cls)
            );
            
            if (terrainClass) {
                // Si on clique sur le terrain déjà sélectionné, on le désélectionne
                if (currentTerrain === terrainClass) {
                    updateChart(null);
                } else {
                    updateChart(terrainClass);
                }
            }
        });
    });

    // Créer l'élément d'affichage du terrain sélectionné
    const chartContainer = document.querySelector('.chart-container');
    const displayDiv = document.createElement('div');
    displayDiv.id = 'current-terrain-display';
    displayDiv.style.cssText = `
        margin-top: 18px;
        padding: 15px 20px;
        background: linear-gradient(135deg, rgba(58, 90, 58, 0.35), rgba(74, 122, 74, 0.25));
        border: 2px solid rgba(74, 122, 74, 0.5);
        border-radius: 10px;
        text-align: center;
        font-size: 0.95rem;
        color: #8aaa8a;
        display: none;
        line-height: 1.8;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), 0 0 30px rgba(58, 90, 58, 0.3);
        backdrop-filter: blur(10px);
    `;
    chartContainer.appendChild(displayDiv);

    // Initialiser l'affichage
    updateStatsDisplay(null);
});
