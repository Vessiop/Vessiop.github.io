// Création du graphique radar des caractéristiques
const ctx = document.getElementById('statsChart').getContext('2d');

// Données de base de Lame-Sort (échelle de -4 à +6)
const baseStats = {
    FOR: -2,
    CST: -1,
    DEX: 3,
    INT: 3,
    SAG: 3,
    PER: 0,
    CHA: -3
};

// Bonus des parcours makariens
const parcoursBonuses = {
    'clan-desert': { 
        INT: 3, 
        DEX: 3 
    },
    'maison-korrina': { 
        PER: 3, 
        DEX: 3 
    },
    'monde-souterrain': { 
        SAG: 3, 
        CST: 4  // -1 devient +3, donc +4 total
    },
    'guerrier-elementaire': { 
        INT: 3, 
        CST: 4  // -1 devient +3, donc +4 total
    },
    'champion-desert': { 
        FOR: 6  // -2 devient +4, donc +6 total
        // +5 REA mentionné mais pas sur le graphique
    }
};

// Noms des parcours pour l'affichage
const parcoursNames = {
    'clan-desert': 'Clan du Désert',
    'maison-korrina': 'Maison Korrina',
    'monde-souterrain': 'Monde Souterrain',
    'guerrier-elementaire': 'Guerrier Élémentaire',
    'champion-desert': 'Combattant Avant l\'Art — « Champion du Désert »'
};

let currentParcours = null;

// Fonction pour calculer les stats avec bonus
function calculateStats(parcours) {
    const stats = { ...baseStats };
    if (parcours && parcoursBonuses[parcours]) {
        const bonuses = parcoursBonuses[parcours];
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
            backgroundColor: 'rgba(212, 165, 116, 0.2)',
            borderColor: 'rgba(212, 165, 116, 0.8)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(212, 165, 116, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(212, 165, 116, 1)',
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
                    color: '#7a5230',
                    font: {
                        size: 11,
                        weight: 'bold'
                    }
                },
                grid: {
                    color: 'rgba(122, 82, 48, 0.2)'
                },
                angleLines: {
                    color: 'rgba(122, 82, 48, 0.2)'
                },
                pointLabels: {
                    color: '#7a5230',
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
function updateChart(parcours) {
    const newStats = calculateStats(parcours);
    statsChart.data.datasets[0].data = convertStatsForChart(newStats);
    statsChart.update();
    currentParcours = parcours;
    
    // Mettre à jour l'indicateur visuel
    updateParcoursSelection(parcours);
    updateStatsDisplay(parcours);
}

// Fonction pour mettre à jour l'affichage de la sélection
function updateParcoursSelection(parcours) {
    // Retirer la classe selected de toutes les cartes
    document.querySelectorAll('.parcours-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Ajouter la classe selected à la carte choisie
    if (parcours) {
        const selectedCard = document.querySelector(`.parcours-card.${parcours}`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
            selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// Fonction pour afficher les stats actuelles
function updateStatsDisplay(parcours) {
    const displayElement = document.getElementById('current-parcours-display');
    if (!displayElement) return;

    if (parcours) {
        const stats = calculateStats(parcours);
        const bonuses = parcoursBonuses[parcours];
        let bonusText = '';
        
        for (let stat in bonuses) {
            bonusText += `${stat} ${bonuses[stat] >= 0 ? '+' : ''}${bonuses[stat]} `;
        }
        
        // Ajouter infos spéciales par parcours
        let extraInfo = '';
        if (parcours === 'clan-desert') {
            extraInfo = '<br><strong>Bonus spécial :</strong> +1 Instinct/Savoir, amélioration Enchantement/Insufflation, Écoute des Rémanences';
        } else if (parcours === 'maison-korrina') {
            extraInfo = '<br><strong>Bonus spécial :</strong> +1 Finesse/Social/Sang-froid, Furtivité silencieuse, Dialecte Criminel, Affiliation Korrina';
        } else if (parcours === 'monde-souterrain') {
            extraInfo = '<br><strong>Bonus spécial :</strong> +1 Métier/Sang-froid, Sens entraîné +5, Forge d\'Essence Runelame';
        } else if (parcours === 'guerrier-elementaire') {
            extraInfo = '<br><strong>Bonus spécial :</strong> +1 Savoir/Résilience, amélioration Runelame, Accord Élémentaire';
        } else if (parcours === 'champion-desert') {
            extraInfo = '<br><strong>Bonus spécial :</strong> +1 Puissance/Résilience, +5 REA, amélioration Sabre, Endurance des Dunes';
        }
        
        displayElement.innerHTML = `
            <strong>Parcours sélectionné :</strong> ${parcoursNames[parcours]}<br>
            <strong>Bonus appliqués :</strong> ${bonusText}${extraInfo}
        `;
        displayElement.style.display = 'block';
    } else {
        displayElement.innerHTML = '<strong>Aucun Parcours sélectionné</strong> - Stats de base affichées';
        displayElement.style.display = 'block';
    }
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const parcoursCards = document.querySelectorAll('.parcours-card');
    
    // Ajouter les événements de clic sur les cartes de parcours
    parcoursCards.forEach(card => {
        card.style.cursor = 'pointer';
        
        card.addEventListener('click', function() {
            const parcoursClass = Array.from(this.classList).find(cls => 
                ['clan-desert', 'maison-korrina', 'monde-souterrain', 'guerrier-elementaire', 'champion-desert'].includes(cls)
            );
            
            if (parcoursClass) {
                // Si on clique sur le parcours déjà sélectionné, on le désélectionne
                if (currentParcours === parcoursClass) {
                    updateChart(null);
                } else {
                    updateChart(parcoursClass);
                }
            }
        });
    });

    // Créer l'élément d'affichage du parcours sélectionné
    const chartContainer = document.querySelector('.chart-container');
    const displayDiv = document.createElement('div');
    displayDiv.id = 'current-parcours-display';
    displayDiv.style.marginTop = '20px';
    displayDiv.style.padding = '15px';
    displayDiv.style.background = 'rgba(212, 165, 116, 0.1)';
    displayDiv.style.borderRadius = '6px';
    displayDiv.style.textAlign = 'center';
    displayDiv.style.fontSize = '0.95rem';
    displayDiv.style.display = 'none';
    chartContainer.appendChild(displayDiv);

    // Initialiser l'affichage
    updateStatsDisplay(null);
    
    // Gestion des liens de connaissances
    const knowledgeLinks = document.querySelectorAll('.knowledge-link');
    knowledgeLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Scroll vers l'élément
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Flasher l'élément pour attirer l'attention
                targetElement.style.transition = 'all 0.3s ease';
                targetElement.style.backgroundColor = 'rgba(218, 165, 32, 0.2)';
                
                setTimeout(() => {
                    targetElement.style.backgroundColor = '';
                }, 1500);
            }
        });
    });
});