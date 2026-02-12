// ─── GRAPHIQUE RADAR ──────────────────────────────────────────────────────
const ctx = document.getElementById('statsChart').getContext('2d');

// Stats de base de l'Éclat du Cirque
const baseStats = {
    FOR: -2,
    CST: -2,
    DEX: 3,
    INT: 1,
    SAG: 3,
    PER: 0,
    CHA: 3
};

// Bonus par Formation (delta appliqué sur les stats de base)
const formationBonuses = {
    'formation-clown':      { CHA: 3, FOR: 2 },
    'formation-trapeze':    { DEX: 3, PER: 2 },
    'formation-acteur':     { DEX: 3, INT: 2 },
    'formation-costumier':  { INT: 3, CHA: 2 },
    'formation-technicien': { PER: 3, INT: 2 },
    'formation-sorciere':   { INT: 3, SAG: 2 }
};

const formationNames = {
    'formation-clown':      'ClownGard',
    'formation-trapeze':    'Trapézistes',
    'formation-acteur':     'Acteur de Cirque',
    'formation-costumier':  'Costumier',
    'formation-technicien': 'Technicien de l\'ombre',
    'formation-sorciere':   'Sorcière enchanteresse'
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

// offset +4 pour centrer 0 sur le graphique
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
            backgroundColor: 'rgba(244, 196, 48, 0.25)',
            borderColor:     'rgba(244, 196, 48, 0.9)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(244, 196, 48, 1)',
            pointBorderColor:     'rgba(232, 74, 95, 0.9)',
            pointHoverBackgroundColor: '#f4c430',
            pointHoverBorderColor:     'rgba(244, 196, 48, 1)',
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
                backgroundColor: 'rgba(15,8,15,0.6)',
                ticks: {
                    stepSize: 2,
                    callback: v => v - 4,
                    color: '#c8a870',
                    backdropColor: 'rgba(15,8,15,0.8)',
                    font: { size: 11, weight: 'bold' }
                },
                grid:        { color: 'rgba(196,30,58,0.25)', circular: true },
                angleLines:  { color: 'rgba(196,30,58,0.25)' },
                pointLabels: {
                    color: '#f4c430',
                    font: { size: 14, weight: 'bold', family: "'Cinzel', serif" }
                }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(15,8,15,0.95)',
                titleColor: '#f4c430',
                bodyColor:  '#f4e8d8',
                borderColor: 'rgba(244,196,48,0.5)',
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
            background: rgba(196,30,58,0.25);
            border: 1px solid rgba(244,196,48,0.35);
            text-align: center; font-size: 0.92rem;
            color: #f4c430; display: none;
            line-height: 1.6;
        `;
        chartContainer.appendChild(div);
    }

    // ─── CONFETTIS ADDITIONNELS ───────────────────────────────────────────
    const confettiEl = document.getElementById('confetti');
    if (!confettiEl) return;

    const count = 25;
    const colors = ['#f4c430', '#e84a5f', '#2e5090', '#d45a9a', '#2a9d8f'];
    
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('div');
        const size = 3 + Math.random() * 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const opacity = 0.3 + Math.random() * 0.4;
        const duration = 8 + Math.random() * 15;
        const delay = -(Math.random() * duration);
        const startX = Math.random() * 100;
        const startY = 100 + Math.random() * 20;
        const rotation = Math.random() * 360;

        dot.style.cssText = `
            position: absolute;
            width: ${size}px; height: ${size}px;
            background: ${color};
            opacity: ${opacity};
            left: ${startX}%;
            top: ${startY}%;
            transform: rotate(${rotation}deg);
            animation: confettiFall ${duration}s ${delay}s linear infinite;
            pointer-events: none;
        `;
        confettiEl.appendChild(dot);
    }

    // Injecter l'animation si pas déjà présente
    if (!document.getElementById('confetti-keyframes')) {
        const style = document.createElement('style');
        style.id = 'confetti-keyframes';
        style.textContent = `
            @keyframes confettiFall {
                0%   { 
                    transform: translateY(0) translateX(0) rotate(0deg); 
                    opacity: 0; 
                }
                10%  { opacity: 1; }
                90%  { opacity: 0.5; }
                100% { 
                    transform: translateY(-120vh) translateX(${(Math.random()-0.5)*100}px) rotate(${Math.random()*720}deg); 
                    opacity: 0; 
                }
            }
        `;
        document.head.appendChild(style);
    }
});