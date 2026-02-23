// ═══════════════════════════════════════════════════════════════
// DONNÉES DES ORIGINES
// ═══════════════════════════════════════════════════════════════

const originsData = {
    'origin-pilleur': {
        name: 'Pilleur des Salles Fortes',
        base: { DEX: 3 },
        choices: [
            { id: 'pilleur-char', options: ['INT', 'PER'], value: 1 }
        ]
    },
    'origin-main': {
        name: 'Main de la Ruée',
        base: { PER: 2, DEX: 2 },
        choices: []
    },
    'origin-rodeur': {
        name: 'Rôdeur de Convoi',
        base: { PER: 2 },
        choices: [
            { id: 'rodeur-char', options: ['FOR', 'DEX'], value: 2 }
        ]
    },
    'origin-charlatan': {
        name: 'Charlatan des Pavés',
        base: { CHA: 3 },
        choices: [
            { id: 'charlatan-char', options: ['INT', 'SAG'], value: 1 }
        ]
    }
};

// Stats de base du Filou
const baseStats = {
    FOR: -1,
    CST: -1,
    DEX: 3,
    INT: 1,
    SAG: -1,
    PER: 2,
    CHA: -1
};

// ═══════════════════════════════════════════════════════════════
// VARIABLES GLOBALES
// ═══════════════════════════════════════════════════════════════

let currentOrigin = null;
let statsChart = null;

// ═══════════════════════════════════════════════════════════════
// INITIALISATION
// ═══════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
    initializeChart();
    setupOriginListeners();
    setupChoiceListeners();
    createOriginDisplay();
});

// ═══════════════════════════════════════════════════════════════
// GRAPHIQUE
// ═══════════════════════════════════════════════════════════════

function initializeChart() {
    const ctx = document.getElementById('statsChart').getContext('2d');
    
    statsChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['FOR', 'CST', 'DEX', 'INT', 'SAG', 'PER', 'CHA'],
            datasets: [{
                label: 'Caractéristiques',
                data: toChartData(baseStats),
                backgroundColor: 'rgba(122, 90, 154, 0.3)',
                borderColor: 'rgba(122, 90, 154, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(122, 90, 154, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(122, 90, 154, 1)',
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
                    backgroundColor: 'rgba(26, 26, 26, 0.85)',
                    ticks: {
                        stepSize: 2,
                        callback: function(value) {
                            return value - 4;
                        },
                        color: '#9a7aba',
                        backdropColor: 'rgba(26, 26, 26, 0.95)',
                        font: {
                            size: 11,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(122, 90, 154, 0.3)',
                        circular: true
                    },
                    angleLines: {
                        color: 'rgba(122, 90, 154, 0.3)'
                    },
                    pointLabels: {
                        color: '#9a7aba',
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
                    display: true,
                    labels: {
                        color: '#9a7aba',
                        font: {
                            family: "'Cinzel', serif",
                            size: 12
                        },
                        filter: function(item) {
                            // Masquer les datasets "alt" dans la légende
                            return !item.text.includes('(alt:');
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(26, 26, 26, 0.95)',
                    titleColor: '#9a7aba',
                    bodyColor: '#e0e0e0',
                    borderColor: 'rgba(122, 90, 154, 0.7)',
                    borderWidth: 2,
                    callbacks: {
                        label: function(context) {
                            const actualValue = context.parsed.r - 4;
                            return context.dataset.label + ': ' + (actualValue >= 0 ? '+' : '') + actualValue;
                        }
                    }
                }
            }
        }
    });
}

function toChartData(stats) {
    return Object.values(stats).map(v => v + 4);
}

// ═══════════════════════════════════════════════════════════════
// GESTION DES ORIGINES
// ═══════════════════════════════════════════════════════════════

function setupOriginListeners() {
    document.querySelectorAll('.origin-card').forEach(card => {
        // Ne gérer que les cartes d'origine (pas celles des autres sections)
        const originClass = Array.from(card.classList).find(cls => 
            ['origin-pilleur', 'origin-main', 'origin-rodeur', 'origin-charlatan'].includes(cls)
        );
        
        if (!originClass) return;
        
        card.addEventListener('click', (e) => {
            // Ignorer si on clique sur un input radio
            if (e.target.tagName === 'INPUT' || e.target.closest('.choice-label')) {
                return;
            }
            
            // Toggle sélection
            if (currentOrigin === originClass) {
                currentOrigin = null;
            } else {
                currentOrigin = originClass;
            }
            
            updateSelection();
            updateChart();
            updateDisplay();
        });
    });
}

function setupChoiceListeners() {
    document.querySelectorAll('.choice-label input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', () => {
            if (currentOrigin) {
                updateChart();
                updateDisplay();
            }
        });
    });
}

function updateSelection() {
    document.querySelectorAll('.origin-card').forEach(card => {
        const originClass = Array.from(card.classList).find(cls => 
            ['origin-pilleur', 'origin-main', 'origin-rodeur', 'origin-charlatan'].includes(cls)
        );
        
        if (originClass) {
            if (currentOrigin === originClass) {
                card.classList.add('selected');
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                card.classList.remove('selected');
            }
        }
    });
}

// ═══════════════════════════════════════════════════════════════
// CALCUL DES STATS
// ═══════════════════════════════════════════════════════════════

