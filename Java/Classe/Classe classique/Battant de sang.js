// Création du graphique radar des caractéristiques
const ctx = document.getElementById('statsChart').getContext('2d');

// Données de base du Battant de sang (échelle de -4 à +6)
const baseStats = {
    FOR: 6,
    CST: 2,
    DEX: 2,
    INT: -3,
    SAG: -2,
    PER: 1,
    CHA: -1
};

// Bonus des origines
// NOTE: Les origines du Battant de sang donnent principalement des talents plutôt que des bonus de stats
// Si vous souhaitez ajouter des bonus de caractéristiques, modifiez les valeurs ci-dessous
const origineBonuses = {
    'amoureux-affrontement': {}, // Aucun bonus de stats (donne +2 max Ferveur et talents)
    'terres-indomptees': {}, // Aucun bonus de stats (donne talents et compétences)
    'voie-mysticisme': {}, // Aucun bonus de stats (donne Éveil magique)
    'enfant-chaos': {} // Aucun bonus de stats (donne talents des Abysses)
};

// Noms des origines pour l'affichage
const origineNames = {
    'amoureux-affrontement': 'Amoureux de l\'affrontement',
    'terres-indomptees': 'Né des terres indomptées',
    'voie-mysticisme': 'Voie du mysticisme',
    'enfant-chaos': 'Enfant du Chaos'
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
        const stats = calculateStats(origine);
        
        // Ajouter infos spéciales par origine
        let extraInfo = '';
        if (origine === 'amoureux-affrontement') {
            extraInfo = '<br><strong>Bonus spécial :</strong> +2 maximum Ferveur, Amélioration maîtrise arme, Talent Combativité';
        } else if (origine === 'terres-indomptees') {
            extraInfo = '<br><strong>Bonus spécial :</strong> Style indompté, Postures combat +2, Sens entraîné +5, Instinct sauvage';
        } else if (origine === 'voie-mysticisme') {
            extraInfo = '<br><strong>Bonus spécial :</strong> Éveil magique (PM 1d12), Choix Chaman ou Mage';
        } else if (origine === 'enfant-chaos') {
            extraInfo = '<br><strong>Bonus spécial :</strong> Corps forgé Abysses, Déferlement Abysses (Avantage tous jets), Abîme intérieur +2';
        }
        
        displayElement.innerHTML = `
            <strong>Origine sélectionnée :</strong> ${origineNames[origine]}<br>
            <strong>Note :</strong> Cette origine donne des talents plutôt que des bonus de caractéristiques${extraInfo}
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
                ['amoureux-affrontement', 'terres-indomptees', 'voie-mysticisme', 'enfant-chaos'].includes(cls)
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