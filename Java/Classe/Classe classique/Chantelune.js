// Création du graphique radar des caractéristiques
const ctx = document.getElementById('statsChart').getContext('2d');

// Données de base de Chantelune (échelle de -4 à +6)
const baseStats = {
    FOR: -3,
    CST: -3,
    DEX: 3,
    INT: 1,
    SAG: 3,
    PER: 1,
    CHA: 4
};

// Bonus des filières
const filiereBonuses = {
    'compositeur-musical': { 
        CHA: 1,  // +2 -1 = +1 au final
        INT: 2 
    },
    'chanteur-emerite': { 
        CHA: 2, 
        SAG: 3, 
        DEX: -2 
    },
    'chantelune-ombre': { 
        DEX: 2, 
        PER: 3, 
        CHA: -2 
    },
    'chanteguerre': { 
        FOR: 6,  // transforme -3 en +3 = +6
        CST: 5,  // transforme -3 en +2 = +5
        CHA: -2 
    }
};

// Noms des filières pour l'affichage
const filiereNames = {
    'compositeur-musical': 'Compositeur musical',
    'chanteur-emerite': 'Chanteur émérite',
    'chantelune-ombre': 'Chantelune de l\'Ombre',
    'chanteguerre': 'Chanteguerre'
};

let currentFiliere = null;

// Fonction pour calculer les stats avec bonus
function calculateStats(filiere) {
    const stats = { ...baseStats };
    if (filiere && filiereBonuses[filiere]) {
        const bonuses = filiereBonuses[filiere];
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
            backgroundColor: 'rgba(107, 127, 184, 0.3)',
            borderColor: 'rgba(138, 159, 218, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(232, 238, 255, 1)',
            pointBorderColor: 'rgba(138, 159, 218, 1)',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(138, 159, 218, 1)',
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
                backgroundColor: 'rgba(10, 14, 39, 0.6)',
                ticks: {
                    stepSize: 2,
                    callback: function(value) {
                        return value - 4;
                    },
                    color: '#e8eeff',
                    backdropColor: 'rgba(30, 39, 73, 0.95)',
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
                    color: 'rgba(107, 127, 184, 0.4)',
                    circular: true,
                    lineWidth: 1
                },
                angleLines: {
                    color: 'rgba(107, 127, 184, 0.4)',
                    lineWidth: 1
                },
                pointLabels: {
                    color: '#c8d5f7',
                    font: {
                        size: 15,
                        weight: 'bold',
                        family: "'Cinzel', serif"
                    },
                    backdropColor: 'rgba(30, 39, 73, 0.8)',
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
                backgroundColor: 'rgba(30, 39, 73, 0.95)',
                titleColor: '#c8d5f7',
                bodyColor: '#e8eeff',
                borderColor: 'rgba(107, 127, 184, 0.8)',
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
function updateChart(filiere) {
    const newStats = calculateStats(filiere);
    statsChart.data.datasets[0].data = convertStatsForChart(newStats);
    statsChart.update();
    currentFiliere = filiere;
    
    // Mettre à jour l'indicateur visuel
    updateFiliereSelection(filiere);
    updateStatsDisplay(filiere);
}

// Fonction pour mettre à jour l'affichage de la sélection
function updateFiliereSelection(filiere) {
    // Retirer la classe selected de toutes les cartes
    document.querySelectorAll('.filiere-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Ajouter la classe selected à la carte choisie
    if (filiere) {
        const selectedCard = document.querySelector(`.filiere-card.${filiere}`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// Fonction pour afficher les stats actuelles
function updateStatsDisplay(filiere) {
    const displayElement = document.getElementById('current-filiere-display');
    if (!displayElement) return;

    if (filiere) {
        const stats = calculateStats(filiere);
        const bonuses = filiereBonuses[filiere];
        let bonusText = '';
        
        for (let stat in bonuses) {
            bonusText += `${stat} ${bonuses[stat] >= 0 ? '+' : ''}${bonuses[stat]} `;
        }
        
        // Ajouter infos spéciales par filière
        let extraInfo = '';
        if (filiere === 'compositeur-musical') {
            extraInfo = '<br><strong>Bonus spécial :</strong> Talent Créateur inspiré, Composition +1, +1 Métier';
        } else if (filiere === 'chanteur-emerite') {
            extraInfo = '<br><strong>Bonus spécial :</strong> Beau Parleur mineur, Prestation chant +2, Belle voix, +1 Social/Sang-froid';
        } else if (filiere === 'chantelune-ombre') {
            extraInfo = '<br><strong>Bonus spécial :</strong> Furtivité silencieuse mineure, Furtivité +2, Pas léger +1, +1 Finesse/Instinct';
        } else if (filiere === 'chanteguerre') {
            extraInfo = '<br><strong>Bonus spécial :</strong> Maîtrise arme OU instruments guerre, -25% coût, +1 Résilience/Puissance';
        }
        
        displayElement.innerHTML = `
            <strong>Filière sélectionnée :</strong> ${filiereNames[filiere]}<br>
            <strong>Bonus appliqués :</strong> ${bonusText}${extraInfo}
        `;
        displayElement.style.display = 'block';
    } else {
        displayElement.innerHTML = '<strong>Aucune filière sélectionnée</strong> - Stats de base affichées';
        displayElement.style.display = 'block';
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const filiereCards = document.querySelectorAll('.filiere-card');
    
    // Ajouter les événements de clic sur les cartes de filière
    filiereCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function() {
            const filiereClass = Array.from(this.classList).find(cls => 
                ['compositeur-musical', 'chanteur-emerite', 'chantelune-ombre', 'chanteguerre'].includes(cls)
            );
            
            if (filiereClass) {
                // Si on clique sur la filière déjà sélectionnée, on la désélectionne
                if (currentFiliere === filiereClass) {
                    updateChart(null);
                } else {
                    updateChart(filiereClass);
                }
            }
        });
    });

    // Créer l'élément d'affichage de la filière sélectionnée
    const chartContainer = document.querySelector('.chart-container');
    const displayDiv = document.createElement('div');
    displayDiv.id = 'current-filiere-display';
    displayDiv.style.cssText = `
        margin-top: 18px;
        padding: 15px 20px;
        background: linear-gradient(135deg, rgba(107, 127, 184, 0.25), rgba(138, 159, 218, 0.15));
        border: 2px solid rgba(138, 159, 218, 0.4);
        border-radius: 10px;
        text-align: center;
        font-size: 0.95rem;
        color: #c8d5f7;
        display: none;
        line-height: 1.8;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 0 30px rgba(107, 127, 184, 0.2);
        backdrop-filter: blur(10px);
    `;
    chartContainer.appendChild(displayDiv);

    // Initialiser l'affichage
    updateStatsDisplay(null);
});