function calculateStats(origin) {
    const stats = { ...baseStats };
    
    if (!origin || !originsData[origin]) return stats;
    
    const originData = originsData[origin];
    
    // Ajouter les bonus de base
    Object.entries(originData.base).forEach(([stat, value]) => {
        stats[stat] += value;
    });
    
    // Ajouter les choix sélectionnés
    originData.choices.forEach(choice => {
        const selected = document.querySelector(`input[name="${choice.id}"]:checked`);
        if (selected) {
            stats[selected.value] += choice.value;
        }
    });
    
    return stats;
}

function getAlternativeDatasets(origin) {
    if (!origin || !originsData[origin]) return [];
    
    const originData = originsData[origin];
    const alternatives = [];
    
    // Pour chaque choix
    originData.choices.forEach(choice => {
        const selected = document.querySelector(`input[name="${choice.id}"]:checked`);
        const selectedValue = selected ? selected.value : choice.options[0];
        
        // Créer un dataset pour chaque option NON sélectionnée
        choice.options.forEach(option => {
            if (option !== selectedValue) {
                const altStats = { ...baseStats };
                
                // Ajouter bonus de base
                Object.entries(originData.base).forEach(([stat, value]) => {
                    altStats[stat] += value;
                });
                
                // Ajouter cette option alternative
                altStats[option] += choice.value;
                
                // Ajouter les autres choix sélectionnés (s'il y en a plusieurs)
                originData.choices.forEach(otherChoice => {
                    if (otherChoice.id !== choice.id) {
                        const otherSelected = document.querySelector(`input[name="${otherChoice.id}"]:checked`);
                        if (otherSelected) {
                            altStats[otherSelected.value] += otherChoice.value;
                        }
                    }
                });
                
                alternatives.push({
                    label: `${originData.name} (alt: ${option})`,
                    data: toChartData(altStats),
                    backgroundColor: 'rgba(106, 90, 122, 0.1)',
                    borderColor: 'rgba(106, 90, 122, 0.4)',
                    borderWidth: 1,
                    borderDash: [5, 5],
                    pointBackgroundColor: 'rgba(106, 90, 122, 0.4)',
                    pointBorderColor: 'rgba(106, 90, 122, 0.2)',
                    pointRadius: 3,
                    pointHoverRadius: 5
                });
            }
        });
    });
    
    return alternatives;
}

// ═══════════════════════════════════════════════════════════════
// MISE À JOUR DU GRAPHIQUE
// ═══════════════════════════════════════════════════════════════

function updateChart() {
    const stats = calculateStats(currentOrigin);
    const datasets = [];
    
    // Dataset principal
    if (currentOrigin && originsData[currentOrigin]) {
        datasets.push({
            label: originsData[currentOrigin].name,
            data: toChartData(stats),
            backgroundColor: 'rgba(122, 90, 154, 0.3)',
            borderColor: 'rgba(122, 90, 154, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(122, 90, 154, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(122, 90, 154, 1)',
            pointRadius: 5,
            pointHoverRadius: 7
        });
        
        // Datasets alternatifs
        const alternatives = getAlternativeDatasets(currentOrigin);
        datasets.push(...alternatives);
    } else {
        // Stats de base seulement
        datasets.push({
            label: 'Caractéristiques de base',
            data: toChartData(stats),
            backgroundColor: 'rgba(122, 90, 154, 0.3)',
            borderColor: 'rgba(122, 90, 154, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(122, 90, 154, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(122, 90, 154, 1)',
            pointRadius: 5,
            pointHoverRadius: 7
        });
    }
    
    statsChart.data.datasets = datasets;
    statsChart.update();
}

// ═══════════════════════════════════════════════════════════════
// AFFICHAGE SOUS LE GRAPHIQUE
// ═══════════════════════════════════════════════════════════════

function createOriginDisplay() {
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
        const div = document.createElement('div');
        div.id = 'origin-display';
        div.style.cssText = `
            margin-top: 18px;
            padding: 13px 16px;
            background: linear-gradient(135deg, rgba(122, 90, 154, 0.12), rgba(106, 90, 122, 0.10));
            border: 1px solid rgba(122, 90, 154, 0.35);
            border-radius: 6px;
            text-align: center;
            font-size: 0.92rem;
            color: #9a7aba;
            display: none;
            line-height: 1.6;
            box-shadow: inset 0 1px 0 rgba(122, 90, 154, 0.10), 0 2px 8px rgba(0, 0, 0, 0.6);
        `;
        chartContainer.appendChild(div);
    }
}

function updateDisplay() {
    const el = document.getElementById('origin-display');
    if (!el) return;

    if (currentOrigin && originsData[currentOrigin]) {
        const originData = originsData[currentOrigin];
        const stats = calculateStats(currentOrigin);
        
        // Calculer les bonus appliqués
        const bonuses = [];
        Object.entries(originData.base).forEach(([stat, value]) => {
            bonuses.push(`${stat} ${value >= 0 ? '+' : ''}${value}`);
        });
        
        // Ajouter les choix sélectionnés
        originData.choices.forEach(choice => {
            const selected = document.querySelector(`input[name="${choice.id}"]:checked`);
            if (selected) {
                bonuses.push(`${selected.value} +${choice.value}`);
            }
        });
        
        el.innerHTML = `
            <strong>Origine sélectionnée :</strong> ${originData.name}<br>
            <strong>Bonus appliqués :</strong> ${bonuses.join(' · ')}
        `;
        el.style.display = 'block';
    } else {
        el.innerHTML = '<strong>Aucune origine sélectionnée</strong> — Stats de base';
        el.style.display = 'block';
    }
}