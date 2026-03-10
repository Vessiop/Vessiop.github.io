// Création du graphique radar des caractéristiques
const ctx = document.getElementById('statsChart').getContext('2d');

// Données de base de l'Acolyte Mortuaire (échelle de -4 à +6)
const baseStats = {
    FOR: 1,
    CST: 2,
    DEX: -2,
    INT: 1,
    SAG: 4,
    PER: 2,
    CHA: -2
};

// Bonus des Origines
const origineBonuses = {
    'passeur': { FOR: 3, PER: 2 },
    'porte-flamme': { INT: 3, SAG: 2 },
    'redemption': { CST: 3, PER: 2 }
};

// Noms des origines pour l'affichage
const origineNames = {
    'passeur': 'Passeur du Dernier Foyer',
    'porte-flamme': 'Porte-Flamme d\'Ivoire',
    'redemption': 'Chemin de la Rédemption Mortuaire'
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
            backgroundColor: 'rgba(200, 184, 150, 0.2)',
            borderColor: 'rgba(235, 229, 220, 0.9)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(245, 240, 232, 1)',
            pointBorderColor: 'rgba(200, 184, 150, 1)',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(235, 229, 220, 1)',
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
                backgroundColor: 'rgba(15, 14, 13, 0.85)',
                ticks: {
                    stepSize: 2,
                    callback: function(value) {
                        return value - 4;
                    },
                    color: '#ebe5dc',
                    backdropColor: 'rgba(26, 24, 22, 0.95)',
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
                    color: 'rgba(200, 184, 150, 0.35)',
                    circular: true,
                    lineWidth: 1
                },
                angleLines: {
                    color: 'rgba(200, 184, 150, 0.35)',
                    lineWidth: 1
                },
                pointLabels: {
                    color: '#c8b896',
                    font: {
                        size: 15,
                        weight: 'bold',
                        family: "'Cinzel', serif"
                    },
                    backdropColor: 'rgba(26, 24, 22, 0.85)',
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
                backgroundColor: 'rgba(26, 24, 22, 0.95)',
                titleColor: '#c8b896',
                bodyColor: '#ebe5dc',
                borderColor: 'rgba(200, 184, 150, 0.7)',
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
        if (origine === 'passeur') {
            extraInfo = '<br><strong>Talents :</strong> Veilleur du Seuil d\'Ivoire (+10 MD) • Socle du Foyer Blanc (−50 % dégâts)<br><strong>Choix trait :</strong> +1 Sang-froid/Résilience';
        } else if (origine === 'porte-flamme') {
            extraInfo = '<br><strong>Talents :</strong> Grâce Litanies (réduit ZM) • Froid du Repos Sacré (+10 % RM glace/sang)<br><strong>Choix trait :</strong> +1 Savoir/Sang-froid/Puissance';
        } else if (origine === 'redemption') {
            extraInfo = '<br><strong>Talents :</strong> Chair du Pardon (−50 % dégâts) • Flair des Tombes (Avantage pistage)<br><strong>Choix trait :</strong> +1 Sang-froid/Résilience/Instinct';
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
                ['passeur', 'porte-flamme', 'redemption'].includes(cls)
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
        background: linear-gradient(135deg, rgba(200, 184, 150, 0.25), rgba(154, 150, 144, 0.15));
        border: 2px solid rgba(200, 184, 150, 0.4);
        border-radius: 10px;
        text-align: center;
        font-size: 0.95rem;
        color: #ebe5dc;
        display: none;
        line-height: 1.8;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), 0 0 30px rgba(200, 184, 150, 0.2);
        backdrop-filter: blur(10px);
    `;
    chartContainer.appendChild(displayDiv);

    // Initialiser l'affichage
    updateStatsDisplay(null);
});