// ─── GRAPHIQUE RADAR ──────────────────────────────────────────────────────
const ctx = document.getElementById('statsChart').getContext('2d');

// Stats de base Exorciste
const baseStats = {
    FOR: -3,
    CST: 3,
    DEX: -3,
    INT: 2,
    SAG: 3,
    PER: 0,
    CHA: -3
};

// Bonus par Origine
const originBonuses = {
    'origin-repurgateur':     { INT: 3, SAG: 2 },
    'origin-exterminateur':   { PER: 4, CST: 2 },
    'origin-purificateur':    { SAG: 3, CST: 2 },
    'origin-veilleur':        { FOR: 6, CST: 2 }  // FOR de -3 → +3 = +6 total
};

const originNames = {
    'origin-repurgateur':     'Répurgateur (L\'Increvable)',
    'origin-exterminateur':   'Exterminateur (L\'Avant-garde)',
    'origin-purificateur':    'Purificateur (Poseur de Sceaux)',
    'origin-veilleur':        'Veilleur Noir (Caste spéciale)'
};

let currentOrigin = null;

function calculateStats(origin) {
    const s = { ...baseStats };
    if (origin && originBonuses[origin]) {
        for (const [k, v] of Object.entries(originBonuses[origin])) {
            s[k] = (s[k] || 0) + v;
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
            backgroundColor: 'rgba(152, 152, 184, 0.15)',
            borderColor:     'rgba(168, 176, 192, 0.9)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(184, 184, 208, 1)',
            pointBorderColor:     'rgba(74, 74, 104, 0.9)',
            pointHoverBackgroundColor: '#c0c8d8',
            pointHoverBorderColor:     'rgba(152, 152, 184, 1)',
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
                backgroundColor: 'rgba(13, 13, 18, 0.85)',
                ticks: {
                    stepSize: 2,
                    callback: v => v - 4,
                    color: '#a8b0c0',
                    backdropColor: 'rgba(13, 13, 18, 0.95)',
                    font: { size: 11, weight: 'bold' }
                },
                grid:        { color: 'rgba(168, 176, 192, 0.25)', circular: true },
                angleLines:  { color: 'rgba(168, 176, 192, 0.25)' },
                pointLabels: {
                    color: '#d8dce8',
                    font: { size: 14, weight: 'bold', family: "'Cinzel', serif" }
                }
            }
        },
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(13, 13, 18, 0.95)',
                titleColor: '#9898b8',
                bodyColor:  '#c8ccd8',
                borderColor: 'rgba(168, 176, 192, 0.7)',
                borderWidth: 2,
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

// ─── INTERACTIVITÉ ORIGINES ───────────────────────────────────────────────
function updateChart(origin) {
    statsChart.data.datasets[0].data = toChartData(calculateStats(origin));
    statsChart.update();
    currentOrigin = origin;
    updateSelection(origin);
    updateDisplay(origin);
}

function updateSelection(origin) {
    document.querySelectorAll('.origin-card').forEach(c => c.classList.remove('selected'));
    if (origin) {
        const card = document.querySelector(`.origin-card.${origin}`);
        if (card) {
            card.classList.add('selected');
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

function updateDisplay(origin) {
    const el = document.getElementById('origin-display');
    if (!el) return;

    if (origin) {
        const bonuses = originBonuses[origin];
        const parts = Object.entries(bonuses).map(([k, v]) => `${k} ${v >= 0 ? '+' : ''}${v}`);
        el.innerHTML =
            `<strong>Origine sélectionnée :</strong> ${originNames[origin]}<br>
             <strong>Gains appliqués :</strong> ${parts.join(' · ')}`;
        el.style.display = 'block';
    } else {
        el.innerHTML = '<strong>Aucune origine sélectionnée</strong> — Stats de base';
        el.style.display = 'block';
    }
}

// ─── INIT ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const originKeys = Object.keys(originBonuses);

    document.querySelectorAll('.origin-card').forEach(card => {
        card.addEventListener('click', () => {
            const key = Array.from(card.classList).find(c => originKeys.includes(c));
            if (!key) return;
            updateChart(currentOrigin === key ? null : key);
        });
    });

    // Créer l'indicateur sous le graphique
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
        const div = document.createElement('div');
        div.id = 'origin-display';
        div.style.cssText = `
            margin-top: 18px; padding: 13px 16px;
            background: linear-gradient(135deg, rgba(168, 176, 192, 0.12), rgba(74, 74, 104, 0.10));
            border: 1px solid rgba(168, 176, 192, 0.30);
            border-radius: 6px;
            text-align: center; font-size: 0.92rem;
            color: #a8b0c0; display: none;
            line-height: 1.6;
            box-shadow: inset 0 1px 0 rgba(192, 200, 216, 0.08), 0 2px 8px rgba(0, 0, 0, 0.6);
        `;
        chartContainer.appendChild(div);
    }

    // ─── PARTICULES LUMIÈRE DÉCHUE ────────────────────────────────────────
    const particlesEl = document.getElementById('particles');
    if (!particlesEl) return;

    const particleCount = 35;
    
    // Particules de lumière déchue (grisâtres, fantomatiques)
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1.5;
        const duration = Math.random() * 5 + 3;
        const delay = Math.random() * 6;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const opacity = Math.random() * 0.4 + 0.2;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(168, 176, 192, ${opacity}) 0%, transparent 70%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: corruptedFloat ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
        `;
        particlesEl.appendChild(particle);
    }

    // Particules violettes abyssales
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 4 + 3;
        const delay = Math.random() * 5;
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(152, 152, 184, 0.6) 0%, transparent 60%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: abyssalPulse ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
            box-shadow: 0 0 ${size * 2}px rgba(152, 152, 184, 0.3);
        `;
        particlesEl.appendChild(particle);
    }

    // Quelques lueurs fantomatiques (plus grandes)
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 8 + 5;
        const duration = Math.random() * 6 + 4;
        const delay = Math.random() * 7;
        const left = Math.random() * 100;
        const top = Math.random() * 100;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(200, 204, 216, 0.3) 0%, transparent 50%);
            left: ${left}%;
            top: ${top}%;
            border-radius: 50%;
            animation: phantomGlow ${duration}s ${delay}s ease-in-out infinite;
            pointer-events: none;
            filter: blur(2px);
            box-shadow: 0 0 ${size * 3}px rgba(168, 176, 192, 0.2);
        `;
        particlesEl.appendChild(particle);
    }

    // Injecter les animations si pas déjà présentes
    if (!document.getElementById('particle-keyframes')) {
        const style = document.createElement('style');
        style.id = 'particle-keyframes';
        style.textContent = `
            @keyframes corruptedFloat {
                0%, 100% { 
                    opacity: 0.3; 
                    transform: translateY(0px) translateX(0px);
                }
                50% { 
                    opacity: 0.7; 
                    transform: translateY(-20px) translateX(10px);
                }
            }
            @keyframes abyssalPulse {
                0%, 100% { 
                    opacity: 0.4; 
                    transform: scale(1);
                }
                50% { 
                    opacity: 0.9; 
                    transform: scale(1.5);
                }
            }
            @keyframes phantomGlow {
                0%, 100% { 
                    opacity: 0.2; 
                    transform: scale(1) rotate(0deg);
                }
                50% { 
                    opacity: 0.5; 
                    transform: scale(1.3) rotate(180deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
});