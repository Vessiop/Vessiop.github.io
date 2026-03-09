// Création du graphique radar des caractéristiques
const ctx = document.getElementById('statsChart').getContext('2d');

// Données de base de l'Acolyte Azuré (échelle de -4 à +6)
const baseStats = {
    FOR: 1,
    CST: 0,
    DEX: -1,
    INT: -1,
    SAG: 3,
    PER: 0,
    CHA: 2
};

// Bonus des Origines
const origineBonuses = {
    'porte-flamme': { PER: 3, SAG: 2 },
    'douce-flamme': { CST: 3, SAG: 2 },
    'veilleur': { FOR: 3, CST: 2 },
    'devot': { SAG: 3, CHA: 2 }
};

// Noms des origines pour l'affichage
const origineNames = {
    'porte-flamme': 'Chemin du Porte-Flamme',
    'douce-flamme': 'Enfant de la Douce Flamme',
    'veilleur': 'Veilleur de la Flamme Azurée',
    'devot': 'Dévots de Saphélis'
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
            backgroundColor: 'rgba(74, 159, 216, 0.25)',
            borderColor: 'rgba(123, 188, 232, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(200, 224, 247, 1)',
            pointBorderColor: 'rgba(74, 159, 216, 1)',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(123, 188, 232, 1)',
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
                backgroundColor: 'rgba(15, 26, 40, 0.85)',
                ticks: {
                    stepSize: 2,
                    callback: function(value) {
                        return value - 4;
                    },
                    color: '#c8e0f7',
                    backdropColor: 'rgba(26, 40, 56, 0.95)',
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
                    color: 'rgba(74, 159, 216, 0.4)',
                    circular: true,
                    lineWidth: 1
                },
                angleLines: {
                    color: 'rgba(74, 159, 216, 0.4)',
                    lineWidth: 1
                },
                pointLabels: {
                    color: '#7bbce8',
                    font: {
                        size: 15,
                        weight: 'bold',
                        family: "'Cinzel', serif"
                    },
                    backdropColor: 'rgba(26, 40, 56, 0.85)',
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
                backgroundColor: 'rgba(26, 40, 56, 0.95)',
                titleColor: '#7bbce8',
                bodyColor: '#c8e0f7',
                borderColor: 'rgba(74, 159, 216, 0.8)',
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
            bonusText += `${stat} +${bonuses[stat]} `;
        }
        
        // Ajouter infos spéciales
        let extraInfo = '';
        if (origine === 'porte-flamme') {
            extraInfo = '<br><strong>Talents :</strong> Orientation +2 • Guidé par l\'Azur<br><strong>Choix trait :</strong> +1 Instinct/Métier/Finesse';
        } else if (origine === 'douce-flamme') {
            extraInfo = '<br><strong>Talents :</strong> Savoir-faire évolutif • Réconfort de Braise Douce<br><strong>Choix trait :</strong> +1 Social/Sang-froid/Métier';
        } else if (origine === 'veilleur') {
            extraInfo = '<br><strong>Talents :</strong> Arme au choix • Rempart des Impurs (+10 MD)<br><strong>Choix trait :</strong> +1 Puissance/Résilience/Sang-froid';
        } else if (origine === 'devot') {
            extraInfo = '<br><strong>Talents :</strong> Noyau d\'Offrande Azurée (+4 AA) • Orant de la Veille<br><strong>Choix trait :</strong> +1 Social/Savoir/Sang-froid';
        }
        
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
                ['porte-flamme', 'douce-flamme', 'veilleur', 'devot'].includes(cls)
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
    displayDiv.style.cssText = `
        margin-top: 18px;
        padding: 15px 20px;
        background: linear-gradient(135deg, rgba(74, 159, 216, 0.3), rgba(200, 224, 247, 0.2));
        border: 2px solid rgba(123, 188, 232, 0.5);
        border-radius: 10px;
        text-align: center;
        font-size: 0.95rem;
        color: #c8e0f7;
        display: none;
        line-height: 1.8;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), 0 0 30px rgba(74, 159, 216, 0.3);
        backdrop-filter: blur(10px);
    `;
    chartContainer.appendChild(displayDiv);

    // Initialiser l'affichage
    updateStatsDisplay(null);
});