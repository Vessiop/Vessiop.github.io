// ─── GRAPHIQUE RADAR ──────────────────────────────────────────────────────
const ctx = document.getElementById('statsChart').getContext('2d');

// Stats de base Skaldar/Valkyrie
const baseStats = {
    FOR: 2,
    CST: -2,
    DEX: 2,
    INT: -3,
    SAG: 2,
    PER: 4,
    CHA: -1
};

// Bonus par Formation
const formationBonuses = {
    'formation-lance':  { FOR: 2, CST: 3 },  // CST: -2 → +1
    'formation-egide':  { CST: 5, SAG: 2 },  // CST: -2 → +3
    'formation-piquee': { PER: 2, CHA: 3 },  // CHA: -1 → +2
    'formation-meteo':  { INT: 6, CST: 4, SAG: -2 }  // INT: -3 → +3, CST: -2 → +2
};

const formationNames = {
    'formation-lance':  'Formation Lance',
    'formation-egide':  'Formation Égide',
    'formation-piquee': 'Formation Piquée',
    'formation-meteo':  'Formation Météorologique'
};

let currentFormation = null;

function calculateStats(formation) {
    const s = { ...baseStats };
    if (formation && formationBonuses[formation]) {
        for (const [k, v] of Object.entries(formationBonuses[formation])) {
            s[k] += v;
        }
    }
    return s;
}

// offset +4 pour centrer 0
function toChartData(stats) {
    return Object.values(stats).map(v => v + 4);
}

const statsChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['FOR', 'CST', 'DEX', 'INT', 'SAG', 'PER', 'CHA'],
        datasets: [{
            label: 'Caractéristiques',
            data: toChartData(baseStats),
            backgroundColor: 'rgba(192, 208, 224, 0.25)',
            borderColor:     'rgba(192, 208, 224, 0.9)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(192, 208, 224, 1)',
            pointBorderColor:     'rgba(74, 139, 181, 0.9)',
            pointHoverBackgroundColor: '#c0d0e0',
            pointHoverBorderColor:     'rgba(192, 208, 224, 1)',
            pointRadius: 5,
            pointHoverRadius: 7
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: { duration: 700, easing: 'easeInOutQuart' },
        scales: {
            r: {
                min: 0, max: 10,
                backgroundColor: 'rgba(8, 17, 31, 0.6)',
                ticks: {
                    stepSize: 2,
                    callback: v => v - 4,
                    color: '#a0b8c8',
                    backdropColor: 'rgba(8, 17, 31, 0.8)',
                    font: { size: 11, weight: 'bold' }
                },
                grid:        { color: 'rgba(44, 95, 126, 0.3)', circular: true },
                angleLines:  { color: 'rgba(44, 95, 126, 0.3)' },
                pointLabels: {
                    color: '#c0d0e0',
                    font: { size: 14, weight: 'bold', family: "'Cinzel', serif" }
                }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(8, 17, 31, 0.95)',
                titleColor: '#c0d0e0',
                bodyColor:  '#e8f0f8',
                borderColor: 'rgba(192, 208, 224, 0.5)',
                borderWidth: 1,
                callbacks: {
                    label: ctx => {
                        const v = ctx.parsed.r - 4;
                        return ctx.label + ': ' + (v >= 0 ? '+' : '') + v;
                    }
                }
            }
        }
    }
});

// ─── INTERACTIVITÉ FORMATIONS ─────────────────────────────────────────────
function updateChart(formation) {
    statsChart.data.datasets[0].data = toChartData(calculateStats(formation));
    statsChart.update();
    currentFormation = formation;
    updateSelection(formation);
    updateDisplay(formation);
}

function updateSelection(formation) {
    document.querySelectorAll('.origin-card').forEach(c => c.classList.remove('selected'));
    if (formation) {
        const card = document.querySelector(`.origin-card.${formation}`);
        if (card) {
            card.classList.add('selected');
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

function updateDisplay(formation) {
    const el = document.getElementById('formation-display');
    if (!el) return;

    if (formation) {
        const bonuses = formationBonuses[formation];
        const parts = Object.entries(bonuses).map(([k, v]) => `${k} ${v >= 0 ? '+' : ''}${v}`);
        el.innerHTML =
            `<strong>Formation sélectionnée :</strong> ${formationNames[formation]}<br>
             <strong>Gains appliqués :</strong> ${parts.join(' · ')}`;
        el.style.display = 'block';
    } else {
        el.innerHTML = '<strong>Aucune formation sélectionnée</strong> — Stats de base';
        el.style.display = 'block';
    }
}

// ─── INIT ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const formationKeys = Object.keys(formationBonuses);

    document.querySelectorAll('.origin-card').forEach(card => {
        card.addEventListener('click', () => {
            const key = Array.from(card.classList).find(c => formationKeys.includes(c));
            if (!key) return;
            updateChart(currentFormation === key ? null : key);
        });
    });

    // Créer l'indicateur sous le graphique
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
        const div = document.createElement('div');
        div.id = 'formation-display';
        div.style.cssText = `
            margin-top: 18px; padding: 13px 16px;
            background: rgba(44, 95, 126, 0.30);
            border: 1px solid rgba(192, 208, 224, 0.35);
            text-align: center; font-size: 0.92rem;
            color: #c0d0e0; display: none;
            line-height: 1.6;
        `;
        chartContainer.appendChild(div);
    }

    // ─── NUAGES ANIMÉS ────────────────────────────────────────────────────
    const cloudsEl = document.getElementById('clouds');
    if (!cloudsEl) return;

    const count = 8;
    
    for (let i = 0; i < count; i++) {
        const cloud = document.createElement('div');
        const width = 80 + Math.random() * 120;
        const height = 30 + Math.random() * 40;
        const opacity = 0.15 + Math.random() * 0.25;
        const duration = 40 + Math.random() * 60;
        const delay = -(Math.random() * duration);
        const startY = Math.random() * 100;

        cloud.style.cssText = `
            position: absolute;
            width: ${width}px;
            height: ${height}px;
            background: radial-gradient(ellipse at center, rgba(192, 208, 224, ${opacity}) 0%, transparent 70%);
            opacity: ${opacity};
            top: ${startY}%;
            left: -${width}px;
            border-radius: 50%;
            animation: cloudDrift ${duration}s ${delay}s linear infinite;
            pointer-events: none;
            filter: blur(${5 + Math.random() * 10}px);
        `;
        cloudsEl.appendChild(cloud);
    }

    // Injecter l'animation si pas déjà présente
    if (!document.getElementById('cloud-keyframes')) {
        const style = document.createElement('style');
        style.id = 'cloud-keyframes';
        style.textContent = `
            @keyframes cloudDrift {
                0% { 
                    transform: translateX(0); 
                    opacity: 0;
                }
                10% { opacity: 0.3; }
                90% { opacity: 0.2; }
                100% { 
                    transform: translateX(calc(100vw + 200px)); 
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});