// Création du graphique radar des caractéristiques
const ctx = document.getElementById('statsChart').getContext('2d');

// Données de base du Médecin de la Peste Blanche (échelle de -4 à +6)
const baseStats = {
    FOR: -3,
    CST: -2,
    DEX: 2,
    INT: 4,
    SAG: 1,
    PER: 3,
    CHA: -3
};

// Bonus des Origines
const origineBonuses = {
    'scientifique': { PER: 3, INT: 2 },
    'medecin': { SAG: 3, INT: 2 },
    'passeur': { CST: 5, DEX: 2 } // CST -2 devient +3, donc +5 au total
};

// Noms des origines pour l'affichage
const origineNames = {
    'scientifique': 'Scientifique de la Peste',
    'medecin': 'Médecin Noir et Blanc',
    'passeur': 'Passeur du Fléau'
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
            backgroundColor: 'rgba(122, 139, 95, 0.25)',
            borderColor: 'rgba(184, 184, 112, 0.9)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(245, 245, 237, 1)',
            pointBorderColor: 'rgba(138, 138, 74, 1)',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(184, 184, 112, 1)',
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
                backgroundColor: 'rgba(13, 15, 13, 0.85)',
                ticks: {
                    stepSize: 2,
                    callback: function(value) {
                        return value - 4;
                    },
                    color: '#e8e8e0',
                    backdropColor: 'rgba(24, 26, 24, 0.95)',
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
                    color: 'rgba(122, 139, 95, 0.4)',
                    circular: true,
                    lineWidth: 1
                },
                angleLines: {
                    color: 'rgba(122, 139, 95, 0.4)',
                    lineWidth: 1
                },
                pointLabels: {
                    color: '#b8b870',
                    font: {
                        size: 15,
                        weight: 'bold',
                        family: "'Cinzel', serif"
                    },
                    backdropColor: 'rgba(24, 26, 24, 0.85)',
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
                backgroundColor: 'rgba(24, 26, 24, 0.95)',
                titleColor: '#b8b870',
                bodyColor: '#e8e8e0',
                borderColor: 'rgba(122, 139, 95, 0.7)',
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
        if (origine === 'scientifique') {
            extraInfo = '<br><strong>Talents :</strong> Étude Germes Blêmes (bonus PA recherche) • Fondements Culture Germinale (5×X PA, +10 type)<br><strong>Choix trait :</strong> +1 Métier/Savoir';
        } else if (origine === 'medecin') {
            extraInfo = '<br><strong>Talents :</strong> Voile de Quarantaine (alliés protégés zone) • Rendement Grâce (réduction charges)<br><strong>Choix trait :</strong> +1 Métier/Sang-froid/Social';
        } else if (origine === 'passeur') {
            extraInfo = '<br><strong>Talents :</strong> Incubation Germique (recharge/prolifération) • Exhalaison Sporale (réaction 5 ft)<br><strong>Note :</strong> CST −2 → +3 (transformation corporelle)<br><strong>Choix trait :</strong> +1 Résilience/Métier';
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
                ['scientifique', 'medecin', 'passeur'].includes(cls)
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
        background: linear-gradient(135deg, rgba(122, 139, 95, 0.3), rgba(90, 107, 69, 0.2));
        border: 2px solid rgba(122, 139, 95, 0.5);
        border-radius: 10px;
        text-align: center;
        font-size: 0.95rem;
        color: #e8e8e0;
        display: none;
        line-height: 1.8;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4), 0 0 30px rgba(90, 107, 69, 0.3);
        backdrop-filter: blur(10px);
    `;
    chartContainer.appendChild(displayDiv);

    // Initialiser l'affichage
    updateStatsDisplay(null);
});