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
    'artisan-lisieres': { PER: 2, INT: 5 }, // INT passe de -2 à +3
    'pacte-gris': { PER: 2, DEX: 3 },
    'traqueur-contrats': { PER: 2, CHA: 6 }, // CHA passe de -3 à +3
    'traqueur-anomalies': { PER: 2, CST: 3 }
};

// Noms des terrains pour l'affichage
const terrainNames = {
    'terres-hostiles': 'Arpenteur des Terres Hostiles',
    'artisan-lisieres': 'Artisan des Lisières',
    'pacte-gris': 'Pisteur du Pacte Gris',
    'traqueur-contrats': 'Traqueur de Contrats',
    'traqueur-anomalies': 'Traqueur d\'Anomalies'
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
            backgroundColor: 'rgba(74, 90, 58, 0.2)',
            borderColor: 'rgba(74, 90, 58, 0.8)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(74, 90, 58, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(74, 90, 58, 1)',
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
                    color: '#2a3a1a',
                    font: {
                        size: 11,
                        weight: 'bold'
                    }
                },
                grid: {
                    color: 'rgba(74, 90, 58, 0.2)'
                },
                angleLines: {
                    color: 'rgba(74, 90, 58, 0.2)'
                },
                pointLabels: {
                    color: '#2a3a1a',
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
        
        // Ajouter infos spéciales par terrain
        let extraInfo = '';
        if (terrain === 'terres-hostiles') {
            extraInfo = '<br><strong>Bonus spécial :</strong> Sens du Biome, Catégorie Animal, +1 Instinct/Sang-froid';
        } else if (terrain === 'artisan-lisieres') {
            extraInfo = '<br><strong>Bonus spécial :</strong> Bricoleur naturel +1, Mécanique Aiguisée, +1 Métier';
        } else if (terrain === 'pacte-gris') {
            extraInfo = '<br><strong>Bonus spécial :</strong> Pistage amélioré, Adepte chasse gris (+1d10 initiative), Catégorie Créature mythique';
        } else if (terrain === 'traqueur-contrats') {
            extraInfo = '<br><strong>Bonus spécial :</strong> Profilage de Cible (Avantage), Catégorie Humanoïde, +1 Social/Sang-froid';
        } else if (terrain === 'traqueur-anomalies') {
            extraInfo = '<br><strong>Bonus spécial :</strong> Réflexe Chasseur d\'Horreur, Catégorie Monstre, +1 Résilience/Instinct/Puissance';
        }
        
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
                ['terres-hostiles', 'artisan-lisieres', 'pacte-gris', 'traqueur-contrats', 'traqueur-anomalies'].includes(cls)
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
    displayDiv.style.marginTop = '20px';
    displayDiv.style.padding = '15px';
    displayDiv.style.background = 'rgba(74, 90, 58, 0.1)';
    displayDiv.style.borderRadius = '6px';
    displayDiv.style.textAlign = 'center';
    displayDiv.style.fontSize = '0.95rem';
    displayDiv.style.display = 'none';
    chartContainer.appendChild(displayDiv);

    // Initialiser l'affichage
    updateStatsDisplay(null);
});