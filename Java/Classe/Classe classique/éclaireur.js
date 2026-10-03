// Création du graphique radar des caractéristiques
const ctx = document.getElementById('statsChart').getContext('2d');

// Données de base de l'Éclaireur (échelle de -4 à +6)
const baseStats = {
    FOR: -2,
    CST: 0,
    DEX: 3,
    INT: 0,
    SAG: 1,
    PER: 3,
    CHA: -3
};

// Bonus des origines
const origineBonuses = {
    reconnaisseur: { PER: 3, SAG: 2 },
    archer: { DEX: 3, PER: 2 },
    arbaletrier: { PER: 2, CST: 3 },
    pistolier: { PER: 3, DEX: 2 },
    jet: { FOR: 4, DEX: 2 },
    ombre: { DEX: 3, PER: 2 }
};

// Noms des origines pour l'affichage
const origineNames = {
    reconnaisseur: 'Reconnaisseur',
    archer: 'Archer de Ligne',
    arbaletrier: 'Arbalétrier de Guerre',
    pistolier: 'Pistolier',
    jet: 'Maître de Jet',
    ombre: "Guetteur de l'Ombre"
};

let currentOrigine = null;

// Fonction pour calculer les stats avec bonus
function calculateStats(origine) {
    const stats = { ...baseStats };
    if (origine && origineBonuses[origine]) {
        const bonuses = origineBonuses[origine];
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
            backgroundColor: 'rgba(90, 106, 74, 0.2)',
            borderColor: 'rgba(90, 106, 74, 0.8)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(90, 106, 74, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(90, 106, 74, 1)',
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
                    color: '#3a4a2a',
                    font: {
                        size: 11,
                        weight: 'bold'
                    }
                },
                grid: {
                    color: 'rgba(90, 106, 74, 0.2)'
                },
                angleLines: {
                    color: 'rgba(90, 106, 74, 0.2)'
                },
                pointLabels: {
                    color: '#3a4a2a',
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
function updateChart(origine) {
    const newStats = calculateStats(origine);
    statsChart.data.datasets[0].data = convertStatsForChart(newStats);
    statsChart.update();
    currentOrigine = origine;
    
    // Mettre à jour l'indicateur visuel
    updateOrigineSelection(origine);
    updateStatsDisplay(origine);
}

// Fonction pour mettre à jour l'affichage de la sélection
function updateOrigineSelection(origine) {
    // Retirer la classe selected de toutes les cartes
    document.querySelectorAll('.origine-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Ajouter la classe selected à la carte choisie
    if (origine) {
        const selectedCard = document.querySelector(`.origine-card.${origine}`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// Fonction pour afficher les stats actuelles
function updateStatsDisplay(origine) {
    const displayElement = document.getElementById('current-origine-display');
    if (!displayElement) return;

    if (origine) {
        const stats = calculateStats(origine);
        const bonuses = origineBonuses[origine];
        let bonusText = '';
        
        for (let stat in bonuses) {
            bonusText += `${stat} ${bonuses[stat] >= 0 ? '+' : ''}${bonuses[stat]} `;
        }
        
        // Ajouter infos spéciales par origine
        const extraInfo = '<br><strong>Focus :</strong> 5 PF, récupération complète après repos long.';

        displayElement.innerHTML = `
            <strong>Origine sélectionnée :</strong> ${origineNames[origine]}<br>
            <strong>Bonus appliqués :</strong> ${bonusText}${extraInfo}
        `;
        displayElement.style.display = 'block';
    } else {
        displayElement.innerHTML = '<strong>Aucune origine sélectionnée</strong> - Stats de base affichées';
        displayElement.style.display = 'block';
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const origineCards = document.querySelectorAll('.origine-card');
    
    // Ajouter les événements de clic sur les cartes d'origine
    origineCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function() {
            const origineClass = Array.from(this.classList).find(cls => 
                ['reconnaisseur', 'archer', 'arbaletrier', 'pistolier', 'jet', 'ombre'].includes(cls)
            );
            
            if (origineClass) {
                // Si on clique sur l'origine déjà sélectionnée, on la désélectionne
                if (currentOrigine === origineClass) {
                    updateChart(null);
                } else {
                    updateChart(origineClass);
                }
            }
        });
    });

    // Créer l'élément d'affichage de l'origine sélectionnée
    const chartContainer = document.querySelector('.chart-container');
    const displayDiv = document.createElement('div');
    displayDiv.id = 'current-origine-display';
    displayDiv.style.marginTop = '20px';
    displayDiv.style.padding = '15px';
    displayDiv.style.background = 'rgba(90, 106, 74, 0.1)';
    displayDiv.style.borderRadius = '6px';
    displayDiv.style.textAlign = 'center';
    displayDiv.style.fontSize = '0.95rem';
    displayDiv.style.display = 'none';
    chartContainer.appendChild(displayDiv);

    // Initialiser l'affichage
    updateStatsDisplay(null);
});
