// Création du graphique radar des caractéristiques
const ctx = document.getElementById('statsChart').getContext('2d');

// Données de base du Battant de sang (échelle de -4 à +6)
const baseStats = {
    FOR: 3,
    CST: 2,
    DEX: 1,
    INT: -3,
    SAG: -2,
    PER: 1,
    CHA: -1
};

// Bonus des origines
const origineBonuses = {
    'amoureux-affrontement': { FOR: 3 },
    'terres-indomptees': { DEX: 2, PER: 3 },
    'voie-mysticisme': { INT: 4, SAG: 3 },
    'enfant-chaos': { CST: 3, FOR: 2 }
};

// Noms des origines pour l'affichage
const origineNames = {
    "amoureux-affrontement": "Amoureux de l'affrontement",
    "terres-indomptees": "Né des terres indomptées",
    "voie-mysticisme": "Voie du mysticisme",
    "enfant-chaos": "Enfant du Chaos"
};

const origineDetails = {
    "amoureux-affrontement": "Réactivité +2 (total +6) ; Départ incandescent +1 Ferveur ; Combativité ; +1 Puissance, Instinct ou Sang-Froid au choix.",
    "terres-indomptees": "Furie bestiale : 1 Ferveur, 1 fois par tour ; Postures de combat +2 ; un choix utilitaire ; +1 Instinct, Résilience ou Finesse au choix.",
    "voie-mysticisme": "PM 1d12 si inférieur, 1 dé de Gain de PM ; Départ chamanique ou arcanique ; Impulsion mystique : 1 Ferveur, 1 fois par tour ; +1 Savoir, Métier ou Sang-Froid au choix.",
    "enfant-chaos": "Canalisation de l’Abîme +2 ; Déferlement : 1 fois par combat, 2 tours, Puissance optimale et brûlure 1d6 PE + 1d6 PM par fin de tour ; +1 Puissance, Résilience ou Sang-Froid au choix."
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
            backgroundColor: 'rgba(139, 30, 30, 0.2)',
            borderColor: 'rgba(139, 30, 30, 0.8)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(139, 30, 30, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(139, 30, 30, 1)',
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
                    color: '#8b1e1e',
                    font: {
                        size: 11,
                        weight: 'bold'
                    }
                },
                grid: {
                    color: 'rgba(139, 30, 30, 0.2)'
                },
                angleLines: {
                    color: 'rgba(139, 30, 30, 0.2)'
                },
                pointLabels: {
                    color: '#8b1e1e',
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
    document.querySelectorAll('.origin-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Ajouter la classe selected à la carte choisie
    if (origine) {
        const selectedCard = document.querySelector(`.origin-card.${origine}`);
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
        const bonuses = origineBonuses[origine];
        const bonusText = Object.entries(bonuses).map(([stat, value]) => `${stat} ${value >= 0 ? '+' : ''}${value}`).join(' ; ');
        
        const extraInfo = '<br><strong>Gains :</strong> ' + origineDetails[origine];

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
    const origineCards = document.querySelectorAll('.origin-card');
    
    // Ajouter les événements de clic sur les cartes d'origine
    origineCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function() {
            const origineClass = Array.from(this.classList).find(cls => 
                Object.keys(origineBonuses).includes(cls)
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
    displayDiv.style.background = 'rgba(139, 30, 30, 0.1)';
    displayDiv.style.borderRadius = '6px';
    displayDiv.style.textAlign = 'center';
    displayDiv.style.fontSize = '0.95rem';
    displayDiv.style.display = 'none';
    chartContainer.appendChild(displayDiv);

    // Initialiser l'affichage
    updateStatsDisplay(null);
});
