// Création du graphique radar des caractéristiques
const ctx = document.getElementById('statsChart').getContext('2d');

// Données de base de Liant (échelle de -4 à +6)
const baseStats = {
    FOR: -1,
    CST: -1,
    DEX: 1,
    INT: 0,
    SAG: 2,
    PER: 2,
    CHA: 4
};

// Bonus des départs animaliers
const departBonuses = {
    'compagnon-longue-route': { 
        CHA: 3 
    },
    'sillage-hurons': { 
        PER: 3 
    },
    'frontiere-indomptee': { 
        CST: 3 
    },
    'appel-montures': { 
        DEX: 2,
        FOR: 2
    },
    'sillage-arcaniums': { 
        INT: 2,
        SAG: 2
    }
};

// Noms des départs pour l'affichage
const departNames = {
    'compagnon-longue-route': 'Compagnon de Longue Route',
    'sillage-hurons': 'Sillage des Hurons Gris',
    'frontiere-indomptee': 'Frontière Indomptée',
    'appel-montures': 'Appel des Montures Oubliées',
    'sillage-arcaniums': 'Sillage des Arcaniums'
};

let currentDepart = null;

// Fonction pour calculer les stats avec bonus
function calculateStats(depart) {
    const stats = { ...baseStats };
    if (depart && departBonuses[depart]) {
        const bonuses = departBonuses[depart];
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
            backgroundColor: 'rgba(76, 175, 80, 0.2)',
            borderColor: 'rgba(76, 175, 80, 0.8)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(76, 175, 80, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(76, 175, 80, 1)',
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
                    color: '#2E7D32',
                    font: {
                        size: 11,
                        weight: 'bold'
                    }
                },
                grid: {
                    color: 'rgba(76, 175, 80, 0.2)'
                },
                angleLines: {
                    color: 'rgba(76, 175, 80, 0.2)'
                },
                pointLabels: {
                    color: '#2E7D32',
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
function updateChart(depart) {
    const newStats = calculateStats(depart);
    statsChart.data.datasets[0].data = convertStatsForChart(newStats);
    statsChart.update();
    currentDepart = depart;
    
    // Mettre à jour l'indicateur visuel
    updateDepartSelection(depart);
    updateStatsDisplay(depart);
}

// Fonction pour mettre à jour l'affichage de la sélection
function updateDepartSelection(depart) {
    // Retirer la classe selected de toutes les cartes
    document.querySelectorAll('.depart-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Ajouter la classe selected à la carte choisie
    if (depart) {
        const selectedCard = document.querySelector(`.depart-card.${depart}`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// Fonction pour afficher les stats actuelles
function updateStatsDisplay(depart) {
    const displayElement = document.getElementById('current-depart-display');
    if (!displayElement) return;

    if (depart) {
        const stats = calculateStats(depart);
        const bonuses = departBonuses[depart];
        let bonusText = '';
        
        for (let stat in bonuses) {
            bonusText += `${stat} ${bonuses[stat] >= 0 ? '+' : ''}${bonuses[stat]} `;
        }
        
        // Ajouter infos spéciales par départ
        let extraInfo = '';
        if (depart === 'compagnon-longue-route') {
            extraInfo = '<br><strong>Spécialités :</strong> Seconde Chance (animalier), Départ Accordé (niveau 3 de lien), Amitié de Route';
        } else if (depart === 'sillage-hurons') {
            extraInfo = '<br><strong>Spécialités :</strong> Connaissances (Survie, Chasse, Bestiaire), Maîtrise arme distance, Maître Pistage, Accès Draconoïde';
        } else if (depart === 'frontiere-indomptee') {
            extraInfo = '<br><strong>Spécialités :</strong> Instinct Endurci, Faune des Confins, Amitié des Confins (lien garanti)';
        } else if (depart === 'appel-montures') {
            extraInfo = '<br><strong>Spécialités :</strong> Maîtrise arme d\'hast, Conduite de monture, Connaissances (Mythes, Créatures anciennes)';
        } else if (depart === 'sillage-arcaniums') {
            extraInfo = '<br><strong>Spécialités :</strong> Éveil magique (PM 1d12), Connaissances (Créatures élémentaires, Mythes), Accès Élémentaire';
        }
        
        displayElement.innerHTML = `
            <strong>Départ sélectionné :</strong> ${departNames[depart]}<br>
            <strong>Bonus appliqués :</strong> ${bonusText}${extraInfo}
        `;
        displayElement.style.display = 'block';
    } else {
        displayElement.innerHTML = '<strong>Aucun Départ sélectionné</strong> - Stats de base affichées';
        displayElement.style.display = 'block';
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const departCards = document.querySelectorAll('.depart-card');
    
    // Ajouter les événements de clic sur les cartes de départs
    departCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function() {
            const departClass = Array.from(this.classList).find(cls => 
                ['compagnon-longue-route', 'sillage-hurons', 'frontiere-indomptee', 'appel-montures', 'sillage-arcaniums'].includes(cls)
            );
            
            if (departClass) {
                // Si on clique sur le départ déjà sélectionné, on le désélectionne
                if (currentDepart === departClass) {
                    updateChart(null);
                } else {
                    updateChart(departClass);
                }
            }
        });
    });

    // Créer l'élément d'affichage du départ sélectionné
    const chartContainer = document.querySelector('.chart-container');
    const displayDiv = document.createElement('div');
    displayDiv.id = 'current-depart-display';
    displayDiv.style.marginTop = '20px';
    displayDiv.style.padding = '15px';
    displayDiv.style.background = 'rgba(76, 175, 80, 0.1)';
    displayDiv.style.borderRadius = '6px';
    displayDiv.style.textAlign = 'center';
    displayDiv.style.fontSize = '0.95rem';
    displayDiv.style.display = 'none';
    chartContainer.appendChild(displayDiv);

    // Initialiser l'affichage
    updateStatsDisplay(null);
});