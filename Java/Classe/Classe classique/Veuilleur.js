// Création du graphique radar des caractéristiques
const ctx = document.getElementById('statsChart').getContext('2d');

// Données de base du Veilleur (échelle de -4 à +6)
const baseStats = {
    FOR: 2,
    CST: 3,
    DEX: 1,
    INT: -2,
    SAG: 1,
    PER: 1,
    CHA: -1
};

// Bonus des citadelles (incluant les 2 voies de Lame Funeste séparément)
const citadelBonuses = {
    'egide-ecarlate': { 
        CST: 2, 
        CHA: 2, 
        PER: 2, 
        DEX: -2, 
        INT: -2 
    },
    'crocs-cendres': { 
        PER: 3, 
        DEX: 2, 
        SAG: 1, 
        CHA: -2, 
        FOR: -1, 
        INT: -1 
    },
    'sceau-lion': { 
        INT: 2, 
        CHA: 2, 
        CST: 2, 
        DEX: -2, 
        PER: -1, 
        SAG: -1 
    },
    'sang-argent': { 
        CST: 3, 
        SAG: 2, 
        PER: 1, 
        CHA: -2, 
        DEX: -1, 
        INT: -1 
    },
    'lame-funeste-reformation': { 
        INT: 4, 
        CST: 2, 
        CHA: -2, 
        SAG: -1, 
        PER: -1 
    },
    'lame-funeste-mortuaire': { 
        SAG: 4, 
        CST: 2, 
        CHA: -2, 
        INT: -1, 
        DEX: -1 
    }
};

// Noms des citadelles pour l'affichage
const citadelNames = {
    'egide-ecarlate': 'Citadelle du Serment de l\'Égide Écarlate',
    'crocs-cendres': 'Citadelle des Crocs Cendrés',
    'sceau-lion': 'Citadelle du Sceau du Lion',
    'sang-argent': 'Citadelle du Sang d\'Argent',
    'lame-funeste-reformation': 'Citadelle de la Lame Funeste — Voie de la Réformation des Morts',
    'lame-funeste-mortuaire': 'Citadelle de la Lame Funeste — Voie Mortuaire'
};

let currentCitadel = null;

// Fonction pour calculer les stats avec bonus
function calculateStats(citadel) {
    const stats = { ...baseStats };
    if (citadel && citadelBonuses[citadel]) {
        const bonuses = citadelBonuses[citadel];
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
            backgroundColor: 'rgba(58, 74, 90, 0.2)',
            borderColor: 'rgba(58, 74, 90, 0.8)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(58, 74, 90, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(58, 74, 90, 1)',
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
                    color: '#3a4a5a',
                    font: {
                        size: 11,
                        weight: 'bold'
                    }
                },
                grid: {
                    color: 'rgba(58, 74, 90, 0.2)'
                },
                angleLines: {
                    color: 'rgba(58, 74, 90, 0.2)'
                },
                pointLabels: {
                    color: '#3a4a5a',
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
function updateChart(citadel) {
    const newStats = calculateStats(citadel);
    statsChart.data.datasets[0].data = convertStatsForChart(newStats);
    statsChart.update();
    currentCitadel = citadel;
    
    // Mettre à jour l'indicateur visuel
    updateCitadelSelection(citadel);
    updateStatsDisplay(citadel);
}

// Fonction pour mettre à jour l'affichage de la sélection
function updateCitadelSelection(citadel) {
    // Retirer la classe selected de toutes les cartes
    document.querySelectorAll('.citadel-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Ajouter la classe selected à la carte choisie
    if (citadel) {
        const selectedCard = document.querySelector(`.citadel-card.${citadel}`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// Fonction pour afficher les stats actuelles
function updateStatsDisplay(citadel) {
    const displayElement = document.getElementById('current-citadel-display');
    if (!displayElement) return;

    if (citadel) {
        const stats = calculateStats(citadel);
        const bonuses = citadelBonuses[citadel];
        let bonusText = '';
        
        for (let stat in bonuses) {
            bonusText += `${stat} ${bonuses[stat] >= 0 ? '+' : ''}${bonuses[stat]} `;
        }
        
        // Ajouter infos spéciales par citadelle
        let extraInfo = '';
        if (citadel === 'egide-ecarlate') {
            extraInfo = '<br><strong>Bonus spécial :</strong> Social +2, choix de 1 talent de formation';
        } else if (citadel === 'crocs-cendres') {
            extraInfo = '<br><strong>Bonus spécial :</strong> Instinct +2, choix de 1 talent de formation';
        } else if (citadel === 'sceau-lion') {
            extraInfo = '<br><strong>Bonus spécial :</strong> Sang-froid +2, Malédiction Lion Noir, choix de 1 talent';
        } else if (citadel === 'sang-argent') {
            extraInfo = '<br><strong>Bonus spécial :</strong> Résilience +2, Argent de Veille, Symbiose du Fleuve, Résistances 10%';
        } else if (citadel === 'lame-funeste-reformation') {
            extraInfo = '<br><strong>Bonus spécial :</strong> Savoir +2, Éveil magique (PM 1d12), Magie nécromantique maudite';
        } else if (citadel === 'lame-funeste-mortuaire') {
            extraInfo = '<br><strong>Bonus spécial :</strong> Sang-froid +2, Éveil magique (PM 1d12), Funéurgie d\'Ivoire';
        }
        
        displayElement.innerHTML = `
            <strong>Citadelle sélectionnée :</strong> ${citadelNames[citadel]}<br>
            <strong>Bonus appliqués :</strong> ${bonusText}${extraInfo}
        `;
        displayElement.style.display = 'block';
    } else {
        displayElement.innerHTML = '<strong>Aucune Citadelle sélectionnée</strong> - Stats de base affichées';
        displayElement.style.display = 'block';
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const citadelCards = document.querySelectorAll('.citadel-card');
    
    // Ajouter les événements de clic sur les cartes de citadelle
    citadelCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function() {
            const citadelClass = Array.from(this.classList).find(cls => 
                ['egide-ecarlate', 'crocs-cendres', 'sceau-lion', 'sang-argent', 'lame-funeste-reformation', 'lame-funeste-mortuaire'].includes(cls)
            );
            
            if (citadelClass) {
                // Si on clique sur la citadelle déjà sélectionnée, on la désélectionne
                if (currentCitadel === citadelClass) {
                    updateChart(null);
                } else {
                    updateChart(citadelClass);
                }
            }
        });
    });

    // Créer l'élément d'affichage de la citadelle sélectionnée
    const chartContainer = document.querySelector('.chart-container');
    const displayDiv = document.createElement('div');
    displayDiv.id = 'current-citadel-display';
    displayDiv.style.marginTop = '20px';
    displayDiv.style.padding = '15px';
    displayDiv.style.background = 'rgba(58, 74, 90, 0.1)';
    displayDiv.style.borderRadius = '6px';
    displayDiv.style.textAlign = 'center';
    displayDiv.style.fontSize = '0.95rem';
    displayDiv.style.display = 'none';
    chartContainer.appendChild(displayDiv);

    // Initialiser l'affichage
    updateStatsDisplay(null);
});