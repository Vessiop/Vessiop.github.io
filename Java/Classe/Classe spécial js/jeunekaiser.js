// Création du graphique radar des caractéristiques
const ctx = document.getElementById('statsChart').getContext('2d');

// Données de base du Jeune Kaiser (échelle de -4 à +6)
const baseStats = {
    FOR: 1,
    CST: -1,
    DEX: -2,
    INT: 1,
    SAG: 2,
    PER: 1,
    CHA: 3
};

// Bonus des Origines d'Esprit
const origineBonuses = {
    'conquerant': { CHA: 3, PER: 2 },
    'rempart': { CST: 3, CHA: 2 },
    'humaniste': { SAG: 3, PER: 2 },
    'tyran': { CHA: 3, INT: 2 },
    'tenebres': { CHA: 3, INT: 2 }
};

// Noms des origines pour l'affichage
const origineNames = {
    'conquerant': 'Esprit du Conquérant',
    'rempart': 'Esprit du Rempart',
    'humaniste': 'Esprit de l\'Humaniste',
    'tyran': 'Esprit du Tyran',
    'tenebres': 'Esprit des Ténèbres Couronnées'
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
            backgroundColor: 'rgba(107, 45, 92, 0.3)',
            borderColor: 'rgba(212, 169, 68, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(232, 199, 102, 1)',
            pointBorderColor: 'rgba(212, 169, 68, 1)',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(212, 169, 68, 1)',
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
                backgroundColor: 'rgba(26, 22, 32, 0.8)',
                ticks: {
                    stepSize: 2,
                    callback: function(value) {
                        return value - 4;
                    },
                    color: '#e0e8f0',
                    backdropColor: 'rgba(42, 30, 46, 0.95)',
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
                    color: 'rgba(107, 45, 92, 0.5)',
                    circular: true,
                    lineWidth: 1
                },
                angleLines: {
                    color: 'rgba(107, 45, 92, 0.5)',
                    lineWidth: 1
                },
                pointLabels: {
                    color: '#e8c766',
                    font: {
                        size: 15,
                        weight: 'bold',
                        family: "'Cinzel', serif"
                    },
                    backdropColor: 'rgba(42, 30, 46, 0.85)',
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
                backgroundColor: 'rgba(42, 30, 46, 0.95)',
                titleColor: '#e8c766',
                bodyColor: '#e0e8f0',
                borderColor: 'rgba(107, 45, 92, 0.8)',
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
        if (origine === 'conquerant') {
            extraInfo = '<br><strong>Voie :</strong> Conquête • Bannière de guerre • Impulsion d\'Avant-Garde<br><strong>Choix trait :</strong> +1 Instinct/Social/Puissance';
        } else if (origine === 'rempart') {
            extraInfo = '<br><strong>Voie :</strong> Bastion • Bannière de rempart • Ligne inébranlable<br><strong>Choix trait :</strong> +1 Résilience/Sang-Froid/Puissance';
        } else if (origine === 'humaniste') {
            extraInfo = '<br><strong>Voie :</strong> Survie • Bannière médicale • Instinct de survie<br><strong>Choix trait :</strong> +1 Social/Sang-Froid/Savoir';
        } else if (origine === 'tyran') {
            extraInfo = '<br><strong>Voie :</strong> Peur • Bannière du tyran • Autorité absolue<br><strong>Choix trait :</strong> +1 Sang-Froid/Social/Puissance';
        } else if (origine === 'tenebres') {
            extraInfo = '<br><strong>Voie :</strong> Kaiser Couronné • Magie Ténèbres +2 • Sceptre Noir<br><strong>Choix trait :</strong> +1 Sang-Froid/Puissance/Savoir';
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
                ['conquerant', 'rempart', 'humaniste', 'tyran', 'tenebres'].includes(cls)
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
        background: linear-gradient(135deg, rgba(107, 45, 92, 0.35), rgba(212, 169, 68, 0.25));
        border: 2px solid rgba(212, 169, 68, 0.5);
        border-radius: 10px;
        text-align: center;
        font-size: 0.95rem;
        color: #e8c766;
        display: none;
        line-height: 1.8;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), 0 0 30px rgba(107, 45, 92, 0.3);
        backdrop-filter: blur(10px);
    `;
    chartContainer.appendChild(displayDiv);

    // Initialiser l'affichage
    updateStatsDisplay(null);
});